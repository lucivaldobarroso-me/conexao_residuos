import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { QuizLeaderboardEntry, QuizParticipant, QuizStats } from '../types';

interface ParticipantRow {
  id: string;
  participant_name: string;
  profession: string;
  cpf_mask: string;
  attempt_count: number;
}

interface AttemptRow {
  id: string;
  participant_name: string;
  profession: string;
  cpf_mask: string;
  score: number;
  total_questions: number;
  percentage: number;
  duration_seconds: number;
  completed_at: string;
}

interface QuizStatsRow {
  participant_count: number;
  attempt_count: number;
  average_percentage: number;
  most_used_question_count: number | null;
}

function toLeaderboardEntry(row: AttemptRow): QuizLeaderboardEntry {
  return {
    id: row.id,
    participantName: row.participant_name || 'Participante',
    profession: row.profession || 'Não informado',
    cpfMask: row.cpf_mask || '***.***.***-**',
    score: row.score,
    totalQuestions: row.total_questions,
    percentage: row.percentage,
    durationSeconds: row.duration_seconds,
    completedAt: row.completed_at,
  };
}

function normalizeCpf(cpf: string) {
  return cpf.replace(/\D/g, '');
}

function hasCpfLookupFormat(cpf: string) {
  const digits = normalizeCpf(cpf);
  return digits.length === 11 && !/^(\d)\1{10}$/.test(digits);
}

function getParticipantLookupError(error: unknown) {
  const message = error && typeof error === 'object' && 'message' in error ? String(error.message) : '';

  if (message.includes('find_quiz_participant_by_cpf_hash')) {
    return 'Atualize o Supabase com o SQL 006 de segurança antes de buscar cadastros.';
  }

  return 'Não foi possível buscar o cadastro.';
}

function getParticipantCreateError(error: unknown) {
  const message = error && typeof error === 'object' && 'message' in error ? String(error.message) : '';

  if (message.includes('create_quiz_participant')) {
    return 'Atualize o Supabase com o SQL 006 de segurança antes de criar cadastros.';
  }

  return 'Não foi possível criar o cadastro.';
}

function maskCpf(cpf: string) {
  const digits = normalizeCpf(cpf);
  return `${digits.slice(0, 3)}.***.***-${digits.slice(9, 11)}`;
}

function rightRotate(value: number, amount: number) {
  return (value >>> amount) | (value << (32 - amount));
}

function sha256Fallback(input: string) {
  const bytes = Array.from(input).map((char) => char.charCodeAt(0));
  const bitLength = bytes.length * 8;
  const words: number[] = [];
  const hash = [
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19,
  ];
  const constants = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) bytes.push(0);

  for (let shift = 24; shift >= 0; shift -= 8) {
    bytes.push((Math.floor(bitLength / 0x100000000) >>> shift) & 0xff);
  }

  for (let shift = 24; shift >= 0; shift -= 8) {
    bytes.push((bitLength >>> shift) & 0xff);
  }

  for (let offset = 0; offset < bytes.length; offset += 64) {
    for (let index = 0; index < 16; index += 1) {
      const byteIndex = offset + index * 4;
      words[index] =
        ((bytes[byteIndex] << 24) | (bytes[byteIndex + 1] << 16) | (bytes[byteIndex + 2] << 8) | bytes[byteIndex + 3]) >>> 0;
    }

    for (let index = 16; index < 64; index += 1) {
      const s0 = rightRotate(words[index - 15], 7) ^ rightRotate(words[index - 15], 18) ^ (words[index - 15] >>> 3);
      const s1 = rightRotate(words[index - 2], 17) ^ rightRotate(words[index - 2], 19) ^ (words[index - 2] >>> 10);
      words[index] = (words[index - 16] + s0 + words[index - 7] + s1) >>> 0;
    }

    let [a, b, c, d, e, f, g, h] = hash;

    for (let index = 0; index < 64; index += 1) {
      const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + s1 + ch + constants[index] + words[index]) >>> 0;
      const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (s0 + maj) >>> 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    hash[0] = (hash[0] + a) >>> 0;
    hash[1] = (hash[1] + b) >>> 0;
    hash[2] = (hash[2] + c) >>> 0;
    hash[3] = (hash[3] + d) >>> 0;
    hash[4] = (hash[4] + e) >>> 0;
    hash[5] = (hash[5] + f) >>> 0;
    hash[6] = (hash[6] + g) >>> 0;
    hash[7] = (hash[7] + h) >>> 0;
  }

  return hash.map((value) => value.toString(16).padStart(8, '0')).join('');
}

