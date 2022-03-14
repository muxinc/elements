const getEnvPlayerVersion = () => {
  try {
    // @ts-ignore
    return PLAYER_VERSION as string;
  } catch {}
  return 'UNKNOWN';
};

const player_version: string = getEnvPlayerVersion();

export const getPlayerVersion = () => player_version;
