import { esbuildPlugin } from "@web/dev-server-esbuild";

export default {
  plugins: [
    esbuildPlugin({
      // shorthand for loaders: { '.ts': 'ts' }
      ts: true,
      // shorthand for loaders: { '.json': 'json' }
      json: true,
      // shorthand for loaders: { '.jsx': 'jsx' }
      jsx: true,
      // shorthand for loaders: { '.tsx': 'tsx' }
      tsx: true,
    }),
  ],
};
