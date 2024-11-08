

import type { APIRequestContext, Browser, BrowserContext, BrowserContextOptions, Page, LaunchOptions, ViewportSize, Geolocation, HTTPCredentials, Locator, APIResponse, PageScreenshotOptions } from './types';
export * from './types';

export type ReporterDescription = Readonly<
  ['blob'] | ['blob', { outputDir?: string, fileName?: string }] |
  ['dot'] |
  ['line'] |
  ['list'] | ['list', { printSteps?: boolean }] |
  ['github'] |
  ['junit'] | ['junit', { outputFile?: string, stripANSIControlSequences?: boolean, includeProjectInTestName?: boolean }] |
  ['json'] | ['json', { outputFile?: string }] |
  ['html'] | ['html', { outputFolder?: string, open?: 'always' | 'never' | 'on-failure', host?: string, port?: number, attachmentsBaseURL?: string }] |
  ['null'] |
  [string] | [string, any]
>;

type UseOptions<TestArgs, WorkerArgs> = Partial<WorkerArgs> & Partial<TestArgs>;


interface TestProject<TestArgs = {}, WorkerArgs = {}> {
  
  use?: UseOptions<TestArgs, WorkerArgs>;
  
  dependencies?: Array<string>;

  
  expect?: {
    /**
     * Default timeout for async expect matchers in milliseconds, defaults to 5000ms.
     */
    timeout?: number;

    
    toHaveScreenshot?: {
     
      threshold?: number;

      /**
       * an acceptable amount of pixels that could be different, unset by default.
       */
      maxDiffPixels?: number;

      
      maxDiffPixelRatio?: number;

      
      animations?: "allow"|"disabled";

      
      caret?: "hide"|"initial";

      
      scale?: "css"|"device";

      
      stylePath?: string|Array<string>;
    };

    
    toMatchSnapshot?: {
     
      threshold?: number;

      /**
       * an acceptable amount of pixels that could be different, unset by default.
       */
      maxDiffPixels?: number;

      /**
       * an acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by
       * default.
       */
      maxDiffPixelRatio?: number;
    };

    /**
     * Configuration for the [expect(value).toPass()](https://playwright.dev/docs/test-assertions) method.
     */
    toPass?: {
      /**
       * timeout for toPass method in milliseconds.
       */
      timeout?: number;

      /**
       * probe intervals for toPass method in milliseconds.
       */
      intervals?: Array<number>;
    };
  };

  
  fullyParallel?: boolean;

  
  grep?: RegExp|Array<RegExp>;

  
  grepInvert?: RegExp|Array<RegExp>;

  
  ignoreSnapshots?: boolean;

  /**
   * Metadata that will be put directly to the test report serialized as JSON.
   */
  metadata?: Metadata;

  /**
   * Project name is visible in the report and during test execution.
   */
  name?: string;

  
  outputDir?: string;

  repeatEach?: number;

  
  respectGitIgnore?: boolean;

  
  retries?: number;

 
  snapshotDir?: string;

 
  snapshotPathTemplate?: string;

  
  teardown?: string;

  
  testDir?: string;

  
  testIgnore?: string|RegExp|Array<string|RegExp>;

  
  testMatch?: string|RegExp|Array<string|RegExp>;

  
  timeout?: number;
}

export interface Project<TestArgs = {}, WorkerArgs = {}> extends TestProject<TestArgs, WorkerArgs> {
}


export interface FullProject<TestArgs = {}, WorkerArgs = {}> {
  
  use: UseOptions<PlaywrightTestOptions & TestArgs, PlaywrightWorkerOptions & WorkerArgs>;
  
  dependencies: Array<string>;

  /**
   * See [testProject.grep](https://playwright.dev/docs/api/class-testproject#test-project-grep).
   */
  grep: RegExp|Array<RegExp>;

  /**
   * See [testProject.grepInvert](https://playwright.dev/docs/api/class-testproject#test-project-grep-invert).
   */
  grepInvert: null|RegExp|Array<RegExp>;

  /**
   * See [testProject.metadata](https://playwright.dev/docs/api/class-testproject#test-project-metadata).
   */
  metadata: Metadata;

  /**
   * See [testProject.name](https://playwright.dev/docs/api/class-testproject#test-project-name).
   */
  name: string;

  /**
   * See [testProject.outputDir](https://playwright.dev/docs/api/class-testproject#test-project-output-dir).
   */
  outputDir: string;

  /**
   * See [testProject.repeatEach](https://playwright.dev/docs/api/class-testproject#test-project-repeat-each).
   */
  repeatEach: number;

  /**
   * See [testProject.retries](https://playwright.dev/docs/api/class-testproject#test-project-retries).
   */
  retries: number;

  /**
   * See [testProject.snapshotDir](https://playwright.dev/docs/api/class-testproject#test-project-snapshot-dir).
   */
  snapshotDir: string;

  /**
   * See [testProject.teardown](https://playwright.dev/docs/api/class-testproject#test-project-teardown).
   */
  teardown?: string;

  /**
   * See [testProject.testDir](https://playwright.dev/docs/api/class-testproject#test-project-test-dir).
   */
  testDir: string;

  /**
   * See [testProject.testIgnore](https://playwright.dev/docs/api/class-testproject#test-project-test-ignore).
   */
  testIgnore: string|RegExp|Array<string|RegExp>;

  /**
   * See [testProject.testMatch](https://playwright.dev/docs/api/class-testproject#test-project-test-match).
   */
  testMatch: string|RegExp|Array<string|RegExp>;

  /**
   * See [testProject.timeout](https://playwright.dev/docs/api/class-testproject#test-project-timeout).
   */
  timeout: number;
}

type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });


interface TestConfig<TestArgs = {}, WorkerArgs = {}> {
 
  projects?: Project<TestArgs, WorkerArgs>[];
  
  reporter?: LiteralUnion<'list'|'dot'|'line'|'github'|'json'|'junit'|'null'|'html', string> | ReporterDescription[];
  
  use?: UseOptions<TestArgs, WorkerArgs>;
  
  webServer?: TestConfigWebServer | TestConfigWebServer[];
  
  build?: {
    
    external?: Array<string>;
  };

 
  expect?: {
    /**
     * Default timeout for async expect matchers in milliseconds, defaults to 5000ms.
     */
    timeout?: number;

    /**
     * Configuration for the
     * [expect(page).toHaveScreenshot(name[, options])](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1)
     * method.
     */
    toHaveScreenshot?: {
      /**
       * See [`animations`](https://playwright.dev/docs/api/class-page#page-screenshot-option-animations) in
       * [page.screenshot([options])](https://playwright.dev/docs/api/class-page#page-screenshot). Defaults to `"disabled"`.
       */
      animations?: "allow"|"disabled";

      /**
       * See [`caret`](https://playwright.dev/docs/api/class-page#page-screenshot-option-caret) in
       * [page.screenshot([options])](https://playwright.dev/docs/api/class-page#page-screenshot). Defaults to `"hide"`.
       */
      caret?: "hide"|"initial";

      /**
       * An acceptable amount of pixels that could be different, unset by default.
       */
      maxDiffPixels?: number;

      /**
       * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by
       * default.
       */
      maxDiffPixelRatio?: number;

      /**
       * See [`scale`](https://playwright.dev/docs/api/class-page#page-screenshot-option-scale) in
       * [page.screenshot([options])](https://playwright.dev/docs/api/class-page#page-screenshot). Defaults to `"css"`.
       */
      scale?: "css"|"device";

      /**
       * See [`style`](https://playwright.dev/docs/api/class-page#page-screenshot-option-style) in
       * [page.screenshot([options])](https://playwright.dev/docs/api/class-page#page-screenshot).
       */
      stylePath?: string|Array<string>;

      /**
       * An acceptable perceived color difference between the same pixel in compared images, ranging from `0` (strict) and
       * `1` (lax). `"pixelmatch"` comparator computes color difference in
       * [YIQ color space](https://en.wikipedia.org/wiki/YIQ) and defaults `threshold` value to `0.2`.
       */
      threshold?: number;
    };

    /**
     * Configuration for the
     * [expect(value).toMatchSnapshot(name[, options])](https://playwright.dev/docs/api/class-snapshotassertions#snapshot-assertions-to-match-snapshot-1)
     * method.
     */
    toMatchSnapshot?: {
      /**
       * An acceptable amount of pixels that could be different, unset by default.
       */
      maxDiffPixels?: number;

      /**
       * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1` , unset by
       * default.
       */
      maxDiffPixelRatio?: number;

      /**
       * An acceptable perceived color difference between the same pixel in compared images, ranging from `0` (strict) and
       * `1` (lax). `"pixelmatch"` comparator computes color difference in
       * [YIQ color space](https://en.wikipedia.org/wiki/YIQ) and defaults `threshold` value to `0.2`.
       */
      threshold?: number;
    };

    /**
     * Configuration for the [expect(value).toPass()](https://playwright.dev/docs/test-assertions#expecttopass) method.
     */
    toPass?: {
      /**
       * Probe intervals for toPass method in milliseconds.
       */
      intervals?: Array<number>;

      /**
       * Timeout for toPass method in milliseconds.
       */
      timeout?: number;
    };
  };

  forbidOnly?: boolean;

  
  fullyParallel?: boolean;

  
  globalSetup?: string;

  globalTeardown?: string;

 
  globalTimeout?: number;


  grep?: RegExp|Array<RegExp>;

 
  grepInvert?: RegExp|Array<RegExp>;

 
  ignoreSnapshots?: boolean;

  
  maxFailures?: number;

  
  metadata?: Metadata;

  
  name?: string;

  
  outputDir?: string;

  
  preserveOutput?: "always"|"never"|"failures-only";

  
  quiet?: boolean;

  
  repeatEach?: number;

  
  reportSlowTests?: null|{
    /**
     * The maximum number of slow test files to report. Defaults to `5`.
     */
    max: number;

    /**
     * Test duration in milliseconds that is considered slow. Defaults to 15 seconds.
     */
    threshold: number;
  };

  
  respectGitIgnore?: boolean;

  
  retries?: number;

  
  shard?: null|{
    /**
     * The index of the shard to execute, one-based.
     */
    current: number;

    /**
     * The total number of shards.
     */
    total: number;
  };

  
  snapshotDir?: string;

  
  snapshotPathTemplate?: string;

  
  testDir?: string;

  testIgnore?: string|RegExp|Array<string|RegExp>;

  testMatch?: string|RegExp|Array<string|RegExp>;

  
  timeout?: number;

  
  updateSnapshots?: "all"|"none"|"missing";


  workers?: number|string;
}

export interface Config<TestArgs = {}, WorkerArgs = {}> extends TestConfig<TestArgs, WorkerArgs> {
}

export type Metadata = { [key: string]: any };


export interface FullConfig<TestArgs = {}, WorkerArgs = {}> {
  /**
   * List of resolved projects.
   */
  projects: FullProject<TestArgs, WorkerArgs>[];
  /**
   * See [testConfig.reporter](https://playwright.dev/docs/api/class-testconfig#test-config-reporter).
   */
  reporter: ReporterDescription[];
  /**
   * See [testConfig.webServer](https://playwright.dev/docs/api/class-testconfig#test-config-web-server).
   */
  webServer: TestConfigWebServer | null;
  /**
   * Path to the configuration file used to run the tests. The value is an empty string if no config file was used.
   */
  configFile?: string;

  /**
   * See [testConfig.forbidOnly](https://playwright.dev/docs/api/class-testconfig#test-config-forbid-only).
   */
  forbidOnly: boolean;

  /**
   * See [testConfig.fullyParallel](https://playwright.dev/docs/api/class-testconfig#test-config-fully-parallel).
   */
  fullyParallel: boolean;

  /**
   * See [testConfig.globalSetup](https://playwright.dev/docs/api/class-testconfig#test-config-global-setup).
   */
  globalSetup: null|string;

  /**
   * See [testConfig.globalTeardown](https://playwright.dev/docs/api/class-testconfig#test-config-global-teardown).
   */
  globalTeardown: null|string;

  /**
   * See [testConfig.globalTimeout](https://playwright.dev/docs/api/class-testconfig#test-config-global-timeout).
   */
  globalTimeout: number;

  /**
   * See [testConfig.grep](https://playwright.dev/docs/api/class-testconfig#test-config-grep).
   */
  grep: RegExp|Array<RegExp>;

  /**
   * See [testConfig.grepInvert](https://playwright.dev/docs/api/class-testconfig#test-config-grep-invert).
   */
  grepInvert: null|RegExp|Array<RegExp>;

  /**
   * See [testConfig.maxFailures](https://playwright.dev/docs/api/class-testconfig#test-config-max-failures).
   */
  maxFailures: number;

  /**
   * See [testConfig.metadata](https://playwright.dev/docs/api/class-testconfig#test-config-metadata).
   */
  metadata: Metadata;

  /**
   * See [testConfig.preserveOutput](https://playwright.dev/docs/api/class-testconfig#test-config-preserve-output).
   */
  preserveOutput: "always"|"never"|"failures-only";

  /**
   * See [testConfig.quiet](https://playwright.dev/docs/api/class-testconfig#test-config-quiet).
   */
  quiet: boolean;

  /**
   * See [testConfig.reportSlowTests](https://playwright.dev/docs/api/class-testconfig#test-config-report-slow-tests).
   */
  reportSlowTests: null|{
    /**
     * The maximum number of slow test files to report. Defaults to `5`.
     */
    max: number;

    /**
     * Test duration in milliseconds that is considered slow. Defaults to 15 seconds.
     */
    threshold: number;
  };

  /**
   * Base directory for all relative paths used in the reporters.
   */
  rootDir: string;

  /**
   * See [testConfig.shard](https://playwright.dev/docs/api/class-testconfig#test-config-shard).
   */
  shard: null|{
    /**
     * The total number of shards.
     */
    total: number;

    /**
     * The index of the shard to execute, one-based.
     */
    current: number;
  };

  /**
   * See [testConfig.updateSnapshots](https://playwright.dev/docs/api/class-testconfig#test-config-update-snapshots).
   */
  updateSnapshots: "all"|"none"|"missing";

  /**
   * Playwright version.
   */
  version: string;

  /**
   * See [testConfig.workers](https://playwright.dev/docs/api/class-testconfig#test-config-workers).
   */
  workers: number;
}

export type TestStatus = 'passed' | 'failed' | 'timedOut' | 'skipped' | 'interrupted';

type TestDetailsAnnotation = {
  type: string;
  description?: string;
};

export type TestDetails = {
  tag?: string | string[];
  annotation?: TestDetailsAnnotation | TestDetailsAnnotation[];
}

interface SuiteFunction {
  
  (title: string, callback: () => void): void;
 
  (callback: () => void): void;
 
  (title: string, details: TestDetails, callback: () => void): void;
}

interface TestFunction<TestArgs> {
 
  (title: string, body: (args: TestArgs, testInfo: TestInfo) => Promise<void> | void): void;
  
  (title: string, details: TestDetails, body: (args: TestArgs, testInfo: TestInfo) => Promise<void> | void): void;
}


export interface TestType<TestArgs extends KeyValue, WorkerArgs extends KeyValue> extends TestFunction<TestArgs & WorkerArgs> {
  
  only: TestFunction<TestArgs & WorkerArgs>;
  
  describe: SuiteFunction & {
   
  only: SuiteFunction;
    
  skip: SuiteFunction;
   
  fixme: SuiteFunction;
   
  serial: SuiteFunction & {
     
  only: SuiteFunction;
    };
    
  parallel: SuiteFunction & {
     
  only: SuiteFunction;
    };
    
  configure: (options: { mode?: 'default' | 'parallel' | 'serial', retries?: number, timeout?: number }) => void;
  };
  
  skip(title: string, body: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<void> | void): void;
  
  skip(title: string, details: TestDetails, body: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<void> | void): void;
 
  skip(): void;
  
  skip(condition: boolean, description?: string): void;
  
