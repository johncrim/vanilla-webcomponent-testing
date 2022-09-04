# vanilla-webcomponent-testing-starter

Starter project / example for developing vanilla web components with typescript and karma for testing.

"Vanilla web components" means no framework or dependencies used to create the web components.

Features:

1. Tests run in karma using `karma-typescript` and Chrome launcher, using jasmine test framework.
2. Code and tests are built using ES Modules (not CommonJS)
2. Web Component Test Harness (in `./test/` dir) reduces boilerplate for creating web component tests
2. Test results reported nicely using mocha and HTML reporters
3. VS Code debug launch setting for attaching to Chrome running karma; source maps are enabled to facilitate productive debugging.

## Debugging

To debug tests:

1. Add a breakpoint (optional)
2. Run `yarn test:watch` to start karma and launch Chrome
3. F5 to attach debugger to Chrome
4. You may need to the restart button (<key>Ctrl + Shift + F5</key>) to re-run the tests to hit your breakpoint

## Code Coverage

With current settings, the `karma-typescript` coverage report doesn't work. Change `karmaTypescriptConfig.coverageOptions.instrumentation` to `true` in `karma.conf.cjs`. Sourcemap debugging doesn't work with this option on, and debugging is difficult, but a coverage report is generated.
