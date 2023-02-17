import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { pathToFileURL } from 'url';

export default {
  nodeResolve: true,
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            // see shared/test-esm-exports/README.md for more information on this configuration
            '/test/': '/packages/mux-active-viewer-count/test/',
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
};
