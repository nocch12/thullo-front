export const DEFAULT_ORDER = 65535 as const;

export const DND_PREFIX = {
  DROP: 'droppable',
  DRAG: 'draggable',
} as const;
const dp = Object.values(DND_PREFIX);
export type TDND_PREFIX = typeof dp[number];

export const DND_TYPE = {
  LIST: 'LIST',
  TASK: 'TASK',
} as const;

const dt = Object.values(DND_TYPE);
export type TDND_TYPE = typeof dt[number];