  skip(callback: (args: TestArgs & WorkerArgs) => boolean, description?: string): void;
  /**
   * Mark a test as "fixme", with the intention to fix it. Playwright will not run the test past the `test.fixme()`
   * call.
   *
   * To declare a "fixme" test:
   * - `test.fixme(title, body)`
   * - `test.fixme(title, details, body)`
   *
   * To annotate test as "fixme" at runtime:
   * - `test.fixme(condition, description)`
   * - `test.fixme(callback, description)`
   * - `test.fixme()`
   *
   * **Usage**
   *
   * You can declare a test as to be fixed, and Playwright will not run it.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme('to be fixed', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test should be fixed in some configurations, but not all, you can mark the test as "fixme" inside the test
   * body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the
   * test, but abort it immediately after the `test.fixme` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('to be fixed in Safari', async ({ page, browserName }) => {
   *   test.fixme(browserName === 'webkit', 'This feature breaks in Safari for some reason');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "fixme" based on some condition with a single `test.fixme(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme(({ browserName }) => browserName === 'webkit', 'Should figure out the issue');
   *
   * test('to be fixed in Safari 1', async ({ page }) => {
   *   // ...
   * });
   * test('to be fixed in Safari 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fixme()` without arguments inside the test body to always mark the test as failed. We
   * recommend using `test.fixme(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fixme();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fixme(title: string, body: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<void> | void): void;
  /**
   * Mark a test as "fixme", with the intention to fix it. Playwright will not run the test past the `test.fixme()`
   * call.
   *
   * To declare a "fixme" test:
   * - `test.fixme(title, body)`
   * - `test.fixme(title, details, body)`
   *
   * To annotate test as "fixme" at runtime:
   * - `test.fixme(condition, description)`
   * - `test.fixme(callback, description)`
   * - `test.fixme()`
   *
   * **Usage**
   *
   * You can declare a test as to be fixed, and Playwright will not run it.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme('to be fixed', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test should be fixed in some configurations, but not all, you can mark the test as "fixme" inside the test
   * body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the
   * test, but abort it immediately after the `test.fixme` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('to be fixed in Safari', async ({ page, browserName }) => {
   *   test.fixme(browserName === 'webkit', 'This feature breaks in Safari for some reason');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "fixme" based on some condition with a single `test.fixme(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme(({ browserName }) => browserName === 'webkit', 'Should figure out the issue');
   *
   * test('to be fixed in Safari 1', async ({ page }) => {
   *   // ...
   * });
   * test('to be fixed in Safari 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fixme()` without arguments inside the test body to always mark the test as failed. We
   * recommend using `test.fixme(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fixme();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fixme(title: string, details: TestDetails, body: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<void> | void): void;
  /**
   * Mark a test as "fixme", with the intention to fix it. Playwright will not run the test past the `test.fixme()`
   * call.
   *
   * To declare a "fixme" test:
   * - `test.fixme(title, body)`
   * - `test.fixme(title, details, body)`
   *
   * To annotate test as "fixme" at runtime:
   * - `test.fixme(condition, description)`
   * - `test.fixme(callback, description)`
   * - `test.fixme()`
   *
   * **Usage**
   *
   * You can declare a test as to be fixed, and Playwright will not run it.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme('to be fixed', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test should be fixed in some configurations, but not all, you can mark the test as "fixme" inside the test
   * body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the
   * test, but abort it immediately after the `test.fixme` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('to be fixed in Safari', async ({ page, browserName }) => {
   *   test.fixme(browserName === 'webkit', 'This feature breaks in Safari for some reason');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "fixme" based on some condition with a single `test.fixme(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme(({ browserName }) => browserName === 'webkit', 'Should figure out the issue');
   *
   * test('to be fixed in Safari 1', async ({ page }) => {
   *   // ...
   * });
   * test('to be fixed in Safari 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fixme()` without arguments inside the test body to always mark the test as failed. We
   * recommend using `test.fixme(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fixme();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fixme(): void;
  /**
   * Mark a test as "fixme", with the intention to fix it. Playwright will not run the test past the `test.fixme()`
   * call.
   *
   * To declare a "fixme" test:
   * - `test.fixme(title, body)`
   * - `test.fixme(title, details, body)`
   *
   * To annotate test as "fixme" at runtime:
   * - `test.fixme(condition, description)`
   * - `test.fixme(callback, description)`
   * - `test.fixme()`
   *
   * **Usage**
   *
   * You can declare a test as to be fixed, and Playwright will not run it.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme('to be fixed', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test should be fixed in some configurations, but not all, you can mark the test as "fixme" inside the test
   * body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the
   * test, but abort it immediately after the `test.fixme` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('to be fixed in Safari', async ({ page, browserName }) => {
   *   test.fixme(browserName === 'webkit', 'This feature breaks in Safari for some reason');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "fixme" based on some condition with a single `test.fixme(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme(({ browserName }) => browserName === 'webkit', 'Should figure out the issue');
   *
   * test('to be fixed in Safari 1', async ({ page }) => {
   *   // ...
   * });
   * test('to be fixed in Safari 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fixme()` without arguments inside the test body to always mark the test as failed. We
   * recommend using `test.fixme(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fixme();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fixme(condition: boolean, description?: string): void;
  /**
   * Mark a test as "fixme", with the intention to fix it. Playwright will not run the test past the `test.fixme()`
   * call.
   *
   * To declare a "fixme" test:
   * - `test.fixme(title, body)`
   * - `test.fixme(title, details, body)`
   *
   * To annotate test as "fixme" at runtime:
   * - `test.fixme(condition, description)`
   * - `test.fixme(callback, description)`
   * - `test.fixme()`
   *
   * **Usage**
   *
   * You can declare a test as to be fixed, and Playwright will not run it.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme('to be fixed', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test should be fixed in some configurations, but not all, you can mark the test as "fixme" inside the test
   * body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the
   * test, but abort it immediately after the `test.fixme` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('to be fixed in Safari', async ({ page, browserName }) => {
   *   test.fixme(browserName === 'webkit', 'This feature breaks in Safari for some reason');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "fixme" based on some condition with a single `test.fixme(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fixme(({ browserName }) => browserName === 'webkit', 'Should figure out the issue');
   *
   * test('to be fixed in Safari 1', async ({ page }) => {
   *   // ...
   * });
   * test('to be fixed in Safari 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fixme()` without arguments inside the test body to always mark the test as failed. We
   * recommend using `test.fixme(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fixme();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fixme(callback: (args: TestArgs & WorkerArgs) => boolean, description?: string): void;
  /**
   * Marks a test as "should fail". Playwright runs this test and ensures that it is actually failing. This is useful
   * for documentation purposes to acknowledge that some functionality is broken until it is fixed.
   *
   * To declare a "failing" test:
   * - `test.fail(title, body)`
   * - `test.fail(title, details, body)`
   *
   * To annotate test as "failing" at runtime:
   * - `test.fail(condition, description)`
   * - `test.fail(callback, description)`
   * - `test.fail()`
   *
   * **Usage**
   *
   * You can declare a test as failing, so that Playwright ensures it actually fails.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail('not yet ready', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test fails in some configurations, but not all, you can mark the test as failing inside the test body based
   * on some condition. We recommend passing a `description` argument in this case.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('fail in WebKit', async ({ page, browserName }) => {
   *   test.fail(browserName === 'webkit', 'This feature is not implemented for Mac yet');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "should fail" based on some condition with a single `test.fail(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail(({ browserName }) => browserName === 'webkit', 'not implemented yet');
   *
   * test('fail in WebKit 1', async ({ page }) => {
   *   // ...
   * });
   * test('fail in WebKit 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fail()` without arguments inside the test body to always mark the test as failed. We
   * recommend declaring a failing test with `test.fail(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fail();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fail(title: string, body: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<void> | void): void;
  /**
   * Marks a test as "should fail". Playwright runs this test and ensures that it is actually failing. This is useful
   * for documentation purposes to acknowledge that some functionality is broken until it is fixed.
   *
   * To declare a "failing" test:
   * - `test.fail(title, body)`
   * - `test.fail(title, details, body)`
   *
   * To annotate test as "failing" at runtime:
   * - `test.fail(condition, description)`
   * - `test.fail(callback, description)`
   * - `test.fail()`
   *
   * **Usage**
   *
   * You can declare a test as failing, so that Playwright ensures it actually fails.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail('not yet ready', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test fails in some configurations, but not all, you can mark the test as failing inside the test body based
   * on some condition. We recommend passing a `description` argument in this case.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('fail in WebKit', async ({ page, browserName }) => {
   *   test.fail(browserName === 'webkit', 'This feature is not implemented for Mac yet');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "should fail" based on some condition with a single `test.fail(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail(({ browserName }) => browserName === 'webkit', 'not implemented yet');
   *
   * test('fail in WebKit 1', async ({ page }) => {
   *   // ...
   * });
   * test('fail in WebKit 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fail()` without arguments inside the test body to always mark the test as failed. We
   * recommend declaring a failing test with `test.fail(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fail();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fail(title: string, details: TestDetails, body: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<void> | void): void;
  /**
   * Marks a test as "should fail". Playwright runs this test and ensures that it is actually failing. This is useful
   * for documentation purposes to acknowledge that some functionality is broken until it is fixed.
   *
   * To declare a "failing" test:
   * - `test.fail(title, body)`
   * - `test.fail(title, details, body)`
   *
   * To annotate test as "failing" at runtime:
   * - `test.fail(condition, description)`
   * - `test.fail(callback, description)`
   * - `test.fail()`
   *
   * **Usage**
   *
   * You can declare a test as failing, so that Playwright ensures it actually fails.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail('not yet ready', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test fails in some configurations, but not all, you can mark the test as failing inside the test body based
   * on some condition. We recommend passing a `description` argument in this case.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('fail in WebKit', async ({ page, browserName }) => {
   *   test.fail(browserName === 'webkit', 'This feature is not implemented for Mac yet');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "should fail" based on some condition with a single `test.fail(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail(({ browserName }) => browserName === 'webkit', 'not implemented yet');
   *
   * test('fail in WebKit 1', async ({ page }) => {
   *   // ...
   * });
   * test('fail in WebKit 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fail()` without arguments inside the test body to always mark the test as failed. We
   * recommend declaring a failing test with `test.fail(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fail();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fail(condition: boolean, description?: string): void;
  /**
   * Marks a test as "should fail". Playwright runs this test and ensures that it is actually failing. This is useful
   * for documentation purposes to acknowledge that some functionality is broken until it is fixed.
   *
   * To declare a "failing" test:
   * - `test.fail(title, body)`
   * - `test.fail(title, details, body)`
   *
   * To annotate test as "failing" at runtime:
   * - `test.fail(condition, description)`
   * - `test.fail(callback, description)`
   * - `test.fail()`
   *
   * **Usage**
   *
   * You can declare a test as failing, so that Playwright ensures it actually fails.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail('not yet ready', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test fails in some configurations, but not all, you can mark the test as failing inside the test body based
   * on some condition. We recommend passing a `description` argument in this case.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('fail in WebKit', async ({ page, browserName }) => {
   *   test.fail(browserName === 'webkit', 'This feature is not implemented for Mac yet');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "should fail" based on some condition with a single `test.fail(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail(({ browserName }) => browserName === 'webkit', 'not implemented yet');
   *
   * test('fail in WebKit 1', async ({ page }) => {
   *   // ...
   * });
   * test('fail in WebKit 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fail()` without arguments inside the test body to always mark the test as failed. We
   * recommend declaring a failing test with `test.fail(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fail();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fail(callback: (args: TestArgs & WorkerArgs) => boolean, description?: string): void;
  /**
   * Marks a test as "should fail". Playwright runs this test and ensures that it is actually failing. This is useful
   * for documentation purposes to acknowledge that some functionality is broken until it is fixed.
   *
   * To declare a "failing" test:
   * - `test.fail(title, body)`
   * - `test.fail(title, details, body)`
   *
   * To annotate test as "failing" at runtime:
   * - `test.fail(condition, description)`
   * - `test.fail(callback, description)`
   * - `test.fail()`
   *
   * **Usage**
   *
   * You can declare a test as failing, so that Playwright ensures it actually fails.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail('not yet ready', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * If your test fails in some configurations, but not all, you can mark the test as failing inside the test body based
   * on some condition. We recommend passing a `description` argument in this case.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('fail in WebKit', async ({ page, browserName }) => {
   *   test.fail(browserName === 'webkit', 'This feature is not implemented for Mac yet');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "should fail" based on some condition with a single `test.fail(callback, description)` call.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.fail(({ browserName }) => browserName === 'webkit', 'not implemented yet');
   *
   * test('fail in WebKit 1', async ({ page }) => {
   *   // ...
   * });
   * test('fail in WebKit 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * You can also call `test.fail()` without arguments inside the test body to always mark the test as failed. We
   * recommend declaring a failing test with `test.fail(title, body)` instead.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('less readable', async ({ page }) => {
   *   test.fail();
   *   // ...
   * });
   * ```
   *
   * @param title Test title.
   * @param details See [test.(call)(title[, details, body])](https://playwright.dev/docs/api/class-test#test-call) for test details
   * description.
   * @param body Test body that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param callback A function that returns whether to mark as "should fail", based on test fixtures. Test or tests are marked as
   * "should fail" when the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fail(): void;
  /**
   * Marks a test as "slow". Slow test will be given triple the default timeout.
   *
   * Note that [test.slow([condition, callback, description])](https://playwright.dev/docs/api/class-test#test-slow)
   * cannot be used in a `beforeAll` or `afterAll` hook. Use
   * [test.setTimeout(timeout)](https://playwright.dev/docs/api/class-test#test-set-timeout) instead.
   * - `test.slow()`
   * - `test.slow(condition, description)`
   * - `test.slow(callback, description)`
   *
   * **Usage**
   *
   * You can mark a test as slow by calling `test.slow()` inside the test body.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('slow test', async ({ page }) => {
   *   test.slow();
   *   // ...
   * });
   * ```
   *
   * If your test is slow in some configurations, but not all, you can mark it as slow based on a condition. We
   * recommend passing a `description` argument in this case.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('slow in Safari', async ({ page, browserName }) => {
   *   test.slow(browserName === 'webkit', 'This feature is slow in Safari');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "slow" based on some condition by passing a callback.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.slow(({ browserName }) => browserName === 'webkit', 'all tests are slow in Safari');
   *
   * test('slow in Safari 1', async ({ page }) => {
   *   // ...
   * });
   * test('fail in Safari 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * @param condition Test is marked as "slow" when the condition is `true`.
   * @param callback A function that returns whether to mark as "slow", based on test fixtures. Test or tests are marked as "slow" when
   * the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  slow(): void;
  /**
   * Marks a test as "slow". Slow test will be given triple the default timeout.
   *
   * Note that [test.slow([condition, callback, description])](https://playwright.dev/docs/api/class-test#test-slow)
   * cannot be used in a `beforeAll` or `afterAll` hook. Use
   * [test.setTimeout(timeout)](https://playwright.dev/docs/api/class-test#test-set-timeout) instead.
   * - `test.slow()`
   * - `test.slow(condition, description)`
   * - `test.slow(callback, description)`
   *
   * **Usage**
   *
   * You can mark a test as slow by calling `test.slow()` inside the test body.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('slow test', async ({ page }) => {
   *   test.slow();
   *   // ...
   * });
   * ```
   *
   * If your test is slow in some configurations, but not all, you can mark it as slow based on a condition. We
   * recommend passing a `description` argument in this case.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('slow in Safari', async ({ page, browserName }) => {
   *   test.slow(browserName === 'webkit', 'This feature is slow in Safari');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "slow" based on some condition by passing a callback.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.slow(({ browserName }) => browserName === 'webkit', 'all tests are slow in Safari');
   *
   * test('slow in Safari 1', async ({ page }) => {
   *   // ...
   * });
   * test('fail in Safari 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * @param condition Test is marked as "slow" when the condition is `true`.
   * @param callback A function that returns whether to mark as "slow", based on test fixtures. Test or tests are marked as "slow" when
   * the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  slow(condition: boolean, description?: string): void;
  /**
   * Marks a test as "slow". Slow test will be given triple the default timeout.
   *
   * Note that [test.slow([condition, callback, description])](https://playwright.dev/docs/api/class-test#test-slow)
   * cannot be used in a `beforeAll` or `afterAll` hook. Use
   * [test.setTimeout(timeout)](https://playwright.dev/docs/api/class-test#test-set-timeout) instead.
   * - `test.slow()`
   * - `test.slow(condition, description)`
   * - `test.slow(callback, description)`
   *
   * **Usage**
   *
   * You can mark a test as slow by calling `test.slow()` inside the test body.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('slow test', async ({ page }) => {
   *   test.slow();
   *   // ...
   * });
   * ```
   *
   * If your test is slow in some configurations, but not all, you can mark it as slow based on a condition. We
   * recommend passing a `description` argument in this case.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('slow in Safari', async ({ page, browserName }) => {
   *   test.slow(browserName === 'webkit', 'This feature is slow in Safari');
   *   // ...
   * });
   * ```
   *
   * You can mark all tests in a file or
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group as
   * "slow" based on some condition by passing a callback.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.slow(({ browserName }) => browserName === 'webkit', 'all tests are slow in Safari');
   *
   * test('slow in Safari 1', async ({ page }) => {
   *   // ...
   * });
   * test('fail in Safari 2', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * @param condition Test is marked as "slow" when the condition is `true`.
   * @param callback A function that returns whether to mark as "slow", based on test fixtures. Test or tests are marked as "slow" when
   * the return value is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  slow(callback: (args: TestArgs & WorkerArgs) => boolean, description?: string): void;
  /**
   * Changes the timeout for the test. Zero means no timeout. Learn more about [various timeouts](https://playwright.dev/docs/test-timeouts).
   *
   * Timeout for the currently running test is available through
   * [testInfo.timeout](https://playwright.dev/docs/api/class-testinfo#test-info-timeout).
   *
   * **Usage**
   * - Changing test timeout.
   *
   *   ```js
   *   test('very slow test', async ({ page }) => {
   *     test.setTimeout(120000);
   *     // ...
   *   });
   *   ```
   *
   * - Changing timeout from a slow `beforeEach` or `afterEach` hook. Note that this affects the test timeout that is
   *   shared with `beforeEach`/`afterEach` hooks.
   *
   *   ```js
   *   test.beforeEach(async ({ page }, testInfo) => {
   *     // Extend timeout for all tests running this hook by 30 seconds.
   *     test.setTimeout(testInfo.timeout + 30000);
   *   });
   *   ```
   *
   * - Changing timeout for a `beforeAll` or `afterAll` hook. Note this affects the hook's timeout, not the test
   *   timeout.
   *
   *   ```js
   *   test.beforeAll(async () => {
   *     // Set timeout for this hook.
   *     test.setTimeout(60000);
   *   });
   *   ```
   *
   * - Changing timeout for all tests in a
   *   [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group.
   *
   *   ```js
   *   test.describe('group', () => {
   *     // Applies to all tests in this group.
   *     test.describe.configure({ timeout: 60000 });
   *
   *     test('test one', async () => { /* ... *\/ });
   *     test('test two', async () => { /* ... *\/ });
   *     test('test three', async () => { /* ... *\/ });
   *   });
   *   ```
   *
   * @param timeout Timeout in milliseconds.
   */
  setTimeout(timeout: number): void;
  /**
   * Declares a `beforeEach` hook that is executed before each test.
   *
   * When called in the scope of a test file, runs before each test in the file. When called inside a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group, runs
   * before each test in the group.
   *
   * You can access all the same [Fixtures](https://playwright.dev/docs/api/class-fixtures) as the test body itself, and
   * also the [TestInfo](https://playwright.dev/docs/api/class-testinfo) object that gives a lot of useful information.
   * For example, you can navigate the page before starting the test.
   *
   * You can use [test.afterEach([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-after-each) to
   * teardown any resources set up in `beforeEach`.
   * - `test.beforeEach(hookFunction)`
   * - `test.beforeEach(title, hookFunction)`
   *
   * **Details**
   *
   * When multiple `beforeEach` hooks are added, they will run in the order of their registration.
   *
   * Playwright will continue running all applicable hooks even if some of them have failed.
   *
   * **Usage**
   *
   * ```js
   * // example.spec.ts
   * import { test, expect } from '@playwright/test';
   *
   * test.beforeEach(async ({ page }) => {
   *   console.log(`Running ${test.info().title}`);
   *   await page.goto('https://my.start.url/');
   * });
   *
   * test('my test', async ({ page }) => {
   *   expect(page.url()).toBe('https://my.start.url/');
   * });
   * ```
   *
   * Alternatively, you can declare a hook **with a title**.
   *
   * ```js
   * // example.spec.ts
   * test.beforeEach('Open start URL', async ({ page }) => {
   *   console.log(`Running ${test.info().title}`);
   *   await page.goto('https://my.start.url/');
   * });
   * ```
   *
   * @param title Hook title.
   * @param hookFunction Hook function that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   */
  beforeEach(inner: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<any> | any): void;
  /**
   * Declares a `beforeEach` hook that is executed before each test.
   *
   * When called in the scope of a test file, runs before each test in the file. When called inside a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group, runs
   * before each test in the group.
   *
   * You can access all the same [Fixtures](https://playwright.dev/docs/api/class-fixtures) as the test body itself, and
   * also the [TestInfo](https://playwright.dev/docs/api/class-testinfo) object that gives a lot of useful information.
   * For example, you can navigate the page before starting the test.
   *
   * You can use [test.afterEach([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-after-each) to
   * teardown any resources set up in `beforeEach`.
   * - `test.beforeEach(hookFunction)`
   * - `test.beforeEach(title, hookFunction)`
   *
   * **Details**
   *
   * When multiple `beforeEach` hooks are added, they will run in the order of their registration.
   *
   * Playwright will continue running all applicable hooks even if some of them have failed.
   *
   * **Usage**
   *
   * ```js
   * // example.spec.ts
   * import { test, expect } from '@playwright/test';
   *
   * test.beforeEach(async ({ page }) => {
   *   console.log(`Running ${test.info().title}`);
   *   await page.goto('https://my.start.url/');
   * });
   *
   * test('my test', async ({ page }) => {
   *   expect(page.url()).toBe('https://my.start.url/');
   * });
   * ```
   *
   * Alternatively, you can declare a hook **with a title**.
   *
   * ```js
   * // example.spec.ts
   * test.beforeEach('Open start URL', async ({ page }) => {
   *   console.log(`Running ${test.info().title}`);
   *   await page.goto('https://my.start.url/');
   * });
   * ```
   *
   * @param title Hook title.
   * @param hookFunction Hook function that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   */
  beforeEach(title: string, inner: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<any> | any): void;
  /**
   * Declares an `afterEach` hook that is executed after each test.
   *
   * When called in the scope of a test file, runs after each test in the file. When called inside a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group, runs
   * after each test in the group.
   *
   * You can access all the same [Fixtures](https://playwright.dev/docs/api/class-fixtures) as the test body itself, and
   * also the [TestInfo](https://playwright.dev/docs/api/class-testinfo) object that gives a lot of useful information.
   * For example, you can check whether the test succeeded or failed.
   * - `test.afterEach(hookFunction)`
   * - `test.afterEach(title, hookFunction)`
   *
   * **Details**
   *
   * When multiple `afterEach` hooks are added, they will run in the order of their registration.
   *
   * Playwright will continue running all applicable hooks even if some of them have failed.
   *
   * **Usage**
   *
   * ```js
   * // example.spec.ts
   * import { test, expect } from '@playwright/test';
   *
   * test.afterEach(async ({ page }) => {
   *   console.log(`Finished ${test.info().title} with status ${test.info().status}`);
   *
   *   if (test.info().status !== test.info().expectedStatus)
   *     console.log(`Did not run as expected, ended up at ${page.url()}`);
   * });
   *
   * test('my test', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * Alternatively, you can declare a hook **with a title**.
   *
   * ```js
   * // example.spec.ts
   * test.afterEach('Status check', async ({ page }) => {
   *   if (test.info().status !== test.info().expectedStatus)
   *     console.log(`Did not run as expected, ended up at ${page.url()}`);
   * });
   * ```
   *
   * @param title Hook title.
   * @param hookFunction Hook function that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   */
  afterEach(inner: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<any> | any): void;
  /**
   * Declares an `afterEach` hook that is executed after each test.
   *
   * When called in the scope of a test file, runs after each test in the file. When called inside a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group, runs
   * after each test in the group.
   *
   * You can access all the same [Fixtures](https://playwright.dev/docs/api/class-fixtures) as the test body itself, and
   * also the [TestInfo](https://playwright.dev/docs/api/class-testinfo) object that gives a lot of useful information.
   * For example, you can check whether the test succeeded or failed.
   * - `test.afterEach(hookFunction)`
   * - `test.afterEach(title, hookFunction)`
   *
   * **Details**
   *
   * When multiple `afterEach` hooks are added, they will run in the order of their registration.
   *
   * Playwright will continue running all applicable hooks even if some of them have failed.
   *
   * **Usage**
   *
   * ```js
   * // example.spec.ts
   * import { test, expect } from '@playwright/test';
   *
   * test.afterEach(async ({ page }) => {
   *   console.log(`Finished ${test.info().title} with status ${test.info().status}`);
   *
   *   if (test.info().status !== test.info().expectedStatus)
   *     console.log(`Did not run as expected, ended up at ${page.url()}`);
   * });
   *
   * test('my test', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * Alternatively, you can declare a hook **with a title**.
   *
   * ```js
   * // example.spec.ts
   * test.afterEach('Status check', async ({ page }) => {
   *   if (test.info().status !== test.info().expectedStatus)
   *     console.log(`Did not run as expected, ended up at ${page.url()}`);
   * });
   * ```
   *
   * @param title Hook title.
   * @param hookFunction Hook function that takes one or two arguments: an object with fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   */
  afterEach(title: string, inner: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<any> | any): void;
  /**
   * Declares a `beforeAll` hook that is executed once per worker process before all tests.
   *
   * When called in the scope of a test file, runs before all tests in the file. When called inside a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group, runs
   * before all tests in the group.
   *
   * You can use [test.afterAll([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-after-all) to
   * teardown any resources set up in `beforeAll`.
   * - `test.beforeAll(hookFunction)`
   * - `test.beforeAll(title, hookFunction)`
   *
   * **Details**
   *
   * When multiple `beforeAll` hooks are added, they will run in the order of their registration.
   *
   * Note that worker process is restarted on test failures, and `beforeAll` hook runs again in the new worker. Learn
   * more about [workers and failures](https://playwright.dev/docs/test-retries).
   *
   * Playwright will continue running all applicable hooks even if some of them have failed.
   *
   * **Usage**
   *
   * ```js
   * // example.spec.ts
   * import { test, expect } from '@playwright/test';
   *
   * test.beforeAll(async () => {
   *   console.log('Before tests');
   * });
   *
   * test.afterAll(async () => {
   *   console.log('After tests');
   * });
   *
   * test('my test', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * Alternatively, you can declare a hook **with a title**.
   *
   * ```js
   * // example.spec.ts
   * test.beforeAll('Setup', async () => {
   *   console.log('Before tests');
   * });
   * ```
   *
   * @param title Hook title.
   * @param hookFunction Hook function that takes one or two arguments: an object with worker fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   */
  beforeAll(inner: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<any> | any): void;
  /**
   * Declares a `beforeAll` hook that is executed once per worker process before all tests.
   *
   * When called in the scope of a test file, runs before all tests in the file. When called inside a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group, runs
   * before all tests in the group.
   *
   * You can use [test.afterAll([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-after-all) to
   * teardown any resources set up in `beforeAll`.
   * - `test.beforeAll(hookFunction)`
   * - `test.beforeAll(title, hookFunction)`
   *
   * **Details**
   *
   * When multiple `beforeAll` hooks are added, they will run in the order of their registration.
   *
   * Note that worker process is restarted on test failures, and `beforeAll` hook runs again in the new worker. Learn
   * more about [workers and failures](https://playwright.dev/docs/test-retries).
   *
   * Playwright will continue running all applicable hooks even if some of them have failed.
   *
   * **Usage**
   *
   * ```js
   * // example.spec.ts
   * import { test, expect } from '@playwright/test';
   *
   * test.beforeAll(async () => {
   *   console.log('Before tests');
   * });
   *
   * test.afterAll(async () => {
   *   console.log('After tests');
   * });
   *
   * test('my test', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   * Alternatively, you can declare a hook **with a title**.
   *
   * ```js
   * // example.spec.ts
   * test.beforeAll('Setup', async () => {
   *   console.log('Before tests');
   * });
   * ```
   *
   * @param title Hook title.
   * @param hookFunction Hook function that takes one or two arguments: an object with worker fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   */
  beforeAll(title: string, inner: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<any> | any): void;
  /**
   * Declares an `afterAll` hook that is executed once per worker after all tests.
   *
   * When called in the scope of a test file, runs after all tests in the file. When called inside a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group, runs
   * after all tests in the group.
   *
   * **Details**
   *
   * When multiple `afterAll` hooks are added, they will run in the order of their registration.
   *
   * Note that worker process is restarted on test failures, and `afterAll` hook runs again in the new worker. Learn
   * more about [workers and failures](https://playwright.dev/docs/test-retries).
   *
   * Playwright will continue running all applicable hooks even if some of them have failed.
   * - `test.afterAll(hookFunction)`
   * - `test.afterAll(title, hookFunction)`
   *
   * **Usage**
   *
   * ```js
   * test.afterAll(async () => {
   *   console.log('Done with tests');
   *   // ...
   * });
   * ```
   *
   * Alternatively, you can declare a hook **with a title**.
   *
   * ```js
   * test.afterAll('Teardown', async () => {
   *   console.log('Done with tests');
   *   // ...
   * });
   * ```
   *
   * @param title Hook title.
   * @param hookFunction Hook function that takes one or two arguments: an object with worker fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   */
  afterAll(inner: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<any> | any): void;
  /**
   * Declares an `afterAll` hook that is executed once per worker after all tests.
   *
   * When called in the scope of a test file, runs after all tests in the file. When called inside a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group, runs
   * after all tests in the group.
   *
   * **Details**
   *
   * When multiple `afterAll` hooks are added, they will run in the order of their registration.
   *
   * Note that worker process is restarted on test failures, and `afterAll` hook runs again in the new worker. Learn
   * more about [workers and failures](https://playwright.dev/docs/test-retries).
   *
   * Playwright will continue running all applicable hooks even if some of them have failed.
   * - `test.afterAll(hookFunction)`
   * - `test.afterAll(title, hookFunction)`
   *
   * **Usage**
   *
   * ```js
   * test.afterAll(async () => {
   *   console.log('Done with tests');
   *   // ...
   * });
   * ```
   *
   * Alternatively, you can declare a hook **with a title**.
   *
   * ```js
   * test.afterAll('Teardown', async () => {
   *   console.log('Done with tests');
   *   // ...
   * });
   * ```
   *
   * @param title Hook title.
   * @param hookFunction Hook function that takes one or two arguments: an object with worker fixtures and optional
   * [TestInfo](https://playwright.dev/docs/api/class-testinfo).
   */
  afterAll(title: string, inner: (args: TestArgs & WorkerArgs, testInfo: TestInfo) => Promise<any> | any): void;
  /**
   * Specifies options or fixtures to use in a single test file or a
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) group. Most
   * useful to set an option, for example set `locale` to configure `context` fixture.
   *
   * **Usage**
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.use({ locale: 'en-US' });
   *
   * test('test with locale', async ({ page }) => {
   *   // Default context and page have locale as specified
   * });
   * ```
   *
   * **Details**
   *
   * `test.use` can be called either in the global scope or inside `test.describe`. It is an error to call it within
   * `beforeEach` or `beforeAll`.
   *
   * It is also possible to override a fixture by providing a function.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.use({
   *   locale: async ({}, use) => {
   *     // Read locale from some configuration file.
   *     const locale = await fs.promises.readFile('test-locale', 'utf-8');
   *     await use(locale);
   *   },
   * });
   *
   * test('test with locale', async ({ page }) => {
   *   // Default context and page have locale as specified
   * });
   * ```
   *
   * @param options An object with local options.
   */
  use(fixtures: Fixtures<{}, {}, TestArgs, WorkerArgs>): void;
  /**
   * Declares a test step that is shown in the report.
   *
   * **Usage**
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('test', async ({ page }) => {
   *   await test.step('Log in', async () => {
   *     // ...
   *   });
   *
   *   await test.step('Outer step', async () => {
   *     // ...
   *     // You can nest steps inside each other.
   *     await test.step('Inner step', async () => {
   *       // ...
   *     });
   *   });
   * });
   * ```
   *
   * **Details**
   *
   * The method returns the value returned by the step callback.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('test', async ({ page }) => {
   *   const user = await test.step('Log in', async () => {
   *     // ...
   *     return 'john';
   *   });
   *   expect(user).toBe('john');
   * });
   * ```
   *
   * **Decorator**
   *
   * You can use TypeScript method decorators to turn a method into a step. Each call to the decorated method will show
   * up as a step in the report.
   *
   * ```js
   * function step(target: Function, context: ClassMethodDecoratorContext) {
   *   return function replacementMethod(...args: any) {
   *     const name = this.constructor.name + '.' + (context.name as string);
   *     return test.step(name, async () => {
   *       return await target.call(this, ...args);
   *     });
   *   };
   * }
   *
   * class LoginPage {
   *   constructor(readonly page: Page) {}
   *
   *   @step
   *   async login() {
   *     const account = { username: 'Alice', password: 's3cr3t' };
   *     await this.page.getByLabel('Username or email address').fill(account.username);
   *     await this.page.getByLabel('Password').fill(account.password);
   *     await this.page.getByRole('button', { name: 'Sign in' }).click();
   *     await expect(this.page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
   *   }
   * }
   *
   * test('example', async ({ page }) => {
   *   const loginPage = new LoginPage(page);
   *   await loginPage.login();
   * });
   * ```
   *
   * **Boxing**
   *
   * When something inside a step fails, you would usually see the error pointing to the exact action that failed. For
   * example, consider the following login step:
   *
   * ```js
   * async function login(page) {
   *   await test.step('login', async () => {
   *     const account = { username: 'Alice', password: 's3cr3t' };
   *     await page.getByLabel('Username or email address').fill(account.username);
   *     await page.getByLabel('Password').fill(account.password);
   *     await page.getByRole('button', { name: 'Sign in' }).click();
   *     await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
   *   });
   * }
   *
   * test('example', async ({ page }) => {
   *   await page.goto('https://github.com/login');
   *   await login(page);
   * });
   * ```
   *
   * ```txt
   * Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   *   ... error details omitted ...
   *
   *    8 |     await page.getByRole('button', { name: 'Sign in' }).click();
   * >  9 |     await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
   *      |                                                                               ^
   *   10 |   });
   * ```
   *
   * As we see above, the test may fail with an error pointing inside the step. If you would like the error to highlight
   * the "login" step instead of its internals, use the `box` option. An error inside a boxed step points to the step
   * call site.
   *
   * ```js
   * async function login(page) {
   *   await test.step('login', async () => {
   *     // ...
   *   }, { box: true });  // Note the "box" option here.
   * }
   * ```
   *
   * ```txt
   * Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
   *   ... error details omitted ...
   *
   *   14 |   await page.goto('https://github.com/login');
   * > 15 |   await login(page);
   *      |         ^
   *   16 | });
   * ```
   *
   * You can also create a TypeScript decorator for a boxed step, similar to a regular step decorator above:
   *
   * ```js
   * function boxedStep(target: Function, context: ClassMethodDecoratorContext) {
   *   return function replacementMethod(...args: any) {
   *     const name = this.constructor.name + '.' + (context.name as string);
   *     return test.step(name, async () => {
   *       return await target.call(this, ...args);
   *     }, { box: true });  // Note the "box" option here.
   *   };
   * }
   *
   * class LoginPage {
   *   constructor(readonly page: Page) {}
   *
   *   @boxedStep
   *   async login() {
   *     // ....
   *   }
   * }
   *
   * test('example', async ({ page }) => {
   *   const loginPage = new LoginPage(page);
   *   await loginPage.login();  // <-- Error will be reported on this line.
   * });
   * ```
   *
   * @param title Step name.
   * @param body Step body.
   * @param options
   */
  step<T>(title: string, body: () => T | Promise<T>, options?: { box?: boolean, location?: Location }): Promise<T>;
  /**
   * `expect` function can be used to create test assertions. Read more about [test assertions](https://playwright.dev/docs/test-assertions).
   *
   * **Usage**
   *
   * ```js
   * test('example', async ({ page }) => {
   *   await test.expect(page).toHaveTitle('Title');
   * });
   * ```
   *
   */
  expect: Expect<{}>;
  /**
   * Extends the `test` object by defining fixtures and/or options that can be used in the tests.
   *
   * **Usage**
   *
   * First define a fixture and/or an option.
   *
   * ```js
   * import { test as base } from '@playwright/test';
   * import { TodoPage } from './todo-page';
   *
   * export type Options = { defaultItem: string };
   *
   * // Extend basic test by providing a "defaultItem" option and a "todoPage" fixture.
   * export const test = base.extend<Options & { todoPage: TodoPage }>({
   *   // Define an option and provide a default value.
   *   // We can later override it in the config.
   *   defaultItem: ['Do stuff', { option: true }],
   *
   *   // Define a fixture. Note that it can use built-in fixture "page"
   *   // and a new option "defaultItem".
   *   todoPage: async ({ page, defaultItem }, use) => {
   *     const todoPage = new TodoPage(page);
   *     await todoPage.goto();
   *     await todoPage.addToDo(defaultItem);
   *     await use(todoPage);
   *     await todoPage.removeAll();
   *   },
   * });
   * ```
   *
   * Then use the fixture in the test.
   *
   * ```js
   * // example.spec.ts
   * import { test } from './my-test';
   *
   * test('test 1', async ({ todoPage }) => {
   *   await todoPage.addToDo('my todo');
   *   // ...
   * });
   * ```
   *
   * Configure the option in config file.
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   * import type { Options } from './my-test';
   *
   * export default defineConfig<Options>({
   *   projects: [
   *     {
   *       name: 'shopping',
   *       use: { defaultItem: 'Buy milk' },
   *     },
   *     {
   *       name: 'wellbeing',
   *       use: { defaultItem: 'Exercise!' },
   *     },
   *   ]
   * });
   * ```
   *
   * Learn more about [fixtures](https://playwright.dev/docs/test-fixtures) and [parametrizing tests](https://playwright.dev/docs/test-parameterize).
   * @param fixtures An object containing fixtures and/or options. Learn more about [fixtures format](https://playwright.dev/docs/test-fixtures).
   */
  extend<T extends KeyValue, W extends KeyValue = {}>(fixtures: Fixtures<T, W, TestArgs, WorkerArgs>): TestType<TestArgs & T, WorkerArgs & W>;
  /**
   * Returns information about the currently running test. This method can only be called during the test execution,
   * otherwise it throws.
   *
   * **Usage**
   *
   * ```js
   * test('example test', async ({ page }) => {
   *   // ...
   *   await test.info().attach('screenshot', {
   *     body: await page.screenshot(),
   *     contentType: 'image/png',
   *   });
   * });
   * ```
   *
   */
  info(): TestInfo;
}

