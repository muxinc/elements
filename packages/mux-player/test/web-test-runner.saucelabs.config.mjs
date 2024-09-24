import { esbuildPlugin } from '@web/dev-server-esbuild';
import { importMapsPlugin } from '@web/dev-server-import-maps';
import { createSauceLabsLauncher } from '@web/test-runner-saucelabs';
import { legacyPlugin } from '@web/dev-server-legacy';

const user = process.env.SAUCE_USERNAME;
const key = process.env.SAUCE_ACCESS_KEY;

if (!(user && key)) {
  console.warn('No saucelabs credentials available in this environment. Skipping');
  process.exit(1);
}

// configure the local Sauce Labs proxy, use the returned function to define the
// browsers to test
const sauceLabsLauncher = createSauceLabsLauncher({
  // your username and key for Sauce Labs, you can get this from your Sauce Labs account
  // it's recommended to store these as environment variables
  // Example for macOS/Linux:
  // export SAUCE_USERNAME=my_username
  // export SAUCE_ACCESS_KEY=my_access_key
  // Permanent (zsh)
  // echo 'export SAUCE_USERNAME=my_username' >> ~/.zshenv
  // echo 'export SAUCE_ACCESS_KEY=my_access_key' >> ~/.zshenv
  // # to reload/apply immediately in current terminal
  // source ~/.zshenv
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  // the Sauce Labs datacenter to run your tests on, defaults to 'us-west-1'
  //   region: "eu-central-1",
});

const sharedCapabilities = {
  'sauce:options': {
    name: `${process.env.npm_package_name} required tests`,
    // if you are running tests in a CI, the build id might be available as an
    // environment variable. this is useful for identifying test runs
    // this is for example the name for github actions
    build: `package: ${process.env.npm_package_name} ${process.env.GITHUB_REF || 'local'} build ${process.env.GITHUB_RUN_NUMBER || ''}`,
  },
};

/** @TODO Should probably share these (whatever ends up being shareable in the full impl) between this and web-test-runner.config.mjs (CJP) */
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

export default {
  ...config,
  concurrentBrowsers: 2,
  concurrency: 6,
  browserStartTimeout: 1000 * 30 * 5,
  sessionStartTimeout: 1000 * 30 * 5,
  sessionFinishTimeout: 1000 * 30 * 5,
  browsers: [
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'chrome',
      browserVersion: 'latest',
      platformName: 'Windows 10',
    }),
    // sauceLabsLauncher({
    //   ...sharedCapabilities,
    //   browserName: "chrome",
    //   browserVersion: "latest-1",
    //   platformName: "Windows 10",
    // }),
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'firefox',
      browserVersion: 'latest',
      platformName: 'Windows 10',
    }),
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'MicrosoftEdge',
      browserVersion: 'latest',
      platformName: 'Windows 10',
    }),
    // sauceLabsLauncher({
    //   ...sharedCapabilities,
    //   browserName: "MicrosoftEdge",
    //   browserVersion: "18",
    //   platformName: "Windows 10",
    // }),
    // sauceLabsLauncher({
    //   ...sharedCapabilities,
    //   browserName: 'internet explorer',
    //   browserVersion: '11.0',
    //   platformName: 'Windows 7',
    // }),
    sauceLabsLauncher({
      ...sharedCapabilities,
      browserName: 'safari',
      browserVersion: 'latest',
      platformName: 'macOS 10.15',
    }),
  ],
  // NOTE: Could consider a deep merge to avoid unintentional overwrites using simple spread (CJP)
  plugins: [...config.plugins, legacyPlugin()],
  testFramework: {
    config: {
      timeout: '10000',
    },
  },
};
