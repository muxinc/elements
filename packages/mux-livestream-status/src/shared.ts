export type Status = 'active' | 'idle';
export type Unsubscribe = () => void;

export const DEFAULT_POLL_INTERVAL = 10;
export const MINIMUM_POLL_INTERVAL = 3;
