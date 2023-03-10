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
            '/test/': '/packages/mux-audio/test/',
            'hls.js/dist/hls.min.js': '/node_modules/@mux/test-esm-exports/dist/hls.js',
            'mux-embed': '/node_modules/@mux/test-esm-exports/dist/mux-embed.js',
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