type KeyValue = { [key: string]: any };
export type TestFixture<R, Args extends KeyValue> = (args: Args, use: (r: R) => Promise<void>, testInfo: TestInfo) => any;
export type WorkerFixture<R, Args extends KeyValue> = (args: Args, use: (r: R) => Promise<void>, workerInfo: WorkerInfo) => any;
type TestFixtureValue<R, Args extends KeyValue> = Exclude<R, Function> | TestFixture<R, Args>;
type WorkerFixtureValue<R, Args extends KeyValue> = Exclude<R, Function> | WorkerFixture<R, Args>;
export type Fixtures<T extends KeyValue = {}, W extends KeyValue = {}, PT extends KeyValue = {}, PW extends KeyValue = {}> = {
  [K in keyof PW]?: WorkerFixtureValue<PW[K], W & PW> | [WorkerFixtureValue<PW[K], W & PW>, { scope: 'worker', timeout?: number | undefined, title?: string, box?: boolean }];
} & {
  [K in keyof PT]?: TestFixtureValue<PT[K], T & W & PT & PW> | [TestFixtureValue<PT[K], T & W & PT & PW>, { scope: 'test', timeout?: number | undefined, title?: string, box?: boolean }];
} & {
  [K in keyof W]?: [WorkerFixtureValue<W[K], W & PW>, { scope: 'worker', auto?: boolean, option?: boolean, timeout?: number | undefined, title?: string, box?: boolean }];
} & {
  [K in keyof T]?: TestFixtureValue<T[K], T & W & PT & PW> | [TestFixtureValue<T[K], T & W & PT & PW>, { scope?: 'test', auto?: boolean, option?: boolean, timeout?: number | undefined, title?: string, box?: boolean }];
};

