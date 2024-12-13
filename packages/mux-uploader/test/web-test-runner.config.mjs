import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { chromeLauncher } from '@web/test-runner';

export default {
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '5000',
    },
  },
  nodeResolve: true,
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '/test/': '/packages/mux-uploader/test/',
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
  browsers: [chromeLauncher()],
  filterBrowserLogs: ({ args }) => !args[0]?.startsWith('Lit is in dev mode'),
};
