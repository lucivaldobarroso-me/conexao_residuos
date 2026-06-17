import React from 'react';
import { Download, Lock, LogOut, RefreshCw, ShieldCheck, TableProperties, Users } from 'lucide-react';
import {
  AdminAttemptRecord,
  AdminDashboardStats,
  AdminParticipantRecord,
  getAdminSession,
  loadAdminAttempts,
  loadAdminDashboard,
  loadAdminParticipants,
  onAdminAuthChange,
  signInAdmin,
  signOutAdmin,
  validateAdminAccess,
} from '../services/adminRepository';
import { isSupabaseConfigured } from '../lib/supabase';

function formatDateTime(value: string | null) {
  if (!value) return '-';
  return new Date(value).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds)) return '-';
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  if (minutes <= 0) return `${remaining}s`;
  return `${minutes}min ${remaining}s`;
}

function downloadCsv(filename: string, headers: string[], rows: string[][]) {
  const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export const AdminPanel: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [error, setError] = React.useState('');
  const [stats, setStats] = React.useState<AdminDashboardStats | null>(null);
  const [participants, setParticipants] = React.useState<AdminParticipantRecord[]>([]);
  const [attempts, setAttempts] = React.useState<AdminAttemptRecord[]>([]);

  const loadAdminData = React.useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const session = await getAdminSession();
      if (!session) {
        setIsAuthorized(false);
        return;
      }

      const allowed = await validateAdminAccess();
      if (!allowed) {
        setIsAuthorized(false);
        setError('Seu usuario autenticado nao possui permissao administrativa.');
        return;
      }

      const [nextStats, nextParticipants, nextAttempts] = await Promise.all([
        loadAdminDashboard(),
        loadAdminParticipants(),
        loadAdminAttempts(),
      ]);

      setStats(nextStats);
      setParticipants(nextParticipants);
      setAttempts(nextAttempts);
      setIsAuthorized(true);
    } catch (nextError) {
      setIsAuthorized(false);
      setError(nextError instanceof Error ? nextError.message : 'Nao foi possivel carregar a area administrativa.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      setError('Supabase nao esta configurado.');
      return;
    }

    loadAdminData();
    const unsubscribe = onAdminAuthChange(() => {
      loadAdminData();
    });

    return unsubscribe;
  }, [loadAdminData]);

  const attemptsByMode = attempts.reduce<Record<string, AdminAttemptRecord[]>>((accumulator, attempt) => {
    const key = String(attempt.questionCount);
    if (!accumulator[key]) accumulator[key] = [];
    accumulator[key].push(attempt);
    return accumulator;
  }, {});

  const ranking = [...attempts].sort((left, right) => {
    if (right.percentage !== left.percentage) return right.percentage - left.percentage;
    if (right.score !== left.score) return right.score - left.score;
    if (left.durationSeconds !== right.durationSeconds) return left.durationSeconds - right.durationSeconds;
    return new Date(left.completedAt).getTime() - new Date(right.completedAt).getTime();
  });

  const handleLogin = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      await signInAdmin(email.trim(), password);
      setPassword('');
      await loadAdminData();
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Nao foi possivel entrar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setIsAuthorized(false);
    setStats(null);
    setParticipants([]);
    setAttempts([]);
  };

  if (!isSupabaseConfigured) {
    return (
      <section className="mx-auto max-w-3xl rounded-[32px] border border-outline-variant bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-black text-on-surface">Area Administrativa</h2>
        <p className="mt-4 text-sm font-bold text-red-700">Supabase nao esta configurado.</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl rounded-[32px] border border-outline-variant bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3 text-on-surface">
          <RefreshCw className="animate-spin text-primary" size={20} />
          <p className="font-bold">Carregando area administrativa...</p>
        </div>
      </section>
    );
  }

  if (!isAuthorized) {
    return (
      <section className="mx-auto max-w-3xl rounded-[32px] border border-outline-variant bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-on-surface">Area Administrativa</h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Acesso restrito para administradores autenticados no Supabase.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-on-surface">
            Email do administrador
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-2xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-on-surface">
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleLogin();
              }}
              className="rounded-2xl border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
            />
          </label>

          {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}

          <button
            type="button"
            onClick={handleLogin}
            disabled={isSubmitting}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 font-black text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
          >
            <ShieldCheck size={18} />
            Entrar na area administrativa
          </button>
        </div>
      </section>
    );
  }

  const participantRows = participants.map((participant) => [
    participant.participantName,
    participant.profession,
    participant.cpfMask,
    String(participant.attemptCount),
    formatDateTime(participant.createdAt),
    formatDateTime(participant.lastAttemptAt),
    participant.bestPercentage === null ? '-' : `${participant.bestPercentage}%`,
  ]);

  const attemptRows = attempts.map((attempt) => [
    attempt.participantName,
    attempt.profession,
    attempt.cpfMask,
    `${attempt.questionCount} questoes`,
    `${attempt.score}/${attempt.totalQuestions}`,
    `${attempt.percentage}%`,
    formatDuration(attempt.durationSeconds),
    formatDateTime(attempt.completedAt),
  ]);

  return (
    <div className="flex flex-col gap-8 pb-24 md:pb-8">
      <header className="flex flex-col gap-4 rounded-[32px] border border-outline-variant bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-primary">Administracao do quiz</p>
          <h2 className="mt-2 text-3xl font-black text-on-surface">Painel Administrativo</h2>
          <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
            Consulta protegida de participantes, tentativas, ranking completo e exportacao CSV.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={loadAdminData}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-outline-variant bg-white px-5 py-3 text-sm font-black text-primary"
          >
            <RefreshCw size={16} />
            Atualizar
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}

      <section className="grid gap-4 md:grid-cols-5">
        {[
          ['Participantes', String(stats?.participantCount || 0)],
          ['Tentativas', String(stats?.attemptCount || 0)],
          ['Media geral', `${stats?.averagePercentage || 0}%`],
          ['Melhor acerto', `${stats?.bestPercentage || 0}%`],
          ['Tempo medio', formatDuration(stats?.averageDurationSeconds || 0)],
        ].map(([label, value]) => (
          <article key={label} className="rounded-[28px] border border-outline-variant bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">{label}</p>
            <p className="mt-3 text-3xl font-black text-on-surface">{value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border border-outline-variant bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black text-on-surface">Media por modalidade</h3>
            <p className="text-sm text-on-surface-variant">Resumo calculado a partir das tentativas salvas.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {(Object.entries(attemptsByMode) as Array<[string, AdminAttemptRecord[]]>)
            .sort((left, right) => Number(left[0]) - Number(right[0]))
            .map(([mode, modeAttempts]) => {
              const average = Math.round(modeAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / modeAttempts.length);
              return (
                <article key={mode} className="rounded-2xl border border-outline-variant bg-surface p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-primary">{mode} questoes</p>
                  <p className="mt-3 text-3xl font-black text-on-surface">{average}%</p>
                  <p className="mt-2 text-sm font-bold text-on-surface-variant">{modeAttempts.length} tentativa(s)</p>
                </article>
              );
            })}
        </div>
      </section>

      <section className="rounded-[32px] border border-outline-variant bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black text-on-surface">Participantes cadastrados</h3>
            <p className="text-sm text-on-surface-variant">Lista administrativa com CPF mascarado e historico resumido.</p>
          </div>
          <button
            type="button"
            onClick={() =>
              downloadCsv(
                'participantes-admin.csv',
                ['Nome', 'Profissao', 'CPF', 'Tentativas', 'Cadastro', 'Ultima tentativa', 'Melhor percentual'],
                participantRows
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm font-black text-primary"
          >
            <Download size={16} />
            Exportar participantes
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant text-xs font-black uppercase tracking-widest text-on-surface-variant">
                <th className="px-3 py-3">Nome</th>
                <th className="px-3 py-3">Profissao</th>
                <th className="px-3 py-3">CPF</th>
                <th className="px-3 py-3">Tentativas</th>
                <th className="px-3 py-3">Cadastro</th>
                <th className="px-3 py-3">Ultima tentativa</th>
                <th className="px-3 py-3">Melhor %</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id} className="border-b border-outline-variant/70 last:border-b-0">
                  <td className="px-3 py-4 font-bold text-on-surface">{participant.participantName}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{participant.profession}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{participant.cpfMask}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{participant.attemptCount}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{formatDateTime(participant.createdAt)}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{formatDateTime(participant.lastAttemptAt)}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{participant.bestPercentage === null ? '-' : `${participant.bestPercentage}%`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-[32px] border border-outline-variant bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black text-on-surface">Tentativas registradas</h3>
            <p className="text-sm text-on-surface-variant">Historico completo das respostas salvas no quiz.</p>
          </div>
          <button
            type="button"
            onClick={() =>
              downloadCsv(
                'tentativas-admin.csv',
                ['Nome', 'Profissao', 'CPF', 'Modalidade', 'Pontuacao', 'Percentual', 'Tempo', 'Concluida em'],
                attemptRows
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm font-black text-primary"
          >
            <Download size={16} />
            Exportar tentativas
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant text-xs font-black uppercase tracking-widest text-on-surface-variant">
                <th className="px-3 py-3">Participante</th>
                <th className="px-3 py-3">Profissao</th>
                <th className="px-3 py-3">CPF</th>
                <th className="px-3 py-3">Modalidade</th>
                <th className="px-3 py-3">Pontuacao</th>
                <th className="px-3 py-3">Percentual</th>
                <th className="px-3 py-3">Tempo</th>
                <th className="px-3 py-3">Concluida em</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt) => (
                <tr key={attempt.id} className="border-b border-outline-variant/70 last:border-b-0">
                  <td className="px-3 py-4 font-bold text-on-surface">{attempt.participantName}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{attempt.profession}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{attempt.cpfMask}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{attempt.questionCount} questoes</td>
                  <td className="px-3 py-4 text-on-surface-variant">{attempt.score}/{attempt.totalQuestions}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{attempt.percentage}%</td>
                  <td className="px-3 py-4 text-on-surface-variant">{formatDuration(attempt.durationSeconds)}</td>
                  <td className="px-3 py-4 text-on-surface-variant">{formatDateTime(attempt.completedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-[32px] border border-outline-variant bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-black text-on-surface">Ranking completo</h3>
            <p className="text-sm text-on-surface-variant">Ordenado por percentual, pontuacao e tempo.</p>
          </div>
          <button
            type="button"
            onClick={() =>
              downloadCsv(
                'ranking-admin.csv',
                ['Posicao', 'Nome', 'Profissao', 'CPF', 'Modalidade', 'Pontuacao', 'Percentual', 'Tempo', 'Data'],
                ranking.map((attempt, index) => [
                  String(index + 1),
                  attempt.participantName,
                  attempt.profession,
                  attempt.cpfMask,
                  `${attempt.questionCount} questoes`,
                  `${attempt.score}/${attempt.totalQuestions}`,
                  `${attempt.percentage}%`,
                  formatDuration(attempt.durationSeconds),
                  formatDateTime(attempt.completedAt),
                ])
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-outline-variant bg-white px-4 py-3 text-sm font-black text-primary"
          >
            <TableProperties size={16} />
            Exportar ranking
          </button>
        </div>

        <div className="grid gap-4">
          {ranking.slice(0, 30).map((attempt, index) => (
            <article key={attempt.id} className="grid gap-3 rounded-2xl border border-outline-variant bg-surface p-4 md:grid-cols-[48px_1.3fr_0.8fr_auto] md:items-center">
              <div className="text-2xl font-black text-primary">{index + 1}</div>
              <div>
                <p className="font-black text-on-surface">{attempt.participantName}</p>
                <p className="text-sm text-on-surface-variant">{attempt.profession} | {attempt.cpfMask}</p>
              </div>
              <div className="text-sm font-bold text-on-surface-variant">
                {attempt.questionCount} questoes | {formatDateTime(attempt.completedAt)}
              </div>
              <div className="text-left md:text-right">
                <p className="font-black text-on-surface">{attempt.percentage}% ({attempt.score}/{attempt.totalQuestions})</p>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{formatDuration(attempt.durationSeconds)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