type BrowserName = 'chromium' | 'firefox' | 'webkit';
type BrowserChannel = Exclude<LaunchOptions['channel'], undefined>;
type ColorScheme = Exclude<BrowserContextOptions['colorScheme'], undefined>;
type ClientCertificate = Exclude<BrowserContextOptions['clientCertificates'], undefined>[0];
type ExtraHTTPHeaders = Exclude<BrowserContextOptions['extraHTTPHeaders'], undefined>;
type Proxy = Exclude<BrowserContextOptions['proxy'], undefined>;
type StorageState = Exclude<BrowserContextOptions['storageState'], undefined>;
type ServiceWorkerPolicy = Exclude<BrowserContextOptions['serviceWorkers'], undefined>;
type ConnectOptions = {
  /**
   * A browser websocket endpoint to connect to.
   */
  wsEndpoint: string;

  /**
   * Additional HTTP headers to be sent with web socket connect request.
   */
  headers?: { [key: string]: string; };

  /**
   * This option exposes network available on the connecting client to the browser being connected to.
   * Consists of a list of rules separated by comma.
   *
   * Available rules:
   * - Hostname pattern, for example: `example.com`, `*.org:99`, `x.*.y.com`, `*foo.org`.
   * - IP literal, for example: `127.0.0.1`, `0.0.0.0:99`, `[::1]`, `[0:0::1]:99`.
   * - `<loopback>` that matches local loopback interfaces: `localhost`, `*.localhost`, `127.0.0.1`, `[::1]`.

   * Some common examples:
   * - `"*"` to expose all network.
   * - `"<loopback>"` to expose localhost network.
   * - `"*.test.internal-domain,*.staging.internal-domain,<loopback>"` to expose test/staging deployments and localhost.
   */
  exposeNetwork?: string;

  /**
   * Timeout in milliseconds for the connection to be established. Optional, defaults to no timeout.
   */
  timeout?: number;
};

/**
 * Playwright Test provides many options to configure test environment,
 * [Browser](https://playwright.dev/docs/api/class-browser),
 * [BrowserContext](https://playwright.dev/docs/api/class-browsercontext) and more.
 *
 * These options are usually provided in the [configuration file](https://playwright.dev/docs/test-configuration) through
 * [testConfig.use](https://playwright.dev/docs/api/class-testconfig#test-config-use) and
 * [testProject.use](https://playwright.dev/docs/api/class-testproject#test-project-use).
 *
 * ```js
 * // playwright.config.ts
 * import { defineConfig } from '@playwright/test';
 * export default defineConfig({
 *   use: {
 *     headless: false,
 *     viewport: { width: 1280, height: 720 },
 *     ignoreHTTPSErrors: true,
 *     video: 'on-first-retry',
 *   },
 * });
 * ```
 *
 * Alternatively, with [test.use(options)](https://playwright.dev/docs/api/class-test#test-use) you can override some
 * options for a file.
 *
 * ```js
 * // example.spec.ts
 * import { test, expect } from '@playwright/test';
 *
 * // Run tests in this file with portrait-like viewport.
 * test.use({ viewport: { width: 600, height: 900 } });
 *
 * test('my portrait test', async ({ page }) => {
 *   // ...
 * });
 * ```
 *
 */
export interface PlaywrightWorkerOptions {
  /**
   * Name of the browser that runs tests. Defaults to `'chromium'`. Most of the time you should set `browserName` in
   * your [TestConfig](https://playwright.dev/docs/api/class-testconfig):
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig, devices } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     browserName: 'firefox',
   *   },
   * });
   * ```
   *
   */
  browserName: BrowserName;
  defaultBrowserType: BrowserName;
  /**
   * Whether to run browser in headless mode. More details for
   * [Chromium](https://developers.google.com/web/updates/2017/04/headless-chrome) and
   * [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Headless_mode). Defaults to `true` unless the
   * [`devtools`](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-option-devtools) option is
   * `true`.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     headless: false
   *   },
   * });
   * ```
   *
   */
  headless: boolean;
  /**
   * Browser distribution channel.  Supported values are "chrome", "chrome-beta", "chrome-dev", "chrome-canary",
   * "msedge", "msedge-beta", "msedge-dev", "msedge-canary". Read more about using
   * [Google Chrome and Microsoft Edge](https://playwright.dev/docs/browsers#google-chrome--microsoft-edge).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   projects: [
   *     {
   *       name: 'Microsoft Edge',
   *       use: {
   *         ...devices['Desktop Edge'],
   *         channel: 'msedge'
   *       },
   *     },
   *   ]
   * });
   * ```
   *
   */
  channel: BrowserChannel | undefined;
  /**
   * Options used to launch the browser, as passed to
   * [browserType.launch([options])](https://playwright.dev/docs/api/class-browsertype#browser-type-launch). Specific
   * options [testOptions.headless](https://playwright.dev/docs/api/class-testoptions#test-options-headless) and
   * [testOptions.channel](https://playwright.dev/docs/api/class-testoptions#test-options-channel) take priority over
   * this.
   *
   * **NOTE** Use custom browser args at your own risk, as some of them may break Playwright functionality.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   projects: [
   *     {
   *       name: 'chromium',
   *       use: {
   *         ...devices['Desktop Chrome'],
   *         launchOptions: {
   *           args: ['--start-maximized']
   *         }
   *       }
   *     }
   *   ]
   * });
   * ```
   *
   */
  launchOptions: Omit<LaunchOptions, 'tracesDir'>;
  /**
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     connectOptions: {
   *       wsEndpoint: 'ws://localhost:5678',
   *     },
   *   },
   * });
   * ```
   *
   * When connect options are specified, default
   * [fixtures.browser](https://playwright.dev/docs/api/class-fixtures#fixtures-browser),
   * [fixtures.context](https://playwright.dev/docs/api/class-fixtures#fixtures-context) and
   * [fixtures.page](https://playwright.dev/docs/api/class-fixtures#fixtures-page) use the remote browser instead of
   * launching a browser locally, and any launch options like
   * [testOptions.headless](https://playwright.dev/docs/api/class-testoptions#test-options-headless) or
   * [testOptions.channel](https://playwright.dev/docs/api/class-testoptions#test-options-channel) are ignored.
   */
  connectOptions: ConnectOptions | undefined;
  /**
   * Whether to automatically capture a screenshot after each test. Defaults to `'off'`.
   * - `'off'`: Do not capture screenshots.
   * - `'on'`: Capture screenshot after each test.
   * - `'only-on-failure'`: Capture screenshot after each test failure.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     screenshot: 'only-on-failure',
   *   },
   * });
   * ```
   *
   * Learn more about [automatic screenshots](https://playwright.dev/docs/test-use-options#recording-options).
   */
  screenshot: ScreenshotMode | { mode: ScreenshotMode } & Pick<PageScreenshotOptions, 'fullPage' | 'omitBackground'>;
  /**
   * Whether to record trace for each test. Defaults to `'off'`.
   * - `'off'`: Do not record trace.
   * - `'on'`: Record trace for each test.
   * - `'on-first-retry'`: Record trace only when retrying a test for the first time.
   * - `'on-all-retries'`: Record trace only when retrying a test.
   * - `'retain-on-failure'`: Record trace for each test. When test run passes, remove the recorded trace.
   * - `'retain-on-first-failure'`: Record trace for the first run of each test, but not for retries. When test run
   *   passes, remove the recorded trace.
   *
   * For more control, pass an object that specifies `mode` and trace features to enable.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     trace: 'on-first-retry'
   *   },
   * });
   * ```
   *
   * Learn more about [recording trace](https://playwright.dev/docs/test-use-options#recording-options).
   */
  trace: TraceMode | /** deprecated */ 'retry-with-trace' | { mode: TraceMode, snapshots?: boolean, screenshots?: boolean, sources?: boolean, attachments?: boolean };
  /**
   * Whether to record video for each test. Defaults to `'off'`.
   * - `'off'`: Do not record video.
   * - `'on'`: Record video for each test.
   * - `'retain-on-failure'`: Record video for each test, but remove all videos from successful test runs.
   * - `'on-first-retry'`: Record video only when retrying a test for the first time.
   *
   * To control video size, pass an object with `mode` and `size` properties. If video size is not specified, it will be
   * equal to [testOptions.viewport](https://playwright.dev/docs/api/class-testoptions#test-options-viewport) scaled
   * down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450. Actual
   * picture of each page will be scaled down if necessary to fit the specified size.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     video: 'on-first-retry',
   *   },
   * });
   * ```
   *
   * Learn more about [recording video](https://playwright.dev/docs/test-use-options#recording-options).
   */
  video: VideoMode | /** deprecated */ 'retry-with-video' | { mode: VideoMode, size?: ViewportSize };
}

export type ScreenshotMode = 'off' | 'on' | 'only-on-failure';
export type TraceMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry' | 'on-all-retries' | 'retain-on-first-failure';
export type VideoMode = 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';

/**
 * Playwright Test provides many options to configure test environment,
 * [Browser](https://playwright.dev/docs/api/class-browser),
 * [BrowserContext](https://playwright.dev/docs/api/class-browsercontext) and more.
 *
 * These options are usually provided in the [configuration file](https://playwright.dev/docs/test-configuration) through
 * [testConfig.use](https://playwright.dev/docs/api/class-testconfig#test-config-use) and
 * [testProject.use](https://playwright.dev/docs/api/class-testproject#test-project-use).
 *
 * ```js
 * // playwright.config.ts
 * import { defineConfig } from '@playwright/test';
 * export default defineConfig({
 *   use: {
 *     headless: false,
 *     viewport: { width: 1280, height: 720 },
 *     ignoreHTTPSErrors: true,
 *     video: 'on-first-retry',
 *   },
 * });
 * ```
 *
 * Alternatively, with [test.use(options)](https://playwright.dev/docs/api/class-test#test-use) you can override some
 * options for a file.
 *
 * ```js
 * // example.spec.ts
 * import { test, expect } from '@playwright/test';
 *
 * // Run tests in this file with portrait-like viewport.
 * test.use({ viewport: { width: 600, height: 900 } });
 *
 * test('my portrait test', async ({ page }) => {
 *   // ...
 * });
 * ```
 *
 */
export interface PlaywrightTestOptions {
  /**
   * Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     acceptDownloads: false,
   *   },
   * });
   * ```
   *
   */
  acceptDownloads: boolean;
  /**
   * Toggles bypassing page's Content-Security-Policy. Defaults to `false`.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     bypassCSP: true,
   *   }
   * });
   * ```
   *
   */
  bypassCSP: boolean;
  /**
   * Emulates `'prefers-colors-scheme'` media feature, supported values are `'light'`, `'dark'`, `'no-preference'`. See
   * [page.emulateMedia([options])](https://playwright.dev/docs/api/class-page#page-emulate-media) for more details.
   * Passing `null` resets emulation to system defaults. Defaults to `'light'`.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     colorScheme: 'dark',
   *   },
   * });
   * ```
   *
   */
  colorScheme: ColorScheme;
  /**
   * TLS Client Authentication allows the server to request a client certificate and verify it.
   *
   * **Details**
   *
   * An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`,
   * a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally,
   * `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided
   * with an exact match to the request origin that the certificate is valid for.
   *
   * **NOTE** When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it
   * work by replacing `localhost` with `local.playwright`.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     clientCertificates: [{
   *       origin: 'https://example.com',
   *       certPath: './cert.pem',
   *       keyPath: './key.pem',
   *       passphrase: 'mysecretpassword',
   *     }],
   *   },
   * });
   * ```
   *
   */
  clientCertificates: ClientCertificate[] | undefined;
  /**
   * Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about
   * [emulating devices with device scale factor](https://playwright.dev/docs/emulation#devices).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     viewport: { width: 2560, height: 1440 },
   *     deviceScaleFactor: 2,
   *   },
   * });
   * ```
   *
   */
  deviceScaleFactor: number | undefined;
  /**
   * An object containing additional HTTP headers to be sent with every request. Defaults to none.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     extraHTTPHeaders: {
   *       'X-My-Header': 'value',
   *     },
   *   },
   * });
   * ```
   *
   */
  extraHTTPHeaders: ExtraHTTPHeaders | undefined;
  /**
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     geolocation: { longitude: 12.492507, latitude: 41.889938 },
   *   },
   * });
   * ```
   *
   * Learn more about [geolocation](https://playwright.dev/docs/emulation#color-scheme-and-media).
   */
  geolocation: Geolocation | undefined;
  /**
   * Specifies if viewport supports touch events. Defaults to false. Learn more about
   * [mobile emulation](https://playwright.dev/docs/emulation#devices).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     hasTouch: true
   *   },
   * });
   * ```
   *
   */
  hasTouch: boolean;
  /**
   * Credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication). If no
   * origin is specified, the username and password are sent to any servers upon unauthorized responses.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     httpCredentials: {
   *       username: 'user',
   *       password: 'pass',
   *     },
   *   },
   * });
   * ```
   *
   */
  httpCredentials: HTTPCredentials | undefined;
  /**
   * Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     ignoreHTTPSErrors: true,
   *   },
   * });
   * ```
   *
   */
  ignoreHTTPSErrors: boolean;
  /**
   * Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device,
   * so you don't actually need to set it manually. Defaults to `false` and is not supported in Firefox. Learn more
   * about [mobile emulation](https://playwright.dev/docs/emulation#ismobile).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     isMobile: false,
   *   },
   * });
   * ```
   *
   */
  isMobile: boolean;
  /**
   * Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about
   * [disabling JavaScript](https://playwright.dev/docs/emulation#javascript-enabled).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     javaScriptEnabled: false,
   *   },
   * });
   * ```
   *
   */
  javaScriptEnabled: boolean;
  /**
   * Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value,
   * `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default
   * locale. Learn more about emulation in our [emulation guide](https://playwright.dev/docs/emulation#locale--timezone).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     locale: 'it-IT',
   *   },
   * });
   * ```
   *
   */
  locale: string | undefined;
  /**
   * Whether to emulate network being offline. Defaults to `false`. Learn more about
   * [network emulation](https://playwright.dev/docs/emulation#offline).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     offline: true
   *   },
   * });
   * ```
   *
   */
  offline: boolean;
  /**
   * A list of permissions to grant to all pages in this context. See
   * [browserContext.grantPermissions(permissions[, options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions)
   * for more details. Defaults to none.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     permissions: ['notifications'],
   *   },
   * });
   * ```
   *
   */
  permissions: string[] | undefined;
  /**
   * Network proxy settings.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     proxy: {
   *       server: 'http://myproxy.com:3128',
   *       bypass: 'localhost',
   *     },
   *   },
   * });
   * ```
   *
   */
  proxy: Proxy | undefined;
  /**
   * Learn more about [storage state and auth](https://playwright.dev/docs/auth).
   *
   * Populates context with given storage state. This option can be used to initialize context with logged-in
   * information obtained via
   * [browserContext.storageState([options])](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     storageState: 'storage-state.json',
   *   },
   * });
   * ```
   *
   * **Details**
   *
   * When storage state is set up in the config, it is possible to reset storage state for a file:
   *
   * ```js
   * // not-signed-in.spec.ts
   * import { test } from '@playwright/test';
   *
   * // Reset storage state for this file to avoid being authenticated
   * test.use({ storageState: { cookies: [], origins: [] } });
   *
   * test('not signed in test', async ({ page }) => {
   *   // ...
   * });
   * ```
   *
   */
  storageState: StorageState | undefined;
  /**
   * Changes the timezone of the context. See
   * [ICU's metaZones.txt](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1)
   * for a list of supported timezone IDs. Defaults to the system timezone.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     timezoneId: 'Europe/Rome',
   *   },
   * });
   * ```
   *
   */
  timezoneId: string | undefined;
  /**
   * Specific user agent to use in this context.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     userAgent: 'some custom ua',
   *   },
   * });
   * ```
   *
   */
  userAgent: string | undefined;
  /**
   * Emulates consistent viewport for each page. Defaults to an 1280x720 viewport. Use `null` to disable the consistent
   * viewport emulation. Learn more about [viewport emulation](https://playwright.dev/docs/emulation#viewport).
   *
   * **NOTE** The `null` value opts out from the default presets, makes viewport depend on the host window size defined
   * by the operating system. It makes the execution of the tests non-deterministic.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     viewport: { width: 100, height: 100 },
   *   },
   * });
   * ```
   *
   */
  viewport: ViewportSize | null;
  /**
   * When using [page.goto(url[, options])](https://playwright.dev/docs/api/class-page#page-goto),
   * [page.route(url, handler[, options])](https://playwright.dev/docs/api/class-page#page-route),
   * [page.waitForURL(url[, options])](https://playwright.dev/docs/api/class-page#page-wait-for-url),
   * [page.waitForRequest(urlOrPredicate[, options])](https://playwright.dev/docs/api/class-page#page-wait-for-request),
   * or
   * [page.waitForResponse(urlOrPredicate[, options])](https://playwright.dev/docs/api/class-page#page-wait-for-response)
   * it takes the base URL in consideration by using the
   * [`URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor for building the corresponding URL.
   * Unset by default. Examples:
   * - baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
   * - baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in
   *   `http://localhost:3000/foo/bar.html`
   * - baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in
   *   `http://localhost:3000/bar.html`
   *
   * **Usage**
   *
   * ```js
   * import { defineConfig, devices } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     /* Base URL to use in actions like `await page.goto('/')`. *\/
   *     baseURL: 'http://localhost:3000',
   *   },
   * });
   * ```
   *
   */
  baseURL: string | undefined;
  /**
   * Options used to create the context, as passed to
   * [browser.newContext([options])](https://playwright.dev/docs/api/class-browser#browser-new-context). Specific
   * options like [testOptions.viewport](https://playwright.dev/docs/api/class-testoptions#test-options-viewport) take
   * priority over this.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     contextOptions: {
   *       reducedMotion: 'reduce',
   *     },
   *   },
   * });
   * ```
   *
   */
  contextOptions: BrowserContextOptions;
  /**
   * Default timeout for each Playwright action in milliseconds, defaults to 0 (no timeout).
   *
   * This is a default timeout for all Playwright actions, same as configured via
   * [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout).
   *
   * **Usage**
   *
   * ```js
   * import { defineConfig, devices } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). *\/
   *     actionTimeout: 0,
   *   },
   * });
   * ```
   *
   * Learn more about [various timeouts](https://playwright.dev/docs/test-timeouts).
   */
  actionTimeout: number;
  /**
   * Timeout for each navigation action in milliseconds. Defaults to 0 (no timeout).
   *
   * This is a default navigation timeout, same as configured via
   * [page.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout).
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     navigationTimeout: 3000,
   *   },
   * });
   * ```
   *
   * Learn more about [various timeouts](https://playwright.dev/docs/test-timeouts).
   */
  navigationTimeout: number;
  /**
   * Whether to allow sites to register Service workers. Defaults to `'allow'`.
   * - `'allow'`: [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) can be
   *   registered.
   * - `'block'`: Playwright will block all registration of Service Workers.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     serviceWorkers: 'allow'
   *   },
   * });
   * ```
   *
   */
  serviceWorkers: ServiceWorkerPolicy;
  /**
   * Custom attribute to be used in
   * [page.getByTestId(testId)](https://playwright.dev/docs/api/class-page#page-get-by-test-id). `data-testid` is used
   * by default.
   *
   * **Usage**
   *
   * ```js
   * // playwright.config.ts
   * import { defineConfig } from '@playwright/test';
   *
   * export default defineConfig({
   *   use: {
   *     testIdAttribute: 'pw-test-id',
   *   },
   * });
   * ```
   *
   */
  testIdAttribute: string;
}


