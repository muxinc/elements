import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { playwrightLauncher } from '@web/test-runner-playwright';

const config = {
  nodeResolve: true,
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '/test/': '/packages/mux-player/test/',
          },
        },
      },
    }),
    esbuildPlugin({
      ts: true,
      json: true,
      loaders: { '.css': 'text', '.svg': 'text', '.html': 'text' },
    }),
  ],
  coverageConfig: {
    report: true,
    include: ['src/**/*'],
  },
  testsFinishTimeout: 600000,
};

if (process.argv.some((arg) => arg.includes('--all'))) {
  Object.assign(config, {
    concurrentBrowsers: 3,
    browsers: [
      playwrightLauncher({
        product: 'chromium',
        launchOptions: {
          channel: 'chrome',
        },
      }),
      playwrightLauncher({ product: 'firefox' }),
      playwrightLauncher({ product: 'webkit' }),
    ],
  });
}

export default config;
