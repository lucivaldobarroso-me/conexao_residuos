import { HistoryEntry } from '../types';

const HISTORY_STORAGE_KEY = 'rss_history';
const HISTORY_LIMIT = 50;

export function readLocalHistory(): HistoryEntry[] {
  const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function writeLocalHistory(entries: HistoryEntry[]) {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries.slice(0, HISTORY_LIMIT)));
}

export async function loadHistoryEntries(): Promise<HistoryEntry[]> {
  return readLocalHistory();
}

export async function persistHistoryEntries(entries: HistoryEntry[]) {
  const nextEntries = entries.slice(0, HISTORY_LIMIT);
  writeLocalHistory(nextEntries);
}