/**
 * Playwright Test is based on the concept of the [test fixtures](https://playwright.dev/docs/test-fixtures). Test fixtures are used to
 * establish environment for each test, giving the test everything it needs and nothing else.
 *
 * Playwright Test looks at each test declaration, analyses the set of fixtures the test needs and prepares those
 * fixtures specifically for the test. Values prepared by the fixtures are merged into a single object that is
 * available to the `test`, hooks, annotations and other fixtures as a first parameter.
 *
 * ```js
 * import { test, expect } from '@playwright/test';
 *
 * test('basic test', async ({ page }) => {
 *   // ...
 * });
 * ```
 *
 * Given the test above, Playwright Test will set up the `page` fixture before running the test, and tear it down
 * after the test has finished. `page` fixture provides a [Page](https://playwright.dev/docs/api/class-page) object
 * that is available to the test.
 *
 * Playwright Test comes with builtin fixtures listed below, and you can add your own fixtures as well. Playwright
 * Test also [provides options][TestOptions](https://playwright.dev/docs/api/class-testoptions) to  configure
 * [fixtures.browser](https://playwright.dev/docs/api/class-fixtures#fixtures-browser),
 * [fixtures.context](https://playwright.dev/docs/api/class-fixtures#fixtures-context) and
 * [fixtures.page](https://playwright.dev/docs/api/class-fixtures#fixtures-page).
 */
export interface PlaywrightWorkerArgs {
  playwright: typeof import('./types');
  /**
   * [Browser](https://playwright.dev/docs/api/class-browser) instance is shared between all tests in the
   * [same worker](https://playwright.dev/docs/test-parallel) - this makes testing efficient. However, each test runs in an isolated
   * [BrowserContext](https://playwright.dev/docs/api/class-browsercontext)  and gets a fresh environment.
   *
   * Learn how to [configure browser](https://playwright.dev/docs/test-configuration) and see
   * [available options][TestOptions](https://playwright.dev/docs/api/class-testoptions).
   *
   * **Usage**
   *
   * ```js
   * test.beforeAll(async ({ browser }) => {
   *   const page = await browser.newPage();
   *   // ...
   * });
   * ```
   *
   */
  browser: Browser;
}

/**
 * Playwright Test is based on the concept of the [test fixtures](https://playwright.dev/docs/test-fixtures). Test fixtures are used to
 * establish environment for each test, giving the test everything it needs and nothing else.
 *
 * Playwright Test looks at each test declaration, analyses the set of fixtures the test needs and prepares those
 * fixtures specifically for the test. Values prepared by the fixtures are merged into a single object that is
 * available to the `test`, hooks, annotations and other fixtures as a first parameter.
 *
 * ```js
 * import { test, expect } from '@playwright/test';
 *
 * test('basic test', async ({ page }) => {
 *   // ...
 * });
 * ```
 *
 * Given the test above, Playwright Test will set up the `page` fixture before running the test, and tear it down
 * after the test has finished. `page` fixture provides a [Page](https://playwright.dev/docs/api/class-page) object
 * that is available to the test.
 *
 * Playwright Test comes with builtin fixtures listed below, and you can add your own fixtures as well. Playwright
 * Test also [provides options][TestOptions](https://playwright.dev/docs/api/class-testoptions) to  configure
 * [fixtures.browser](https://playwright.dev/docs/api/class-fixtures#fixtures-browser),
 * [fixtures.context](https://playwright.dev/docs/api/class-fixtures#fixtures-context) and
 * [fixtures.page](https://playwright.dev/docs/api/class-fixtures#fixtures-page).
 */
export interface PlaywrightTestArgs {
  /**
   * Isolated [BrowserContext](https://playwright.dev/docs/api/class-browsercontext) instance, created for each test.
   * Since contexts are isolated between each other, every test gets a fresh environment, even when multiple tests run
   * in a single [Browser](https://playwright.dev/docs/api/class-browser) for maximum efficiency.
   *
   * Learn how to [configure context](https://playwright.dev/docs/test-configuration) and see
   * [available options][TestOptions](https://playwright.dev/docs/api/class-testoptions).
   *
   * Default [fixtures.page](https://playwright.dev/docs/api/class-fixtures#fixtures-page) belongs to this context.
   *
   * **Usage**
   *
   * ```js
   * test('example test', async ({ page, context }) => {
   *   await context.route('*external.com/*', route => route.abort());
   *   // ...
   * });
   * ```
   *
   */
  context: BrowserContext;
  /**
   * Isolated [Page](https://playwright.dev/docs/api/class-page) instance, created for each test. Pages are isolated
   * between tests due to [fixtures.context](https://playwright.dev/docs/api/class-fixtures#fixtures-context) isolation.
   *
   * This is the most common fixture used in a test.
   *
   * **Usage**
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('basic test', async ({ page }) => {
   *   await page.goto('/signin');
   *   await page.getByLabel('User Name').fill('user');
   *   await page.getByLabel('Password').fill('password');
   *   await page.getByText('Sign in').click();
   *   // ...
   * });
   * ```
   *
   */
  page: Page;
  /**
   * Isolated [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext) instance for each test.
   *
   * **Usage**
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('basic test', async ({ request }) => {
   *   await request.post('/signin', {
   *     data: {
   *       username: 'user',
   *       password: 'password'
   *     }
   *   });
   *   // ...
   * });
   * ```
   *
   */
  request: APIRequestContext;
}

type ExcludeProps<A, B> = {
  [K in Exclude<keyof A, keyof B>]: A[K];
};
type CustomProperties<T> = ExcludeProps<T, PlaywrightTestOptions & PlaywrightWorkerOptions & PlaywrightTestArgs & PlaywrightWorkerArgs>;

export type PlaywrightTestProject<TestArgs = {}, WorkerArgs = {}> = Project<PlaywrightTestOptions & CustomProperties<TestArgs>, PlaywrightWorkerOptions & CustomProperties<WorkerArgs>>;
export type PlaywrightTestConfig<TestArgs = {}, WorkerArgs = {}> = Config<PlaywrightTestOptions & CustomProperties<TestArgs>, PlaywrightWorkerOptions & CustomProperties<WorkerArgs>>;

type AsymmetricMatcher = Record<string, any>;

interface AsymmetricMatchers {
  /**
   * `expect.any()` matches any object instance created from the
   * [`constructor`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-any-option-constructor)
   * or a corresponding primitive type. Use it inside
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * to perform pattern matching.
   *
   * **Usage**
   *
   * ```js
   * // Match instance of a class.
   * class Example {}
   * expect(new Example()).toEqual(expect.any(Example));
   *
   * // Match any number.
   * expect({ prop: 1 }).toEqual({ prop: expect.any(Number) });
   *
   * // Match any string.
   * expect('abc').toEqual(expect.any(String));
   * ```
   *
   * @param constructor Constructor of the expected object like `ExampleClass`, or a primitive boxed type like `Number`.
   */
  any(sample: unknown): AsymmetricMatcher;
  /**
   * `expect.anything()` matches everything except `null` and `undefined`. Use it inside
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * to perform pattern matching.
   *
   * **Usage**
   *
   * ```js
   * const value = { prop: 1 };
   * expect(value).toEqual({ prop: expect.anything() });
   * expect(value).not.toEqual({ otherProp: expect.anything() });
   * ```
   *
   */
  anything(): AsymmetricMatcher;
  /**
   * `expect.arrayContaining()` matches an array that contains all of the elements in the expected array, in any order.
   * Note that received array may be a superset of the expected array and contain some extra elements.
   *
   * Use this method inside
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * to perform pattern matching.
   *
   * **Usage**
   *
   * ```js
   * expect([1, 2, 3]).toEqual(expect.arrayContaining([3, 1]));
   * expect([1, 2, 3]).not.toEqual(expect.arrayContaining([1, 4]));
   * ```
   *
   * @param expected Expected array that is a subset of the received value.
   */
  arrayContaining(sample: Array<unknown>): AsymmetricMatcher;
  /**
   * Compares floating point numbers for approximate equality. Use this method inside
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * to perform pattern matching. When just comparing two numbers, prefer
   * [expect(value).toBeCloseTo(expected[, numDigits])](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-be-close-to).
   *
   * **Usage**
   *
   * ```js
   * expect({ prop: 0.1 + 0.2 }).not.toEqual({ prop: 0.3 });
   * expect({ prop: 0.1 + 0.2 }).toEqual({ prop: expect.closeTo(0.3, 5) });
   * ```
   *
   * @param expected Expected value.
   * @param numDigits The number of decimal digits after the decimal point that must be equal.
   */
  closeTo(sample: number, precision?: number): AsymmetricMatcher;
  /**
   * `expect.objectContaining()` matches an object that contains and matches all of the properties in the expected
   * object. Note that received object may be a superset of the expected object and contain some extra properties.
   *
   * Use this method inside
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * to perform pattern matching. Object properties can be matchers to further relax the expectation. See examples.
   *
   * **Usage**
   *
   * ```js
   * // Assert some of the properties.
   * expect({ foo: 1, bar: 2 }).toEqual(expect.objectContaining({ foo: 1 }));
   *
   * // Matchers can be used on the properties as well.
   * expect({ foo: 1, bar: 2 }).toEqual(expect.objectContaining({ bar: expect.any(Number) }));
   *
   * // Complex matching of sub-properties.
   * expect({
   *   list: [1, 2, 3],
   *   obj: { prop: 'Hello world!', another: 'some other value' },
   *   extra: 'extra',
   * }).toEqual(expect.objectContaining({
   *   list: expect.arrayContaining([2, 3]),
   *   obj: expect.objectContaining({ prop: expect.stringContaining('Hello') }),
   * }));
   * ```
   *
   * @param expected Expected object pattern that contains a subset of the properties.
   */
  objectContaining(sample: Record<string, unknown>): AsymmetricMatcher;
  /**
   * `expect.stringContaining()` matches a string that contains the expected substring. Use this method inside
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * to perform pattern matching.
   *
   * **Usage**
   *
   * ```js
   * expect('Hello world!').toEqual(expect.stringContaining('Hello'));
   * ```
   *
   * @param expected Expected substring.
   */
  stringContaining(sample: string): AsymmetricMatcher;
  /**
   * `expect.stringMatching()` matches a received string that in turn matches the expected pattern. Use this method
   * inside
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * to perform pattern matching.
   *
   * **Usage**
   *
   * ```js
   * expect('123ms').toEqual(expect.stringMatching(/\d+m?s/));
   *
   * // Inside another matcher.
   * expect({
   *   status: 'passed',
   *   time: '123ms',
   * }).toEqual({
   *   status: expect.stringMatching(/passed|failed/),
   *   time: expect.stringMatching(/\d+m?s/),
   * });
   * ```
   *
   * @param expected Pattern that expected string should match.
   */
  stringMatching(sample: string | RegExp): AsymmetricMatcher;
}

/**
 * The [GenericAssertions](https://playwright.dev/docs/api/class-genericassertions) class provides assertion methods
 * that can be used to make assertions about any values in the tests. A new instance of
 * [GenericAssertions](https://playwright.dev/docs/api/class-genericassertions) is created by calling
 * [expect(value)](https://playwright.dev/docs/api/class-playwrightassertions#playwright-assertions-expect-generic):
 *
 * ```js
 * import { test, expect } from '@playwright/test';
 *
 * test('assert a value', async ({ page }) => {
 *   const value = 1;
 *   expect(value).toBe(2);
 * });
 * ```
 *
 */
interface GenericAssertions<R> {
  /**
   * Makes the assertion check for the opposite condition. For example, the following code passes:
   *
   * ```js
   * const value = 1;
   * expect(value).not.toBe(2);
   * ```
   *
   */
  not: GenericAssertions<R>;
  /**
   * Compares value with
   * [`expected`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-be-option-expected) by
   * calling `Object.is`. This method compares objects by reference instead of their contents, similarly to the strict
   * equality operator `===`.
   *
   * **Usage**
   *
   * ```js
   * const value = { prop: 1 };
   * expect(value).toBe(value);
   * expect(value).not.toBe({});
   * expect(value.prop).toBe(1);
   * ```
   *
   * @param expected Expected value.
   */
  toBe(expected: unknown): R;
  /**
   * Compares floating point numbers for approximate equality. Use this method instead of
   * [expect(value).toBe(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-be)
   * when comparing floating point numbers.
   *
   * **Usage**
   *
   * ```js
   * expect(0.1 + 0.2).not.toBe(0.3);
   * expect(0.1 + 0.2).toBeCloseTo(0.3, 5);
   * ```
   *
   * @param expected Expected value.
   * @param numDigits The number of decimal digits after the decimal point that must be equal.
   */
  toBeCloseTo(expected: number, numDigits?: number): R;
  /**
   * Ensures that value is not `undefined`.
   *
   * **Usage**
   *
   * ```js
   * const value = null;
   * expect(value).toBeDefined();
   * ```
   *
   */
  toBeDefined(): R;
  /**
   * Ensures that value is false in a boolean context, one of `false`, `0`, `''`, `null`, `undefined` or `NaN`. Use this
   * method when you don't care about the specific value.
   *
   * **Usage**
   *
   * ```js
   * const value = null;
   * expect(value).toBeFalsy();
   * ```
   *
   */
  toBeFalsy(): R;
  /**
   * Ensures that `value > expected` for number or big integer values.
   *
   * **Usage**
   *
   * ```js
   * const value = 42;
   * expect(value).toBeGreaterThan(1);
   * ```
   *
   * @param expected The value to compare to.
   */
  toBeGreaterThan(expected: number | bigint): R;
  /**
   * Ensures that `value >= expected` for number or big integer values.
   *
   * **Usage**
   *
   * ```js
   * const value = 42;
   * expect(value).toBeGreaterThanOrEqual(42);
   * ```
   *
   * @param expected The value to compare to.
   */
  toBeGreaterThanOrEqual(expected: number | bigint): R;
  /**
   * Ensures that value is an instance of a class. Uses `instanceof` operator.
   *
   * **Usage**
   *
   * ```js
   * expect(page).toBeInstanceOf(Page);
   *
   * class Example {}
   * expect(new Example()).toBeInstanceOf(Example);
   * ```
   *
   * @param expected The class or constructor function.
   */
  toBeInstanceOf(expected: Function): R;
  /**
   * Ensures that `value < expected` for number or big integer values.
   *
   * **Usage**
   *
   * ```js
   * const value = 42;
   * expect(value).toBeLessThan(100);
   * ```
   *
   * @param expected The value to compare to.
   */
  toBeLessThan(expected: number | bigint): R;
  /**
   * Ensures that `value <= expected` for number or big integer values.
   *
   * **Usage**
   *
   * ```js
   * const value = 42;
   * expect(value).toBeLessThanOrEqual(42);
   * ```
   *
   * @param expected The value to compare to.
   */
  toBeLessThanOrEqual(expected: number | bigint): R;
  /**
   * Ensures that value is `NaN`.
   *
   * **Usage**
   *
   * ```js
   * const value = NaN;
   * expect(value).toBeNaN();
   * ```
   *
   */
  toBeNaN(): R;
  /**
   * Ensures that value is `null`.
   *
   * **Usage**
   *
   * ```js
   * const value = null;
   * expect(value).toBeNull();
   * ```
   *
   */
  toBeNull(): R;
  /**
   * Ensures that value is true in a boolean context, **anything but** `false`, `0`, `''`, `null`, `undefined` or `NaN`.
   * Use this method when you don't care about the specific value.
   *
   * **Usage**
   *
   * ```js
   * const value = { example: 'value' };
   * expect(value).toBeTruthy();
   * ```
   *
   */
  toBeTruthy(): R;
  /**
   * Ensures that value is `undefined`.
   *
   * **Usage**
   *
   * ```js
   * const value = undefined;
   * expect(value).toBeUndefined();
   * ```
   *
   */
  toBeUndefined(): R;
  /**
   * Ensures that string value contains an expected substring. Comparison is case-sensitive.
   *
   * **Usage**
   *
   * ```js
   * const value = 'Hello, World';
   * expect(value).toContain('World');
   * expect(value).toContain(',');
   * ```
   *
   * @param expected Expected substring.
   */
  toContain(expected: string): R;
  /**
   * Ensures that value is an `Array` or `Set` and contains an expected item.
   *
   * **Usage**
   *
   * ```js
   * const value = [1, 2, 3];
   * expect(value).toContain(2);
   * expect(new Set(value)).toContain(2);
   * ```
   *
   * @param expected Expected value in the collection.
   */
  toContain(expected: unknown): R;
  /**
   * Ensures that value is an `Array` or `Set` and contains an item equal to the expected.
   *
   * For objects, this method recursively checks equality of all fields, rather than comparing objects by reference as
   * performed by
   * [expect(value).toContain(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-contain-2).
   *
   * For primitive values, this method is equivalent to
   * [expect(value).toContain(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-contain-2).
   *
   * **Usage**
   *
   * ```js
   * const value = [
   *   { example: 1 },
   *   { another: 2 },
   *   { more: 3 },
   * ];
   * expect(value).toContainEqual({ another: 2 });
   * expect(new Set(value)).toContainEqual({ another: 2 });
   * ```
   *
   * @param expected Expected value in the collection.
   */
  toContainEqual(expected: unknown): R;
  /**
   * Compares contents of the value with contents of
   * [`expected`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal-option-expected),
   * performing "deep equality" check.
   *
   * For objects, this method recursively checks equality of all fields, rather than comparing objects by reference as
   * performed by
   * [expect(value).toBe(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-be).
   *
   * For primitive values, this method is equivalent to
   * [expect(value).toBe(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-be).
   *
   * **Usage**
   *
   * ```js
   * const value = { prop: 1 };
   * expect(value).toEqual({ prop: 1 });
   * ```
   *
   * **Non-strict equality**
   *
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * performs deep equality check that compares contents of the received and expected values. To ensure two objects
   * reference the same instance, use
   * [expect(value).toBe(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-be)
   * instead.
   *
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * ignores `undefined` properties and array items, and does not insist on object types being equal. For stricter
   * matching, use
   * [expect(value).toStrictEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-strict-equal).
   *
   * **Pattern matching**
   *
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal)
   * can be also used to perform pattern matching on objects, arrays and primitive types, with the help of the following
   * matchers:
   * - [expect(value).any(constructor)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-any)
   * - [expect(value).anything()](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-anything)
   * - [expect(value).arrayContaining(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-array-containing)
   * - [expect(value).closeTo(expected[, numDigits])](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-close-to)
   * - [expect(value).objectContaining(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-object-containing)
   * - [expect(value).stringContaining(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-string-containing)
   * - [expect(value).stringMatching(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-string-matching)
   *
   * Here is an example that asserts some of the values inside a complex object:
   *
   * ```js
   * expect({
   *   list: [1, 2, 3],
   *   obj: { prop: 'Hello world!', another: 'some other value' },
   *   extra: 'extra',
   * }).toEqual(expect.objectContaining({
   *   list: expect.arrayContaining([2, 3]),
   *   obj: expect.objectContaining({ prop: expect.stringContaining('Hello') }),
   * }));
   * ```
   *
   * @param expected Expected value.
   */
  toEqual(expected: unknown): R;
  /**
   * Ensures that value has a `.length` property equal to
   * [`expected`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-have-length-option-expected).
   * Useful for arrays and strings.
   *
   * **Usage**
   *
   * ```js
   * expect('Hello, World').toHaveLength(12);
   * expect([1, 2, 3]).toHaveLength(3);
   * ```
   *
   * @param expected Expected length.
   */
  toHaveLength(expected: number): R;
  /**
   * Ensures that property at provided `keyPath` exists on the object and optionally checks that property is equal to
   * the
   * [`expected`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-have-property-option-expected).
   * Equality is checked recursively, similarly to
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal).
   *
   * **Usage**
   *
   * ```js
   * const value = {
   *   a: {
   *     b: [42],
   *   },
   *   c: true,
   * };
   * expect(value).toHaveProperty('a.b');
   * expect(value).toHaveProperty('a.b', [42]);
   * expect(value).toHaveProperty('a.b[0]', 42);
   * expect(value).toHaveProperty('c');
   * expect(value).toHaveProperty('c', true);
   * ```
   *
   * @param keyPath Path to the property. Use dot notation `a.b` to check nested properties and indexed `a[2]` notation to check nested
   * array items.
   * @param expected Optional expected value to compare the property to.
   */
  toHaveProperty(keyPath: string | Array<string>, value?: unknown): R;
  /**
   * Ensures that string value matches a regular expression.
   *
   * **Usage**
   *
   * ```js
   * const value = 'Is 42 enough?';
   * expect(value).toMatch(/Is \d+ enough/);
   * ```
   *
   * @param expected Regular expression to match against.
   */
  toMatch(expected: RegExp | string): R;
  /**
   * Compares contents of the value with contents of
   * [`expected`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-match-object-option-expected),
   * performing "deep equality" check. Allows extra properties to be present in the value, unlike
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal),
   * so you can check just a subset of object properties.
   *
   * When comparing arrays, the number of items must match, and each item is checked recursively.
   *
   * **Usage**
   *
   * ```js
   * const value = {
   *   a: 1,
   *   b: 2,
   *   c: true,
   * };
   * expect(value).toMatchObject({ a: 1, c: true });
   * expect(value).toMatchObject({ b: 2, c: true });
   *
   * expect([{ a: 1, b: 2 }]).toMatchObject([{ a: 1 }]);
   * ```
   *
   * @param expected The expected object value to match against.
   */
  toMatchObject(expected: Record<string, unknown> | Array<unknown>): R;
  /**
   * Compares contents of the value with contents of
   * [`expected`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-strict-equal-option-expected)
   * **and** their types.
   *
   * Differences from
   * [expect(value).toEqual(expected)](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-equal):
   * - Keys with undefined properties are checked. For example, `{ a: undefined, b: 2 }` does not match `{ b: 2 }`.
   * - Array sparseness is checked. For example, `[, 1]` does not match `[undefined, 1]`.
   * - Object types are checked to be equal. For example, a class instance with fields `a` and `b` will not equal a
   *   literal object with fields `a` and `b`.
   *
   * **Usage**
   *
   * ```js
   * const value = { prop: 1 };
   * expect(value).toStrictEqual({ prop: 1 });
   * ```
   *
   * @param expected Expected value.
   */
  toStrictEqual(expected: unknown): R;
  /**
   * Calls the function and ensures it throws an error.
   *
   * Optionally compares the error with
   * [`expected`](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-throw-option-expected).
   * Allowed expected values:
   * - Regular expression - error message should **match** the pattern.
   * - String - error message should **include** the substring.
   * - Error object - error message should be **equal to** the message property of the object.
   * - Error class - error object should be an **instance of** the class.
   *
   * **Usage**
   *
   * ```js
   * expect(() => {
   *   throw new Error('Something bad');
   * }).toThrow();
   *
   * expect(() => {
   *   throw new Error('Something bad');
   * }).toThrow(/something/);
   *
   * expect(() => {
   *   throw new Error('Something bad');
   * }).toThrow(Error);
   * ```
   *
   * @param expected Expected error message or error object.
   */
  toThrow(error?: unknown): R;
  /**
   * An alias for
   * [expect(value).toThrow([expected])](https://playwright.dev/docs/api/class-genericassertions#generic-assertions-to-throw).
   *
   * **Usage**
   *
   * ```js
   * expect(() => {
   *   throw new Error('Something bad');
   * }).toThrowError();
   * ```
   *
   * @param expected Expected error message or error object.
   */
  toThrowError(error?: unknown): R;

}

