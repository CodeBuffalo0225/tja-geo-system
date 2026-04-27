import { readRaw, writeRaw } from "./storage.js";

function nowIso() {
  return new Date().toISOString();
}

function makeId() {
  return `fork_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function emptyFork(name) {
  const ts = nowIso();
  return {
    id: makeId(),
    name: name || "Untitled Fork",
    createdAt: ts,
    lastModified: ts,
    outputs: {},
    status: {},
    notes: "",
  };
}

function ensureState() {
  let state = readRaw();
  if (!state || !Array.isArray(state.forks) || state.forks.length === 0) {
    const first = emptyFork("Original Run");
    state = { forks: [first], activeForkId: first.id };
    writeRaw(state);
  } else if (!state.activeForkId || !state.forks.find((f) => f.id === state.activeForkId)) {
    state.activeForkId = state.forks[0].id;
    writeRaw(state);
  }
  return state;
}

export function listForks() {
  return ensureState().forks;
}

export function getActiveFork() {
  const state = ensureState();
  return state.forks.find((f) => f.id === state.activeForkId);
}

export function getActiveForkId() {
  return ensureState().activeForkId;
}

export function createFork(name) {
  const state = ensureState();
  const fork = emptyFork(name);
  state.forks.push(fork);
  state.activeForkId = fork.id;
  writeRaw(state);
  return fork;
}

export function duplicateFork(forkId, newName) {
  const state = ensureState();
  const src = state.forks.find((f) => f.id === forkId);
  if (!src) return null;
  const copy = {
    ...emptyFork(newName || `${src.name} (copy)`),
    outputs: { ...src.outputs },
    status: { ...src.status },
    notes: src.notes,
  };
  state.forks.push(copy);
  state.activeForkId = copy.id;
  writeRaw(state);
  return copy;
}

export function deleteFork(forkId) {
  const state = ensureState();
  state.forks = state.forks.filter((f) => f.id !== forkId);
  if (state.forks.length === 0) {
    const fresh = emptyFork("Original Run");
    state.forks = [fresh];
    state.activeForkId = fresh.id;
  } else if (state.activeForkId === forkId) {
    state.activeForkId = state.forks[0].id;
  }
  writeRaw(state);
  return state;
}

export function renameFork(forkId, newName) {
  const state = ensureState();
  const f = state.forks.find((x) => x.id === forkId);
  if (!f) return null;
  f.name = newName;
  f.lastModified = nowIso();
  writeRaw(state);
  return f;
}

export function setActive(forkId) {
  const state = ensureState();
  if (state.forks.find((f) => f.id === forkId)) {
    state.activeForkId = forkId;
    writeRaw(state);
  }
  return state.activeForkId;
}

export function saveOutput(forkId, agentId, output) {
  const state = ensureState();
  const f = state.forks.find((x) => x.id === forkId);
  if (!f) return;
  f.outputs[agentId] = output;
  f.lastModified = nowIso();
  writeRaw(state);
}

export function saveStatus(forkId, agentId, status) {
  const state = ensureState();
  const f = state.forks.find((x) => x.id === forkId);
  if (!f) return;
  f.status[agentId] = status;
  f.lastModified = nowIso();
  writeRaw(state);
}

export function resetFork(forkId) {
  const state = ensureState();
  const f = state.forks.find((x) => x.id === forkId);
  if (!f) return;
  f.outputs = {};
  f.status = {};
  f.lastModified = nowIso();
  writeRaw(state);
}

export function exportAllForks() {
  return JSON.stringify(ensureState(), null, 2);
}
