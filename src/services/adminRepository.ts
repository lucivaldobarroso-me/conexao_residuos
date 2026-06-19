import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AdminDashboardStats {
  participantCount: number;
  attemptCount: number;
  averagePercentage: number;
  averageDurationSeconds: number;
  bestPercentage: number;
}

export interface AdminParticipantRecord {
  id: string;
  participantName: string;
  profession: string;
  cpfMask: string;
  attemptCount: number;
  createdAt: string;
  updatedAt: string;
  lastAttemptAt: string | null;
  bestPercentage: number | null;
}

export interface AdminAttemptRecord {
  id: string;
  participantName: string;
  profession: string;
  cpfMask: string;
  questionCount: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  durationSeconds: number;
  completedAt: string;
}

interface AdminDashboardRow {
  participant_count: number;
  attempt_count: number;
  average_percentage: number;
  average_duration_seconds: number;
  best_percentage: number;
}

interface AdminParticipantRow {
  id: string;
  participant_name: string;
  profession: string;
  cpf_mask: string;
  attempt_count: number;
  created_at: string;
  updated_at: string;
  last_attempt_at: string | null;
  best_percentage: number | null;
}

interface AdminAttemptRow {
  id: string;
  participant_name: string;
  profession: string;
  cpf_mask: string;
  question_count: number;
  score: number;
  total_questions: number;
  percentage: number;
  duration_seconds: number;
  completed_at: string;
}

function ensureSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase não está configurado.');
  }
  return supabase;
}

function mapDashboard(row: AdminDashboardRow): AdminDashboardStats {
  return {
    participantCount: Number(row.participant_count || 0),
    attemptCount: Number(row.attempt_count || 0),
    averagePercentage: Number(row.average_percentage || 0),
    averageDurationSeconds: Number(row.average_duration_seconds || 0),
    bestPercentage: Number(row.best_percentage || 0),
  };
}

function mapParticipant(row: AdminParticipantRow): AdminParticipantRecord {
  return {
    id: row.id,
    participantName: row.participant_name,
    profession: row.profession,
    cpfMask: row.cpf_mask,
    attemptCount: row.attempt_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastAttemptAt: row.last_attempt_at,
    bestPercentage: row.best_percentage,
  };
}

function mapAttempt(row: AdminAttemptRow): AdminAttemptRecord {
  return {
    id: row.id,
    participantName: row.participant_name,
    profession: row.profession,
    cpfMask: row.cpf_mask,
    questionCount: row.question_count,
    score: row.score,
    totalQuestions: row.total_questions,
    percentage: row.percentage,
    durationSeconds: row.duration_seconds,
    completedAt: row.completed_at,
  };
}

export async function signInAdmin(email: string, password: string) {
  const client = ensureSupabase();
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    throw new Error('Não foi possível entrar. Verifique email e senha.');
  }
}

export async function signOutAdmin() {
  const client = ensureSupabase();
  await client.auth.signOut();
}

export async function getAdminSession() {
  const client = ensureSupabase();
  const { data, error } = await client.auth.getSession();
  if (error) {
    throw new Error('Não foi possível validar a sessão.');
  }
  return data.session;
}

export function onAdminAuthChange(callback: () => void) {
  if (!isSupabaseConfigured || !supabase) {
    return () => undefined;
  }

  const { data } = supabase.auth.onAuthStateChange(() => callback());
  return () => data.subscription.unsubscribe();
}

export async function validateAdminAccess() {
  const client = ensureSupabase();
  const { data, error } = await client.rpc('is_current_admin');
  if (error) {
    throw new Error('Não foi possível validar o acesso administrativo.');
  }
  return Boolean(data);
}

export async function loadAdminDashboard() {
  const client = ensureSupabase();
  const { data, error } = await client.rpc('get_admin_dashboard').maybeSingle();
  if (error || !data) {
    throw new Error('Não foi possível carregar o painel administrativo.');
  }
  return mapDashboard(data as AdminDashboardRow);
}

export async function loadAdminParticipants(limit = 200) {
  const client = ensureSupabase();
  const { data, error } = await client.rpc('get_admin_participants', {
    p_limit: limit,
  });
  if (error) {
    throw new Error('Não foi possível carregar os participantes.');
  }
  return ((data || []) as AdminParticipantRow[]).map(mapParticipant);
}

export async function loadAdminAttempts(limit = 500) {
  const client = ensureSupabase();
  const { data, error } = await client.rpc('get_admin_attempts', {
    p_limit: limit,
  });
  if (error) {
    throw new Error('Não foi possível carregar as tentativas.');
  }
  return ((data || []) as AdminAttemptRow[]).map(mapAttempt);
}
