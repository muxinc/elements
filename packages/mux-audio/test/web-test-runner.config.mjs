import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      json: true,
      loaders: { '.css': 'text', '.svg': 'text' },
    }),
  ],
  coverageConfig: {
    report: true,
    include: ['src/**/*'],
  },
};
