import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: '5000',
    },
  },
  middleware: [
    function rewriteIndex(context, next) {
      if (context.url === '/mock-upload-endpoint') {
        console.log(`Received ${context.headers['content-type']} request for ${context.url}`);
        context.body = 'foo';
        context.status = 200;
      }
      return next();
    },
  ],
  nodeResolve: true,
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            // see shared/test-esm-exports/README.md for more information on this configuration
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
};
