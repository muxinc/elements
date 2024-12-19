import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { chromeLauncher } from '@web/test-runner';

export default {
  nodeResolve: true,
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '/test/': '/packages/playback-core/test/',
          },
        },
      },
    }),
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
  browsers: [chromeLauncher({ launchOptions: { args: ['--headless=old'] } })],
  filterBrowserLogs: ({ args }) => !args[0]?.startsWith('Lit is in dev mode'),
};
