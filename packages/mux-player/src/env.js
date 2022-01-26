/* eslint-disable */
const getEnvPlayerVersion = () => {
  try {
    return PLAYER_VERSION;
  } catch {}
  return "UNKNOWN";
};

const player_version = getEnvPlayerVersion();

export const getPlayerVersion = () => player_version;