async function hashCpf(cpf: string) {
  const digits = normalizeCpf(cpf);

  if (globalThis.crypto?.subtle) {
    const data = new TextEncoder().encode(digits);
    const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  return sha256Fallback(digits);
}

function toParticipant(row: ParticipantRow): QuizParticipant {
  return {
    id: row.id,
    participantName: row.participant_name,
    profession: row.profession,
    cpfMask: row.cpf_mask,
    attemptCount: row.attempt_count,
  };
}

export async function findParticipantByCpf(cpf: string): Promise<QuizParticipant | null> {
  if (!hasCpfLookupFormat(cpf)) {
    throw new Error('Informe um CPF com 11 dígitos válidos.');
  }

  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase não está configurado.');
  }

  const cpfHash = await hashCpf(cpf);
  const { data, error } = await supabase.rpc('find_quiz_participant_by_cpf_hash', {
    p_cpf_hash: cpfHash,
  });

  if (error) {
    throw new Error(getParticipantLookupError(error));
  }

  const row = Array.isArray(data) ? data[0] : data;
  return row ? toParticipant(row as ParticipantRow) : null;
}

export async function createParticipant(input: {
  participantName: string;
  profession: string;
  cpf: string;
}): Promise<QuizParticipant> {
  const participantName = input.participantName.trim();
  const profession = input.profession.trim();

  if (!participantName || !profession) {
    throw new Error('Informe nome e profissão.');
  }

  if (!hasCpfLookupFormat(input.cpf)) {
    throw new Error('Informe um CPF com 11 dígitos válidos.');
  }

  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase não está configurado.');
  }

  const existingParticipant = await findParticipantByCpf(input.cpf);
  if (existingParticipant) return existingParticipant;

  const cpfHash = await hashCpf(input.cpf);
  const { data, error } = await supabase.rpc('create_quiz_participant', {
    p_participant_name: participantName,
    p_profession: profession,
    p_cpf_mask: maskCpf(input.cpf),
    p_cpf_hash: cpfHash,
  });

  if (error) {
    throw new Error(getParticipantCreateError(error));
  }

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) {
    throw new Error('Não foi possível criar o cadastro.');
  }

  return toParticipant(row as ParticipantRow);
}

export async function saveQuizAttempt(input: {
  participant: QuizParticipant;
  questionCount: number;
  score: number;
  totalQuestions: number;
  durationSeconds: number;
}): Promise<QuizParticipant> {
  if (!isSupabaseConfigured || !supabase) {
    return input.participant;
  }

  const percentage = Math.round((input.score / input.totalQuestions) * 100);
  const { data, error: attemptError } = await supabase.rpc('save_quiz_attempt', {
    p_participant_id: input.participant.id,
    p_question_count: input.questionCount,
    p_score: input.score,
    p_total_questions: input.totalQuestions,
    p_percentage: percentage,
    p_duration_seconds: input.durationSeconds,
  });

  if (attemptError) {
    throw new Error('Não foi possível salvar o resultado.');
  }

  const row = Array.isArray(data) ? data[0] : data;
  return row ? toParticipant(row as ParticipantRow) : { ...input.participant, attemptCount: input.participant.attemptCount + 1 };
}

export async function loadLeaderboard(questionCount: number): Promise<QuizLeaderboardEntry[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase.rpc('get_quiz_leaderboard', {
    p_question_count: questionCount,
    p_limit: 10,
  });

  if (error) {
    console.warn('Supabase leaderboard load failed.', error);
    return [];
  }

  return ((data || []) as unknown as AttemptRow[]).map(toLeaderboardEntry);
}

export async function loadQuizStats(): Promise<QuizStats | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase.rpc('get_quiz_public_stats').maybeSingle();

  if (error) {
    console.warn('Supabase quiz stats load failed.', error);
    return null;
  }

  const row = data as QuizStatsRow | null;
  if (!row) return null;

  return {
    participantCount: Number(row.participant_count || 0),
    attemptCount: Number(row.attempt_count || 0),
    averagePercentage: Number(row.average_percentage || 0),
    mostUsedQuestionCount: row.most_used_question_count ?? null,
  };
}