type FunctionAssertions = {
  /**
   * Retries the callback until all assertions within it pass or the `timeout` value is reached.
   * The `intervals` parameter can be used to establish the probing frequency or pattern.
   *
   * **Usage**
   * ```js
   * await expect(async () => {
   *   const response = await page.request.get('https://api.example.com');
   *   expect(response.status()).toBe(200);
   * }).toPass({
   *   // Probe, wait 1s, probe, wait 2s, probe, wait 10s, probe, wait 10s, probe
   *   intervals: [1_000, 2_000, 10_000], // Defaults to [100, 250, 500, 1000].
   *   timeout: 60_000 // Defaults to 0
   * });
   * ```
   *
   * Note that by default `toPass` does not respect custom expect timeout.
   *
   * @param options
   */
  toPass(options?: { timeout?: number, intervals?: number[] }): Promise<void>;
};

type BaseMatchers<R, T> = GenericAssertions<R> & PlaywrightTest.Matchers<R, T> & SnapshotAssertions;
type AllowedGenericMatchers<R, T> = PlaywrightTest.Matchers<R, T> & Pick<GenericAssertions<R>, 'toBe' | 'toBeDefined' | 'toBeFalsy' | 'toBeNull' | 'toBeTruthy' | 'toBeUndefined'>;

type SpecificMatchers<R, T> =
  T extends Page ? PageAssertions & AllowedGenericMatchers<R, T> :
  T extends Locator ? LocatorAssertions & AllowedGenericMatchers<R, T> :
  T extends APIResponse ? APIResponseAssertions & AllowedGenericMatchers<R, T> :
  BaseMatchers<R, T> & (T extends Function ? FunctionAssertions : {});
type AllMatchers<R, T> = PageAssertions & LocatorAssertions & APIResponseAssertions & FunctionAssertions & BaseMatchers<R, T>;

type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type ToUserMatcher<F> = F extends (first: any, ...args: infer Rest) => infer R ? (...args: Rest) => (R extends PromiseLike<infer U> ? Promise<void> : void) : never;
type ToUserMatcherObject<T, ArgType> = {
  [K in keyof T as T[K] extends (arg: ArgType, ...rest: any[]) => any ? K : never]: ToUserMatcher<T[K]>;
};

type MatcherHintColor = (arg: string) => string;

export type MatcherHintOptions = {
  comment?: string;
  expectedColor?: MatcherHintColor;
  isDirectExpectCall?: boolean;
  isNot?: boolean;
  promise?: string;
  receivedColor?: MatcherHintColor;
  secondArgument?: string;
  secondArgumentColor?: MatcherHintColor;
};

export interface ExpectMatcherUtils {
  matcherHint(matcherName: string, received: unknown, expected: unknown, options?: MatcherHintOptions): string;
  printDiffOrStringify(expected: unknown, received: unknown, expectedLabel: string, receivedLabel: string, expand: boolean): string;
  printExpected(value: unknown): string;
  printReceived(object: unknown): string;
  printWithType<T>(name: string, value: T, print: (value: T) => string): string;
  diff(a: unknown, b: unknown): string | null;
  stringify(object: unknown, maxDepth?: number, maxWidth?: number): string;
}

export type ExpectMatcherState = {
  /**
   * Whether this matcher was called with the negated .not modifier.
   */
  isNot: boolean;
  /**
   * - 'rejects' if matcher was called with the promise .rejects modifier
   * - 'resolves' if matcher was called with the promise .resolves modifier
   * - '' if matcher was not called with a promise modifier
   */
  promise: 'rejects' | 'resolves' | '';
  utils: ExpectMatcherUtils;
  /**
   * Timeout in milliseconds for the assertion to be fulfilled.
   */
  timeout: number;
};

export type MatcherReturnType = {
  message: () => string;
  pass: boolean;
  name?: string;
  expected?: unknown;
  actual?: any;
  log?: string[];
  timeout?: number;
};

type MakeMatchers<R, T, ExtendedMatchers> = {
  /**
   * If you know how to test something, `.not` lets you test its opposite.
   */
  not: MakeMatchers<R, T, ExtendedMatchers>;
  /**
   * Use resolves to unwrap the value of a fulfilled promise so any other
   * matcher can be chained. If the promise is rejected the assertion fails.
   */
  resolves: MakeMatchers<Promise<R>, Awaited<T>, ExtendedMatchers>;
  /**
   * Unwraps the reason of a rejected promise so any other matcher can be chained.
   * If the promise is fulfilled the assertion fails.
   */
  rejects: MakeMatchers<Promise<R>, any, ExtendedMatchers>;
} & IfAny<T, AllMatchers<R, T>, SpecificMatchers<R, T> & ToUserMatcherObject<ExtendedMatchers, T>>;

type PollMatchers<R, T, ExtendedMatchers> = {
  /**
   * If you know how to test something, `.not` lets you test its opposite.
   */
  not: PollMatchers<R, T, ExtendedMatchers>;
} & BaseMatchers<R, T> & ToUserMatcherObject<ExtendedMatchers, T>;

export type Expect<ExtendedMatchers = {}> = {
  <T = unknown>(actual: T, messageOrOptions?: string | { message?: string }): MakeMatchers<void, T, ExtendedMatchers>;
  soft: <T = unknown>(actual: T, messageOrOptions?: string | { message?: string }) => MakeMatchers<void, T, ExtendedMatchers>;
  poll: <T = unknown>(actual: () => T | Promise<T>, messageOrOptions?: string | { message?: string, timeout?: number, intervals?: number[] }) => PollMatchers<Promise<void>, T, ExtendedMatchers>;
  extend<MoreMatchers extends Record<string, (this: ExpectMatcherState, receiver: any, ...args: any[]) => MatcherReturnType | Promise<MatcherReturnType>>>(matchers: MoreMatchers): Expect<ExtendedMatchers & MoreMatchers>;
  configure: (configuration: {
    message?: string,
    timeout?: number,
    soft?: boolean,
  }) => Expect<ExtendedMatchers>;
  getState(): unknown;
  not: Omit<AsymmetricMatchers, 'any' | 'anything'>;
} & AsymmetricMatchers;

// --- BEGINGLOBAL ---
declare global {
  export namespace PlaywrightTest {
    export interface Matchers<R, T = unknown> {
    }
  }
}
// --- ENDGLOBAL ---

/**
 * These tests are executed in Playwright environment that launches the browser
 * and provides a fresh page to each test.
 */
export const test: TestType<PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>;
export default test;

export const _baseTest: TestType<{}, {}>;
export const expect: Expect<{}>;

/**
 * Defines Playwright config
 */
