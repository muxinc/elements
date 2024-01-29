import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
  nodeResolve: true,
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            // see shared/test-esm-exports/README.md for more information on this configuration
            '/test/': '/packages/mux-livestream-status/test/',
          },
        },
      },
    }),
    esbuildPlugin({ ts: true }),
  ],
  coverageConfig: {
    report: true,
    include: ['src/**/*'],
  },
};
