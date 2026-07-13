export type ToastTone = 'success' | 'error' | 'info';

const CONTAINER_ID = 'gameengg10-toast-container';
const DEFAULT_DURATION = 3200;

type ToastRender = {
  message: string;
  tone: ToastTone;
  duration: number;
};

const toneStyles: Record<ToastTone, { accent: string; ring: string; label: string; symbol: string }> = {
  success: {
    accent: 'from-synth-cyan/20 to-emerald-400/15',
    ring: 'border-synth-cyan/35 shadow-[0_0_18px_rgba(0,240,255,0.18)]',
    label: 'Thành công',
    symbol: '✓'
  },
  error: {
    accent: 'from-rose-500/20 to-orange-400/15',
    ring: 'border-rose-400/35 shadow-[0_0_18px_rgba(244,63,94,0.18)]',
    label: 'Lỗi',
    symbol: '!'
  },
  info: {
    accent: 'from-synth-magenta/20 to-synth-purple/15',
    ring: 'border-synth-magenta/35 shadow-[0_0_18px_rgba(217,70,239,0.18)]',
    label: 'Thông báo',
    symbol: 'i'
  }
};

const ensureContainer = () => {
  let container = document.getElementById(CONTAINER_ID);
  if (container) return container;

  container = document.createElement('div');
  container.id = CONTAINER_ID;
  container.className = 'fixed right-4 top-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 pointer-events-none';
  document.body.appendChild(container);
  return container;
};

const createToastId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const renderToast = ({ message, tone, duration }: ToastRender) => {
  if (typeof document === 'undefined') return;

  const container = ensureContainer();
  const styles = toneStyles[tone];
  const toastId = createToastId();

  const toastEl = document.createElement('div');
  toastEl.dataset.toastId = toastId;
  toastEl.className = `glass-panel gameeng-toast pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl ${styles.ring}`;

  const badge = document.createElement('div');
  badge.className = `mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${styles.accent} text-xs font-black text-white`;
  badge.textContent = styles.symbol;

  const body = document.createElement('div');
  body.className = 'min-w-0 flex-1';

  const title = document.createElement('div');
  title.className = 'mb-0.5 text-[10px] font-orbitron font-bold uppercase tracking-[0.25em] gameeng-toast-title';
  title.textContent = styles.label;

  const text = document.createElement('p');
  text.className = 'text-sm leading-snug gameeng-toast-text';
  text.textContent = message;

  body.appendChild(title);
  body.appendChild(text);

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'rounded-full p-1 gameeng-toast-close';
  close.setAttribute('aria-label', 'Đóng thông báo');
  close.textContent = '×';
  close.addEventListener('click', () => toastEl.remove());

  toastEl.appendChild(badge);
  toastEl.appendChild(body);
  toastEl.appendChild(close);
  container.appendChild(toastEl);

  window.setTimeout(() => {
    toastEl.classList.add('opacity-0', 'translate-x-2');
    toastEl.style.transition = 'opacity 180ms ease, transform 180ms ease';
    window.setTimeout(() => toastEl.remove(), 200);
  }, duration);
};

const emitToast = (message: string, tone: ToastTone, duration = DEFAULT_DURATION) => {
  renderToast({ message, tone, duration });
};

export const toast = {
  success: (message: string, duration?: number) => emitToast(message, 'success', duration),
  error: (message: string, duration?: number) => emitToast(message, 'error', duration),
  info: (message: string, duration?: number) => emitToast(message, 'info', duration)
};