export function defineConfig(config: PlaywrightTestConfig): PlaywrightTestConfig;
export function defineConfig<T>(config: PlaywrightTestConfig<T>): PlaywrightTestConfig<T>;
export function defineConfig<T, W>(config: PlaywrightTestConfig<T, W>): PlaywrightTestConfig<T, W>;
export function defineConfig(config: PlaywrightTestConfig, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig;
export function defineConfig<T>(config: PlaywrightTestConfig<T>, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig<T>;
export function defineConfig<T, W>(config: PlaywrightTestConfig<T, W>, ...configs: PlaywrightTestConfig[]): PlaywrightTestConfig<T, W>;

type MergedT<List> = List extends [TestType<infer T, any>, ...(infer Rest)] ? T & MergedT<Rest> : {};
type MergedW<List> = List extends [TestType<any, infer W>, ...(infer Rest)] ? W & MergedW<Rest> : {};
type MergedTestType<List> = TestType<MergedT<List>, MergedW<List>>;

/**
 * Merges fixtures
 */
export function mergeTests<List extends any[]>(...tests: List): MergedTestType<List>;

type MergedExpectMatchers<List> = List extends [Expect<infer M>, ...(infer Rest)] ? M & MergedExpectMatchers<Rest> : {};
type MergedExpect<List> = Expect<MergedExpectMatchers<List>>;

/**
 * Merges expects
 */
export function mergeExpects<List extends any[]>(...expects: List): MergedExpect<List>;

// This is required to not export everything by default. See https://github.com/Microsoft/TypeScript/issues/19545#issuecomment-340490459
export { };



/**
 * The [APIResponseAssertions](https://playwright.dev/docs/api/class-apiresponseassertions) class provides assertion
 * methods that can be used to make assertions about the
 * [APIResponse](https://playwright.dev/docs/api/class-apiresponse) in the tests.
 *
 * ```js
 * import { test, expect } from '@playwright/test';
 *
 * test('navigates to login', async ({ page }) => {
 *   // ...
 *   const response = await page.request.get('https://playwright.dev');
 *   await expect(response).toBeOK();
 * });
 * ```
 *
 */
interface APIResponseAssertions {
  /**
   * Ensures the response status code is within `200..299` range.
   *
   * **Usage**
   *
   * ```js
   * await expect(response).toBeOK();
   * ```
   *
   */
  toBeOK(): Promise<void>;

  /**
   * Makes the assertion check for the opposite condition. For example, this code tests that the response status is not
   * successful:
   *
   * ```js
   * await expect(response).not.toBeOK();
   * ```
   *
   */
  not: APIResponseAssertions;
}

/**
 * The [LocatorAssertions](https://playwright.dev/docs/api/class-locatorassertions) class provides assertion methods
 * that can be used to make assertions about the [Locator](https://playwright.dev/docs/api/class-locator) state in the
 * tests.
 *
 * ```js
 * import { test, expect } from '@playwright/test';
 *
 * test('status becomes submitted', async ({ page }) => {
 *   // ...
 *   await page.getByRole('button').click();
 *   await expect(page.locator('.status')).toHaveText('Submitted');
 * });
 * ```
 *
 */
interface LocatorAssertions {
  /**
   * Ensures that [Locator](https://playwright.dev/docs/api/class-locator) points to an element that is
   * [connected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) to a Document or a ShadowRoot.
   *
   * **Usage**
   *
   * ```js
   * await expect(page.getByText('Hidden text')).toBeAttached();
   * ```
   *
   * @param options
   */
  toBeAttached(options?: {
    attached?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to a checked input.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByLabel('Subscribe to newsletter');
   * await expect(locator).toBeChecked();
   * ```
   *
   * @param options
   */
  toBeChecked(options?: {
    checked?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to a disabled element. Element is
   * disabled if it has "disabled" attribute or is disabled via
   * ['aria-disabled'](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled). Note
   * that only native control elements such as HTML `button`, `input`, `select`, `textarea`, `option`, `optgroup` can be
   * disabled by setting "disabled" attribute. "disabled" attribute on other elements is ignored by the browser.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('button.submit');
   * await expect(locator).toBeDisabled();
   * ```
   *
   * @param options
   */
  toBeDisabled(options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an editable element.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByRole('textbox');
   * await expect(locator).toBeEditable();
   * ```
   *
   * @param options
   */
  toBeEditable(options?: {
    editable?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an empty editable element or to a
   * DOM node that has no text.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('div.warning');
   * await expect(locator).toBeEmpty();
   * ```
   *
   * @param options
   */
  toBeEmpty(options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an enabled element.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('button.submit');
   * await expect(locator).toBeEnabled();
   * ```
   *
   * @param options
   */
  toBeEnabled(options?: {
    enabled?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to a focused DOM node.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByRole('textbox');
   * await expect(locator).toBeFocused();
   * ```
   *
   * @param options
   */
  toBeFocused(options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures that [Locator](https://playwright.dev/docs/api/class-locator) either does not resolve to any DOM node, or
   * resolves to a [non-visible](https://playwright.dev/docs/actionability#visible) one.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('.my-element');
   * await expect(locator).toBeHidden();
   * ```
   *
   * @param options
   */
  toBeHidden(options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element that intersects viewport,
   * according to the
   * [intersection observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByRole('button');
   * // Make sure at least some part of element intersects viewport.
   * await expect(locator).toBeInViewport();
   * // Make sure element is fully outside of viewport.
   * await expect(locator).not.toBeInViewport();
   * // Make sure that at least half of the element intersects viewport.
   * await expect(locator).toBeInViewport({ ratio: 0.5 });
   * ```
   *
   * @param options
   */
  toBeInViewport(options?: {
    /**
     * The minimal ratio of the element to intersect viewport. If equals to `0`, then element should intersect viewport at
     * any positive ratio. Defaults to `0`.
     */
    ratio?: number;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures that [Locator](https://playwright.dev/docs/api/class-locator) points to an attached and
   * [visible](https://playwright.dev/docs/actionability#visible) DOM node.
   *
   * To check that at least one element from the list is visible, use
   * [locator.first()](https://playwright.dev/docs/api/class-locator#locator-first).
   *
   * **Usage**
   *
   * ```js
   * // A specific element is visible.
   * await expect(page.getByText('Welcome')).toBeVisible();
   *
   * // At least one item in the list is visible.
   * await expect(page.getByTestId('todo-item').first()).toBeVisible();
   *
   * // At least one of the two elements is visible, possibly both.
   * await expect(
   *     page.getByRole('button', { name: 'Sign in' })
   *         .or(page.getByRole('button', { name: 'Sign up' }))
   *         .first()
   * ).toBeVisible();
   * ```
   *
   * @param options
   */
  toBeVisible(options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;

    visible?: boolean;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element that contains the given
   * text. All nested elements will be considered when computing the text content of the element. You can use regular
   * expressions for the value as well.
   *
   * **Details**
   *
   * When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual
   * text and in the expected string before matching. When regular expression is used, the actual text is matched as is.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('.title');
   * await expect(locator).toContainText('substring');
   * await expect(locator).toContainText(/\d messages/);
   * ```
   *
   * If you pass an array as an expected value, the expectations are:
   * 1. Locator resolves to a list of elements.
   * 1. Elements from a **subset** of this list contain text from the expected array, respectively.
   * 1. The matching subset of elements has the same order as the expected array.
   * 1. Each text value from the expected array is matched by some element from the list.
   *
   * For example, consider the following list:
   *
   * ```html
   * <ul>
   *   <li>Item Text 1</li>
   *   <li>Item Text 2</li>
   *   <li>Item Text 3</li>
   * </ul>
   * ```
   *
   * Let's see how we can use the assertion:
   *
   * ```js
   * // ✓ Contains the right items in the right order
   * await expect(page.locator('ul > li')).toContainText(['Text 1', 'Text 3']);
   *
   * // ✖ Wrong order
   * await expect(page.locator('ul > li')).toContainText(['Text 3', 'Text 2']);
   *
   * // ✖ No item contains this text
   * await expect(page.locator('ul > li')).toContainText(['Some 33']);
   *
   * // ✖ Locator points to the outer list element, not to the list items
   * await expect(page.locator('ul')).toContainText(['Text 3']);
   * ```
   *
   * @param expected Expected substring or RegExp or a list of those.
   * @param options
   */
  toContainText(expected: string|RegExp|ReadonlyArray<string|RegExp>, options?: {
    /**
     * Whether to perform case-insensitive match.
     * [`ignoreCase`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-contain-text-option-ignore-case)
     * option takes precedence over the corresponding regular expression flag if specified.
     */
    ignoreCase?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;

    /**
     * Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.
     */
    useInnerText?: boolean;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with a given
   * [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByTestId('save-button');
   * await expect(locator).toHaveAccessibleDescription('Save results to disk');
   * ```
   *
   * @param description Expected accessible description.
   * @param options
   */
  toHaveAccessibleDescription(description: string|RegExp, options?: {
    /**
     * Whether to perform case-insensitive match.
     * [`ignoreCase`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-accessible-description-option-ignore-case)
     * option takes precedence over the corresponding regular expression flag if specified.
     */
    ignoreCase?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with a given
   * [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByTestId('save-button');
   * await expect(locator).toHaveAccessibleName('Save to disk');
   * ```
   *
   * @param name Expected accessible name.
   * @param options
   */
  toHaveAccessibleName(name: string|RegExp, options?: {
    /**
     * Whether to perform case-insensitive match.
     * [`ignoreCase`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-accessible-name-option-ignore-case)
     * option takes precedence over the corresponding regular expression flag if specified.
     */
    ignoreCase?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with given attribute.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('input');
   * await expect(locator).toHaveAttribute('type', 'text');
   * ```
   *
   * @param name Attribute name.
   * @param value Expected attribute value.
   * @param options
   */
  toHaveAttribute(name: string, value: string|RegExp, options?: {
    /**
     * Whether to perform case-insensitive match.
     * [`ignoreCase`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-attribute-option-ignore-case)
     * option takes precedence over the corresponding regular expression flag if specified.
     */
    ignoreCase?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with given attribute. The
   * method will assert attribute presence.
   *
   * ```js
   * const locator = page.locator('input');
   * // Assert attribute existence.
   * await expect(locator).toHaveAttribute('disabled');
   * await expect(locator).not.toHaveAttribute('open');
   * ```
   *
   * @param name Attribute name.
   * @param options
   */
  toHaveAttribute(name: string, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with given CSS classes.
   * This needs to be a full match or using a relaxed regular expression.
   *
   * **Usage**
   *
   * ```html
   * <div class='selected row' id='component'></div>
   * ```
   *
   * ```js
   * const locator = page.locator('#component');
   * await expect(locator).toHaveClass(/selected/);
   * await expect(locator).toHaveClass('selected row');
   * ```
   *
   * Note that if array is passed as an expected value, entire lists of elements can be asserted:
   *
   * ```js
   * const locator = page.locator('list > .component');
   * await expect(locator).toHaveClass(['component', 'component selected', 'component']);
   * ```
   *
   * @param expected Expected class or RegExp or a list of those.
   * @param options
   */
  toHaveClass(expected: string|RegExp|ReadonlyArray<string|RegExp>, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) resolves to an exact number of DOM nodes.
   *
   * **Usage**
   *
   * ```js
   * const list = page.locator('list > .component');
   * await expect(list).toHaveCount(3);
   * ```
   *
   * @param count Expected count.
   * @param options
   */
  toHaveCount(count: number, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) resolves to an element with the given computed
   * CSS style.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByRole('button');
   * await expect(locator).toHaveCSS('display', 'flex');
   * ```
   *
   * @param name CSS property name.
   * @param value CSS property value.
   * @param options
   */
  toHaveCSS(name: string, value: string|RegExp, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with the given DOM Node
   * ID.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByRole('textbox');
   * await expect(locator).toHaveId('lastname');
   * ```
   *
   * @param id Element id.
   * @param options
   */
  toHaveId(id: string|RegExp, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with given JavaScript
   * property. Note that this property can be of a primitive type as well as a plain serializable JavaScript object.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('.component');
   * await expect(locator).toHaveJSProperty('loaded', true);
   * ```
   *
   * @param name Property name.
   * @param value Property value.
   * @param options
   */
  toHaveJSProperty(name: string, value: any, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with a given
   * [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles).
   *
   * Note that role is matched as a string, disregarding the ARIA role hierarchy. For example, asserting  a superclass
   * role `"checkbox"` on an element with a subclass role `"switch"` will fail.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByTestId('save-button');
   * await expect(locator).toHaveRole('button');
   * ```
   *
   * @param role Required aria role.
   * @param options
   */
  toHaveRole(role: "alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|"caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|"definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|"generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|"listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|"menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|"radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|"slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|"tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem", options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * This function will wait until two consecutive locator screenshots yield the same result, and then compare the last
   * screenshot with the expectation.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByRole('button');
   * await expect(locator).toHaveScreenshot('image.png');
   * ```
   *
   * Note that screenshot assertions only work with Playwright test runner.
   * @param name Snapshot name.
   * @param options
   */
  toHaveScreenshot(name: string|ReadonlyArray<string>, options?: {
    /**
     * When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different
     * treatment depending on their duration:
     * - finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
     * - infinite animations are canceled to initial state, and then played over after the screenshot.
     *
     * Defaults to `"disabled"` that disables animations.
     */
    animations?: "disabled"|"allow";

    /**
     * When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be
     * changed.  Defaults to `"hide"`.
     */
    caret?: "hide"|"initial";

    /**
     * Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink
     * box `#FF00FF` (customized by
     * [`maskColor`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-screenshot-1-option-mask-color))
     * that completely covers its bounding box.
     */
    mask?: Array<Locator>;

    /**
     * Specify the color of the overlay box for masked elements, in
     * [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
     */
    maskColor?: string;

    /**
     * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is
     * configurable with `TestConfig.expect`. Unset by default.
     */
    maxDiffPixelRatio?: number;

    /**
     * An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by
     * default.
     */
    maxDiffPixels?: number;

    /**
     * Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images.
     * Defaults to `false`.
     */
    omitBackground?: boolean;

    /**
     * When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this
     * will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so
     * screenshots of high-dpi devices will be twice as large or even larger.
     *
     * Defaults to `"css"`.
     */
    scale?: "css"|"device";

    /**
     * File name containing the stylesheet to apply while making the screenshot. This is where you can hide dynamic
     * elements, make elements invisible or change their properties to help you creating repeatable screenshots. This
     * stylesheet pierces the Shadow DOM and applies to the inner frames.
     */
    stylePath?: string|Array<string>;

    /**
     * An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between the
     * same pixel in compared images, between zero (strict) and one (lax), default is configurable with
     * `TestConfig.expect`. Defaults to `0.2`.
     */
    threshold?: number;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * This function will wait until two consecutive locator screenshots yield the same result, and then compare the last
   * screenshot with the expectation.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.getByRole('button');
   * await expect(locator).toHaveScreenshot();
   * ```
   *
   * Note that screenshot assertions only work with Playwright test runner.
   * @param options
   */
  toHaveScreenshot(options?: {
    /**
     * When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different
     * treatment depending on their duration:
     * - finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
     * - infinite animations are canceled to initial state, and then played over after the screenshot.
     *
     * Defaults to `"disabled"` that disables animations.
     */
    animations?: "disabled"|"allow";

    /**
     * When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be
     * changed.  Defaults to `"hide"`.
     */
    caret?: "hide"|"initial";

    /**
     * Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink
     * box `#FF00FF` (customized by
     * [`maskColor`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-screenshot-2-option-mask-color))
     * that completely covers its bounding box.
     */
    mask?: Array<Locator>;

    /**
     * Specify the color of the overlay box for masked elements, in
     * [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
     */
    maskColor?: string;

    /**
     * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is
     * configurable with `TestConfig.expect`. Unset by default.
     */
    maxDiffPixelRatio?: number;

    /**
     * An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by
     * default.
     */
    maxDiffPixels?: number;

    /**
     * Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images.
     * Defaults to `false`.
     */
    omitBackground?: boolean;

    /**
     * When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this
     * will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so
     * screenshots of high-dpi devices will be twice as large or even larger.
     *
     * Defaults to `"css"`.
     */
    scale?: "css"|"device";

    /**
     * File name containing the stylesheet to apply while making the screenshot. This is where you can hide dynamic
     * elements, make elements invisible or change their properties to help you creating repeatable screenshots. This
     * stylesheet pierces the Shadow DOM and applies to the inner frames.
     */
    stylePath?: string|Array<string>;

    /**
     * An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between the
     * same pixel in compared images, between zero (strict) and one (lax), default is configurable with
     * `TestConfig.expect`. Defaults to `0.2`.
     */
    threshold?: number;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with the given text. All
   * nested elements will be considered when computing the text content of the element. You can use regular expressions
   * for the value as well.
   *
   * **Details**
   *
   * When `expected` parameter is a string, Playwright will normalize whitespaces and line breaks both in the actual
   * text and in the expected string before matching. When regular expression is used, the actual text is matched as is.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('.title');
   * await expect(locator).toHaveText(/Welcome, Test User/);
   * await expect(locator).toHaveText(/Welcome, .*\/);
   * ```
   *
   * If you pass an array as an expected value, the expectations are:
   * 1. Locator resolves to a list of elements.
   * 1. The number of elements equals the number of expected values in the array.
   * 1. Elements from the list have text matching expected array values, one by one, in order.
   *
   * For example, consider the following list:
   *
   * ```html
   * <ul>
   *   <li>Text 1</li>
   *   <li>Text 2</li>
   *   <li>Text 3</li>
   * </ul>
   * ```
   *
   * Let's see how we can use the assertion:
   *
   * ```js
   * // ✓ Has the right items in the right order
   * await expect(page.locator('ul > li')).toHaveText(['Text 1', 'Text 2', 'Text 3']);
   *
   * // ✖ Wrong order
   * await expect(page.locator('ul > li')).toHaveText(['Text 3', 'Text 2', 'Text 1']);
   *
   * // ✖ Last item does not match
   * await expect(page.locator('ul > li')).toHaveText(['Text 1', 'Text 2', 'Text']);
   *
   * // ✖ Locator points to the outer list element, not to the list items
   * await expect(page.locator('ul')).toHaveText(['Text 1', 'Text 2', 'Text 3']);
   * ```
   *
   * @param expected Expected string or RegExp or a list of those.
   * @param options
   */
  toHaveText(expected: string|RegExp|ReadonlyArray<string|RegExp>, options?: {
    /**
     * Whether to perform case-insensitive match.
     * [`ignoreCase`](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-text-option-ignore-case)
     * option takes precedence over the corresponding regular expression flag if specified.
     */
    ignoreCase?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;

    /**
     * Whether to use `element.innerText` instead of `element.textContent` when retrieving DOM node text.
     */
    useInnerText?: boolean;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to an element with the given input
   * value. You can use regular expressions for the value as well.
   *
   * **Usage**
   *
   * ```js
   * const locator = page.locator('input[type=number]');
   * await expect(locator).toHaveValue(/[0-9]/);
   * ```
   *
   * @param value Expected value.
   * @param options
   */
  toHaveValue(value: string|RegExp, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the [Locator](https://playwright.dev/docs/api/class-locator) points to multi-select/combobox (i.e. a
   * `select` with the `multiple` attribute) and the specified values are selected.
   *
   * **Usage**
   *
   * For example, given the following element:
   *
   * ```html
   * <select id="favorite-colors" multiple>
   *   <option value="R">Red</option>
   *   <option value="G">Green</option>
   *   <option value="B">Blue</option>
   * </select>
   * ```
   *
   * ```js
   * const locator = page.locator('id=favorite-colors');
   * await locator.selectOption(['R', 'G']);
   * await expect(locator).toHaveValues([/R/, /G/]);
   * ```
   *
   * @param values Expected options currently selected.
   * @param options
   */
  toHaveValues(values: ReadonlyArray<string|RegExp>, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Makes the assertion check for the opposite condition. For example, this code tests that the Locator doesn't contain
   * text `"error"`:
   *
   * ```js
   * await expect(locator).not.toContainText('error');
   * ```
   *
   */
  not: LocatorAssertions;
}

/**
 * The [PageAssertions](https://playwright.dev/docs/api/class-pageassertions) class provides assertion methods that
 * can be used to make assertions about the [Page](https://playwright.dev/docs/api/class-page) state in the tests.
 *
 * ```js
 * import { test, expect } from '@playwright/test';
 *
 * test('navigates to login', async ({ page }) => {
 *   // ...
 *   await page.getByText('Sign in').click();
 *   await expect(page).toHaveURL(/.*\/login/);
 * });
 * ```
 *
 */
interface PageAssertions {
  /**
   * This function will wait until two consecutive page screenshots yield the same result, and then compare the last
   * screenshot with the expectation.
   *
   * **Usage**
   *
   * ```js
   * await expect(page).toHaveScreenshot('image.png');
   * ```
   *
   * Note that screenshot assertions only work with Playwright test runner.
   * @param name Snapshot name.
   * @param options
   */
  toHaveScreenshot(name: string|ReadonlyArray<string>, options?: PageAssertionsToHaveScreenshotOptions): Promise<void>;

  /**
   * This function will wait until two consecutive page screenshots yield the same result, and then compare the last
   * screenshot with the expectation.
   *
   * **Usage**
   *
   * ```js
   * await expect(page).toHaveScreenshot();
   * ```
   *
   * Note that screenshot assertions only work with Playwright test runner.
   * @param options
   */
  toHaveScreenshot(options?: PageAssertionsToHaveScreenshotOptions): Promise<void>;

  /**
   * Ensures the page has the given title.
   *
   * **Usage**
   *
   * ```js
   * await expect(page).toHaveTitle(/.*checkout/);
   * ```
   *
   * @param titleOrRegExp Expected title or RegExp.
   * @param options
   */
  toHaveTitle(titleOrRegExp: string|RegExp, options?: {
    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Ensures the page is navigated to the given URL.
   *
   * **Usage**
   *
   * ```js
   * await expect(page).toHaveURL(/.*checkout/);
   * ```
   *
   * @param urlOrRegExp Expected URL string or RegExp.
   * @param options
   */
  toHaveURL(urlOrRegExp: string|RegExp, options?: {
    /**
     * Whether to perform case-insensitive match.
     * [`ignoreCase`](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-url-option-ignore-case)
     * option takes precedence over the corresponding regular expression flag if specified.
     */
    ignoreCase?: boolean;

    /**
     * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
     */
    timeout?: number;
  }): Promise<void>;

  /**
   * Makes the assertion check for the opposite condition. For example, this code tests that the page URL doesn't
   * contain `"error"`:
   *
   * ```js
   * await expect(page).not.toHaveURL('error');
   * ```
   *
   */
  not: PageAssertions;
}

/**
 * Playwright provides methods for comparing page and element screenshots with expected values stored in files.
 *
 * ```js
 * expect(screenshot).toMatchSnapshot('landing-page.png');
 * ```
 *
 */
interface SnapshotAssertions {
  /**
   * **NOTE** To compare screenshots, use
   * [expect(page).toHaveScreenshot(name[, options])](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1)
   * instead.
   *
   * Ensures that passed value, either a [string] or a [Buffer], matches the expected snapshot stored in the test
   * snapshots directory.
   *
   * **Usage**
   *
   * ```js
   * // Basic usage.
   * expect(await page.screenshot()).toMatchSnapshot('landing-page.png');
   *
   * // Pass options to customize the snapshot comparison and have a generated name.
   * expect(await page.screenshot()).toMatchSnapshot('landing-page.png', {
   *   maxDiffPixels: 27, // allow no more than 27 different pixels.
   * });
   *
   * // Configure image matching threshold.
   * expect(await page.screenshot()).toMatchSnapshot('landing-page.png', { threshold: 0.3 });
   *
   * // Bring some structure to your snapshot files by passing file path segments.
   * expect(await page.screenshot()).toMatchSnapshot(['landing', 'step2.png']);
   * expect(await page.screenshot()).toMatchSnapshot(['landing', 'step3.png']);
   * ```
   *
   * Learn more about [visual comparisons](https://playwright.dev/docs/test-snapshots).
   *
   * Note that matching snapshots only work with Playwright test runner.
   * @param name Snapshot name.
   * @param options
   */
  toMatchSnapshot(name: string|ReadonlyArray<string>, options?: {
    /**
     * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is
     * configurable with `TestConfig.expect`. Unset by default.
     */
    maxDiffPixelRatio?: number;

    /**
     * An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by
     * default.
     */
    maxDiffPixels?: number;

    /**
     * An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between the
     * same pixel in compared images, between zero (strict) and one (lax), default is configurable with
     * `TestConfig.expect`. Defaults to `0.2`.
     */
    threshold?: number;
  }): void;

  /**
   * **NOTE** To compare screenshots, use
   * [expect(page).toHaveScreenshot([options])](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-2)
   * instead.
   *
   * Ensures that passed value, either a [string] or a [Buffer], matches the expected snapshot stored in the test
   * snapshots directory.
   *
   * **Usage**
   *
   * ```js
   * // Basic usage and the file name is derived from the test name.
   * expect(await page.screenshot()).toMatchSnapshot();
   *
   * // Pass options to customize the snapshot comparison and have a generated name.
   * expect(await page.screenshot()).toMatchSnapshot({
   *   maxDiffPixels: 27, // allow no more than 27 different pixels.
   * });
   *
   * // Configure image matching threshold and snapshot name.
   * expect(await page.screenshot()).toMatchSnapshot({
   *   name: 'landing-page.png',
   *   threshold: 0.3,
   * });
   * ```
   *
   * Learn more about [visual comparisons](https://playwright.dev/docs/test-snapshots).
   *
   * Note that matching snapshots only work with Playwright test runner.
   * @param options
   */
  toMatchSnapshot(options?: {
    /**
     * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is
     * configurable with `TestConfig.expect`. Unset by default.
     */
    maxDiffPixelRatio?: number;

    /**
     * An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by
     * default.
     */
    maxDiffPixels?: number;

    /**
     * Snapshot name. If not passed, the test name and ordinals are used when called multiple times.
     */
    name?: string|Array<string>;

    /**
     * An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between the
     * same pixel in compared images, between zero (strict) and one (lax), default is configurable with
     * `TestConfig.expect`. Defaults to `0.2`.
     */
    threshold?: number;
  }): void;
}

/**
 * Represents a location in the source code where [TestCase] or [Suite] is defined.
 */
export interface Location {
  /**
   * Column number in the source file.
   */
  column: number;

  /**
   * Path to the source file.
   */
  file: string;

  /**
   * Line number in the source file.
   */
  line: number;
}

/**
 * `TestInfo` contains information about currently running test. It is available to test functions,
 * [test.beforeEach([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-before-each),
 * [test.afterEach([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-after-each),
 * [test.beforeAll([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-before-all) and
 * [test.afterAll([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-after-all) hooks, and
 * test-scoped fixtures. `TestInfo` provides utilities to control test execution: attach files, update test timeout,
 * determine which test is currently running and whether it was retried, etc.
 *
 * ```js
 * import { test, expect } from '@playwright/test';
 *
 * test('basic test', async ({ page }, testInfo) => {
 *   expect(testInfo.title).toBe('basic test');
 *   await page.screenshot(testInfo.outputPath('screenshot.png'));
 * });
 * ```
 *
 */
export interface TestInfo {
  /**
   * Attach a value or a file from disk to the current test. Some reporters show test attachments. Either
   * [`path`](https://playwright.dev/docs/api/class-testinfo#test-info-attach-option-path) or
   * [`body`](https://playwright.dev/docs/api/class-testinfo#test-info-attach-option-body) must be specified, but not
   * both.
   *
   * For example, you can attach a screenshot to the test:
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test('basic test', async ({ page }, testInfo) => {
   *   await page.goto('https://playwright.dev');
   *   const screenshot = await page.screenshot();
   *   await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
   * });
   * ```
   *
   * Or you can attach files returned by your APIs:
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   * import { download } from './my-custom-helpers';
   *
   * test('basic test', async ({}, testInfo) => {
   *   const tmpPath = await download('a');
   *   await testInfo.attach('downloaded', { path: tmpPath });
   * });
   * ```
   *
   * **NOTE** [testInfo.attach(name[, options])](https://playwright.dev/docs/api/class-testinfo#test-info-attach)
   * automatically takes care of copying attached files to a location that is accessible to reporters. You can safely
   * remove the attachment after awaiting the attach call.
   *
   * @param name Attachment name. The name will also be sanitized and used as the prefix of file name when saving to disk.
   * @param options
   */
  attach(name: string, options?: {
    /**
     * Attachment body. Mutually exclusive with
     * [`path`](https://playwright.dev/docs/api/class-testinfo#test-info-attach-option-path).
     */
    body?: string|Buffer;

    /**
     * Content type of this attachment to properly present in the report, for example `'application/json'` or
     * `'image/png'`. If omitted, content type is inferred based on the
     * [`path`](https://playwright.dev/docs/api/class-testinfo#test-info-attach-option-path), or defaults to `text/plain`
     * for [string] attachments and `application/octet-stream` for [Buffer] attachments.
     */
    contentType?: string;

    /**
     * Path on the filesystem to the attached file. Mutually exclusive with
     * [`body`](https://playwright.dev/docs/api/class-testinfo#test-info-attach-option-body).
     */
    path?: string;
  }): Promise<void>;

  /**
   * Marks the currently running test as "should fail". Playwright Test runs this test and ensures that it is actually
   * failing. This is useful for documentation purposes to acknowledge that some functionality is broken until it is
   * fixed. This is similar to
   * [test.fail([title, details, body, condition, callback, description])](https://playwright.dev/docs/api/class-test#test-fail).
   */
  fail(): void;

  /**
   * Conditionally mark the currently running test as "should fail" with an optional description. This is similar to
   * [test.fail([title, details, body, condition, callback, description])](https://playwright.dev/docs/api/class-test#test-fail).
   * @param condition Test is marked as "should fail" when the condition is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fail(condition: boolean, description?: string): void;

  /**
   * Mark a test as "fixme", with the intention to fix it. Test is immediately aborted. This is similar to
   * [test.fixme([title, details, body, condition, callback, description])](https://playwright.dev/docs/api/class-test#test-fixme).
   */
  fixme(): void;

  /**
   * Conditionally mark the currently running test as "fixme" with an optional description. This is similar to
   * [test.fixme([title, details, body, condition, callback, description])](https://playwright.dev/docs/api/class-test#test-fixme).
   * @param condition Test is marked as "fixme" when the condition is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  fixme(condition: boolean, description?: string): void;

  /**
   * Returns a path inside the [testInfo.outputDir](https://playwright.dev/docs/api/class-testinfo#test-info-output-dir)
   * where the test can safely put a temporary file. Guarantees that tests running in parallel will not interfere with
   * each other.
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   * import fs from 'fs';
   *
   * test('example test', async ({}, testInfo) => {
   *   const file = testInfo.outputPath('dir', 'temporary-file.txt');
   *   await fs.promises.writeFile(file, 'Put some data to the dir/temporary-file.txt', 'utf8');
   * });
   * ```
   *
   * > Note that `pathSegments` accepts path segments to the test output directory such as
   * `testInfo.outputPath('relative', 'path', 'to', 'output')`.
   * > However, this path must stay within the
   * [testInfo.outputDir](https://playwright.dev/docs/api/class-testinfo#test-info-output-dir) directory for each test
   * (i.e. `test-results/a-test-title`), otherwise it will throw.
   * @param pathSegments Path segments to append at the end of the resulting path.
   */
  outputPath(...pathSegments: ReadonlyArray<string>): string;

  /**
   * Changes the timeout for the currently running test. Zero means no timeout. Learn more about
   * [various timeouts](https://playwright.dev/docs/test-timeouts).
   *
   * Timeout is usually specified in the [configuration file](https://playwright.dev/docs/test-configuration), but it could be useful to
   * change the timeout in certain scenarios:
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.beforeEach(async ({ page }, testInfo) => {
   *   // Extend timeout for all tests running this hook by 30 seconds.
   *   testInfo.setTimeout(testInfo.timeout + 30000);
   * });
   * ```
   *
   * @param timeout Timeout in milliseconds.
   */
  setTimeout(timeout: number): void;

  /**
   * Unconditionally skip the currently running test. Test is immediately aborted. This is similar to
   * [test.skip([title, details, body, condition, callback, description])](https://playwright.dev/docs/api/class-test#test-skip).
   */
  skip(): void;

  /**
   * Conditionally skips the currently running test with an optional description. This is similar to
   * [test.skip([title, details, body, condition, callback, description])](https://playwright.dev/docs/api/class-test#test-skip).
   * @param condition A skip condition. Test is skipped when the condition is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  skip(condition: boolean, description?: string): void;

  /**
   * Marks the currently running test as "slow", giving it triple the default timeout. This is similar to
   * [test.slow([condition, callback, description])](https://playwright.dev/docs/api/class-test#test-slow).
   */
  slow(): void;

  /**
   * Conditionally mark the currently running test as "slow" with an optional description, giving it triple the default
   * timeout. This is similar to
   * [test.slow([condition, callback, description])](https://playwright.dev/docs/api/class-test#test-slow).
   * @param condition Test is marked as "slow" when the condition is `true`.
   * @param description Optional description that will be reflected in a test report.
   */
  slow(condition: boolean, description?: string): void;

  /**
   * Returns a path to a snapshot file with the given `pathSegments`. Learn more about
   * [snapshots](https://playwright.dev/docs/test-snapshots).
   *
   * > Note that `pathSegments` accepts path segments to the snapshot file such as `testInfo.snapshotPath('relative',
   * 'path', 'to', 'snapshot.png')`.
   * > However, this path must stay within the snapshots directory for each test file (i.e. `a.spec.js-snapshots`),
   * otherwise it will throw.
   * @param pathSegments The name of the snapshot or the path segments to define the snapshot file path. Snapshots with the same name in the
   * same test file are expected to be the same.
   */
  snapshotPath(...pathSegments: ReadonlyArray<string>): string;

  /**
   * The list of annotations applicable to the current test. Includes annotations from the test, annotations from all
   * [test.describe([title, details, callback])](https://playwright.dev/docs/api/class-test#test-describe) groups the
   * test belongs to and file-level annotations for the test file.
   *
   * Learn more about [test annotations](https://playwright.dev/docs/test-annotations).
   */
  annotations: Array<{
    /**
     * Annotation type, for example `'skip'` or `'fail'`.
     */
    type: string;

    /**
     * Optional description.
     */
    description?: string;
  }>;

  /**
   * The list of files or buffers attached to the current test. Some reporters show test attachments.
   *
   * To add an attachment, use
   * [testInfo.attach(name[, options])](https://playwright.dev/docs/api/class-testinfo#test-info-attach) instead of
   * directly pushing onto this array.
   */
  attachments: Array<{
    /**
     * Attachment name.
     */
    name: string;

    /**
     * Content type of this attachment to properly present in the report, for example `'application/json'` or
     * `'image/png'`.
     */
    contentType: string;

    /**
     * Optional path on the filesystem to the attached file.
     */
    path?: string;

    /**
     * Optional attachment body used instead of a file.
     */
    body?: Buffer;
  }>;

  /**
   * Column number where the currently running test is declared.
   */
  column: number;

  /**
   * Processed configuration from the [configuration file](https://playwright.dev/docs/test-configuration).
   */
  config: FullConfig;

  /**
   * The number of milliseconds the test took to finish. Always zero before the test finishes, either successfully or
   * not. Can be used in
   * [test.afterEach([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-after-each) hook.
   */
  duration: number;

  /**
   * First error thrown during test execution, if any. This is equal to the first element in
   * [testInfo.errors](https://playwright.dev/docs/api/class-testinfo#test-info-errors).
   */
  error?: TestInfoError;

  /**
   * Errors thrown during test execution, if any.
   */
  errors: Array<TestInfoError>;

  /**
   * Expected status for the currently running test. This is usually `'passed'`, except for a few cases:
   * - `'skipped'` for skipped tests, e.g. with
   *   [test.skip([title, details, body, condition, callback, description])](https://playwright.dev/docs/api/class-test#test-skip);
   * - `'failed'` for tests marked as failed with
   *   [test.fail([title, details, body, condition, callback, description])](https://playwright.dev/docs/api/class-test#test-fail).
   *
   * Expected status is usually compared with the actual
   * [testInfo.status](https://playwright.dev/docs/api/class-testinfo#test-info-status):
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.afterEach(async ({}, testInfo) => {
   *   if (testInfo.status !== testInfo.expectedStatus)
   *     console.log(`${testInfo.title} did not run as expected!`);
   * });
   * ```
   *
   */
  expectedStatus: "passed"|"failed"|"timedOut"|"skipped"|"interrupted";

  /**
   * Absolute path to a file where the currently running test is declared.
   */
  file: string;

  /**
   * Test function as passed to `test(title, testFunction)`.
   */
  fn: Function;

  /**
   * Line number where the currently running test is declared.
   */
  line: number;

  /**
   * Absolute path to the output directory for this specific test run. Each test run gets its own directory so they
   * cannot conflict.
   */
  outputDir: string;

  /**
   * The index of the worker between `0` and `workers - 1`. It is guaranteed that workers running at the same time have
   * a different `parallelIndex`. When a worker is restarted, for example after a failure, the new worker process has
   * the same `parallelIndex`.
   *
   * Also available as `process.env.TEST_PARALLEL_INDEX`. Learn more about
   * [parallelism and sharding](https://playwright.dev/docs/test-parallel) with Playwright Test.
   */
  parallelIndex: number;

  /**
   * Processed project configuration from the [configuration file](https://playwright.dev/docs/test-configuration).
   */
  project: FullProject;

  /**
   * Specifies a unique repeat index when running in "repeat each" mode. This mode is enabled by passing `--repeat-each`
   * to the [command line](https://playwright.dev/docs/test-cli).
   */
  repeatEachIndex: number;

  /**
   * Specifies the retry number when the test is retried after a failure. The first test run has
   * [testInfo.retry](https://playwright.dev/docs/api/class-testinfo#test-info-retry) equal to zero, the first retry has
   * it equal to one, and so on. Learn more about [retries](https://playwright.dev/docs/test-retries#retries).
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.beforeEach(async ({}, testInfo) => {
   *   // You can access testInfo.retry in any hook or fixture.
   *   if (testInfo.retry > 0)
   *     console.log(`Retrying!`);
   * });
   *
   * test('my test', async ({ page }, testInfo) => {
   *   // Here we clear some server-side state when retrying.
   *   if (testInfo.retry)
   *     await cleanSomeCachesOnTheServer();
   *   // ...
   * });
   * ```
   *
   */
  retry: number;

  /**
   * Absolute path to the snapshot output directory for this specific test. Each test suite gets its own directory so
   * they cannot conflict.
   *
   * This property does not account for the
   * [testProject.snapshotPathTemplate](https://playwright.dev/docs/api/class-testproject#test-project-snapshot-path-template)
   * configuration.
   */
  snapshotDir: string;

  /**
   * **NOTE** Use of [testInfo.snapshotSuffix](https://playwright.dev/docs/api/class-testinfo#test-info-snapshot-suffix)
   * is discouraged. Please use
   * [testConfig.snapshotPathTemplate](https://playwright.dev/docs/api/class-testconfig#test-config-snapshot-path-template)
   * to configure snapshot paths.
   *
   * Suffix used to differentiate snapshots between multiple test configurations. For example, if snapshots depend on
   * the platform, you can set `testInfo.snapshotSuffix` equal to `process.platform`. In this case
   * `expect(value).toMatchSnapshot(snapshotName)` will use different snapshots depending on the platform. Learn more
   * about [snapshots](https://playwright.dev/docs/test-snapshots).
   */
  snapshotSuffix: string;

  /**
   * Actual status for the currently running test. Available after the test has finished in
   * [test.afterEach([title, hookFunction])](https://playwright.dev/docs/api/class-test#test-after-each) hook and
   * fixtures.
   *
   * Status is usually compared with the
   * [testInfo.expectedStatus](https://playwright.dev/docs/api/class-testinfo#test-info-expected-status):
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.afterEach(async ({}, testInfo) => {
   *   if (testInfo.status !== testInfo.expectedStatus)
   *     console.log(`${testInfo.title} did not run as expected!`);
   * });
   * ```
   *
   */
  status?: "passed"|"failed"|"timedOut"|"skipped"|"interrupted";

  /**
   * Tags that apply to the test. Learn more about [tags](https://playwright.dev/docs/test-annotations#tag-tests).
   *
   * **NOTE** Any changes made to this list while the test is running will not be visible to test reporters.
   *
   */
  tags: Array<string>;

  /**
   * Test id matching the test case id in the reporter API.
   */
  testId: string;

  /**
   * Timeout in milliseconds for the currently running test. Zero means no timeout. Learn more about
   * [various timeouts](https://playwright.dev/docs/test-timeouts).
   *
   * Timeout is usually specified in the [configuration file](https://playwright.dev/docs/test-configuration)
   *
   * ```js
   * import { test, expect } from '@playwright/test';
   *
   * test.beforeEach(async ({ page }, testInfo) => {
   *   // Extend timeout for all tests running this hook by 30 seconds.
   *   testInfo.setTimeout(testInfo.timeout + 30000);
   * });
   * ```
   *
   */
  timeout: number;

  /**
   * The title of the currently running test as passed to `test(title, testFunction)`.
   */
  title: string;

  /**
   * The full title path starting with the test file name.
   */
  titlePath: Array<string>;

  /**
   * The unique index of the worker process that is running the test. When a worker is restarted, for example after a
   * failure, the new worker process gets a new unique `workerIndex`.
   *
   * Also available as `process.env.TEST_WORKER_INDEX`. Learn more about [parallelism and sharding](https://playwright.dev/docs/test-parallel)
   * with Playwright Test.
   */
  workerIndex: number;
}

/**
 * Information about an error thrown during test execution.
 */
export interface TestInfoError {
  /**
   * Error message. Set when [Error] (or its subclass) has been thrown.
   */
  message?: string;

  /**
   * Error stack. Set when [Error] (or its subclass) has been thrown.
   */
  stack?: string;

  /**
   * The value that was thrown. Set when anything except the [Error] (or its subclass) has been thrown.
   */
  value?: string;
}

/**
 * `WorkerInfo` contains information about the worker that is running tests and is available to worker-scoped
 * fixtures. `WorkerInfo` is a subset of [TestInfo](https://playwright.dev/docs/api/class-testinfo) that is available
 * in many other places.
 */
export interface WorkerInfo {
  /**
   * Processed configuration from the [configuration file](https://playwright.dev/docs/test-configuration).
   */
  config: FullConfig;

  /**
   * The index of the worker between `0` and `workers - 1`. It is guaranteed that workers running at the same time have
   * a different `parallelIndex`. When a worker is restarted, for example after a failure, the new worker process has
   * the same `parallelIndex`.
   *
   * Also available as `process.env.TEST_PARALLEL_INDEX`. Learn more about
   * [parallelism and sharding](https://playwright.dev/docs/test-parallel) with Playwright Test.
   */
  parallelIndex: number;

  /**
   * Processed project configuration from the [configuration file](https://playwright.dev/docs/test-configuration).
   */
  project: FullProject;

  /**
   * The unique index of the worker process that is running the test. When a worker is restarted, for example after a
   * failure, the new worker process gets a new unique `workerIndex`.
   *
   * Also available as `process.env.TEST_WORKER_INDEX`. Learn more about [parallelism and sharding](https://playwright.dev/docs/test-parallel)
   * with Playwright Test.
   */
  workerIndex: number;
}

export interface PageAssertionsToHaveScreenshotOptions {
  /**
   * When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different
   * treatment depending on their duration:
   * - finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
   * - infinite animations are canceled to initial state, and then played over after the screenshot.
   *
   * Defaults to `"disabled"` that disables animations.
   */
  animations?: "disabled"|"allow";

  /**
   * When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be
   * changed.  Defaults to `"hide"`.
   */
  caret?: "hide"|"initial";

  /**
   * An object which specifies clipping of the resulting image.
   */
  clip?: {
    /**
     * x-coordinate of top-left corner of clip area
     */
    x: number;

    /**
     * y-coordinate of top-left corner of clip area
     */
    y: number;

    /**
     * width of clipping area
     */
    width: number;

    /**
     * height of clipping area
     */
    height: number;
  };

  /**
   * When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Defaults to
   * `false`.
   */
  fullPage?: boolean;

  /**
   * Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink
   * box `#FF00FF` (customized by
   * [`maskColor`](https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1-option-mask-color))
   * that completely covers its bounding box.
   */
  mask?: Array<Locator>;

  /**
   * Specify the color of the overlay box for masked elements, in
   * [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
   */
  maskColor?: string;

  /**
   * An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is
   * configurable with `TestConfig.expect`. Unset by default.
   */
  maxDiffPixelRatio?: number;

  /**
   * An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Unset by
   * default.
   */
  maxDiffPixels?: number;

  /**
   * Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images.
   * Defaults to `false`.
   */
  omitBackground?: boolean;

  /**
   * When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this
   * will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so
   * screenshots of high-dpi devices will be twice as large or even larger.
   *
   * Defaults to `"css"`.
   */
  scale?: "css"|"device";

  /**
   * File name containing the stylesheet to apply while making the screenshot. This is where you can hide dynamic
   * elements, make elements invisible or change their properties to help you creating repeatable screenshots. This
   * stylesheet pierces the Shadow DOM and applies to the inner frames.
   */
  stylePath?: string|Array<string>;

  /**
   * An acceptable perceived color difference in the [YIQ color space](https://en.wikipedia.org/wiki/YIQ) between the
   * same pixel in compared images, between zero (strict) and one (lax), default is configurable with
   * `TestConfig.expect`. Defaults to `0.2`.
   */
  threshold?: number;

  /**
   * Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.
   */
  timeout?: number;
}

interface TestConfigWebServer {
  /**
   * Shell command to start. For example `npm run start`..
   */
  command: string;

  /**
   * Current working directory of the spawned process, defaults to the directory of the configuration file.
   */
  cwd?: string;

  /**
   * Environment variables to set for the command, `process.env` by default.
   */
  env?: { [key: string]: string; };

  /**
   * Whether to ignore HTTPS errors when fetching the `url`. Defaults to `false`.
   */
  ignoreHTTPSErrors?: boolean;

  /**
   * The port that your http server is expected to appear on. It does wait until it accepts connections. Either `port`
   * or `url` should be specified.
   */
  port?: number;

  /**
   * If true, it will re-use an existing server on the `port` or `url` when available. If no server is running on that
   * `port` or `url`, it will run the command to start a new server. If `false`, it will throw if an existing process is
   * listening on the `port` or `url`. This should be commonly set to `!process.env.CI` to allow the local dev server
   * when running tests locally.
   */
  reuseExistingServer?: boolean;

  /**
   * If `"pipe"`, it will pipe the stdout of the command to the process stdout. If `"ignore"`, it will ignore the stdout
   * of the command. Default to `"ignore"`.
   */
  stdout?: "pipe"|"ignore";

  /**
   * Whether to pipe the stderr of the command to the process stderr or ignore it. Defaults to `"pipe"`.
   */
  stderr?: "pipe"|"ignore";

  /**
   * How long to wait for the process to start up and be available in milliseconds. Defaults to 60000.
   */
  timeout?: number;

  /**
   * The url on your http server that is expected to return a 2xx, 3xx, 400, 401, 402, or 403 status code when the
   * server is ready to accept connections. Redirects (3xx status codes) are being followed and the new location is
   * checked. Either `port` or `url` should be specified.
   */
  url?: string;
}

