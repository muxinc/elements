export type MuxUploaderProps = {
  endpoint?: string;
  type?: 'bar' | 'radial' | 'percentage';
  pausable?: boolean;
  noDrop?: boolean;
  noProgress?: boolean;
  noStatus?: boolean;
  noRetry?: boolean;
  maxFileSize?: number;
  useLargeFileWorkaround?: boolean;
  dynamicChunkSize?: boolean;
  chunkSize?: number;
  paused?: boolean;
} & astroHTML.JSX.HTMLAttributes;
