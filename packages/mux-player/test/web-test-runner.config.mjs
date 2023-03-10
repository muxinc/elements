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
            // see shared/test-esm-exports/README.md for more information on this configuration
            '/test/': '/packages/mux-player/test/',
            'hls.js/dist/hls.min.js': '/node_modules/@mux/test-esm-exports/dist/hls.js',
            'mux-embed': '/node_modules/@mux/test-esm-exports/dist/mux-embed.js',
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
  testsFinishTimeout: 300000,
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
