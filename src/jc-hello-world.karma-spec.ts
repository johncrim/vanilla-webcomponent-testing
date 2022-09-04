import './jc-hello-world.js';

import { createHarnessFactory } from '../test/WebComponentHarness.js';

describe('<jc-hello-world>', () => {
  const harnessFactory = createHarnessFactory({
    name: 'jc-hello-world'
  });

  it('Works in karma', () => {
    const harness = harnessFactory('<jc-hello-world name="World!"></jc-hello-world>');
    expect(harness.component.innerHTML).toContain('Hello World!');
  });

});
