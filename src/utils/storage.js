const FORKS_KEY = "tja_forks";

export function readRaw() {
  try {
    const raw = localStorage.getItem(FORKS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function writeRaw(state) {
  try {
    localStorage.setItem(FORKS_KEY, JSON.stringify(state));
  } catch {}
}

export function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
