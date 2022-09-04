/** A Web Component custom element class */
export interface CustomElementConstructor<T extends HTMLElement> extends Function {
  new(...args: any[]): T;
}

/** Parameters used to define a {@link WebComponentHarnessFactory}. */
export interface WebComponentHarnessFactoryParams<T extends HTMLElement> {
  /** The name (and selector) of the web component. */
  readonly name: string;
  /** The type of the web component. */
  readonly type?: CustomElementConstructor<T>;
  /**
   * The path or name of the JS file defining the Web Component.
   * This property is not necessary if the web component is already imported.
   */
  readonly jsPath?: string;
}

/**
 * Holds a web component for testing.
 */
export class WebComponentHarness<T extends HTMLElement> {

  public readonly initialHtml: string;

  /** The host element containing this test harness. */
  public readonly host: HTMLDivElement;

  public readonly component: T;

  constructor(initialHtml: string, host: HTMLDivElement, component: T) {
    this.initialHtml = initialHtml;
    this.host = host;
    this.component = component;
  }

  public detach() {
    document.body.removeChild(this.host);
  }

}

/** Creates 1 or more {@link WebComponentHarness}  objects.*/
class WebComponentHarnessFactory<T extends HTMLElement> {

  private readonly _params: WebComponentHarnessFactoryParams<T>;
  private _lastHarness?: WebComponentHarness<T>;

  constructor(params: WebComponentHarnessFactoryParams<T>) {
    this._params = params;

    if (params.jsPath) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = params.jsPath;
      document.body.appendChild(script);

      afterAll(() => {
        this._detach();
        document.body.removeChild(script);
      });
    }

    if (!window.customElements.get(params.name)) {
      if (!params.type) {
        throw new Error(`type: parameter is required for name: '${params.name}' if the customElement has not already been defined`);
      }
      window.customElements.define(params.name, params.type);
    }
  }

  private _detach() {
    if (this._lastHarness) {
      this._lastHarness.detach();
      this._lastHarness = undefined;
    }
  }

  public createHarness(html?: string): WebComponentHarness<T> {
    this._detach();

    const p = this._params;
    if (!html) {
      html = `<${p.name}></${p.name}>`;
    }

    const host = document.createElement('div');
    host.innerHTML = html;
    window.customElements.upgrade(host);
    document.body.appendChild(host);

    const component = host.querySelector(':scope ' + p.name);
    if (!component) {
      throw new Error(`Element <${p.name}> not found in harness HTML: \n ${html}`);
    }
    if (p.type && !(component instanceof p.type)) {
      throw new Error(`Element <${p.name}> is of type ${component.constructor.name}; expected ${p.type.name}`);
    }

    const harness = new WebComponentHarness<T>(html, host, component as T);
    this._lastHarness = harness;
    return harness;
  }

}

/**
 * Creates and returns a Web Component test harness factory.
 * @param params {@link WebComponentHarnessFactoryParams}
 * @returns A function that can be passed an html string, which returns a {@link WebComponentHarness}.
 */
export function createHarnessFactory<T extends HTMLElement>(params: WebComponentHarnessFactoryParams<T>) {
  const f = new WebComponentHarnessFactory(params);
  return (html?: string) => f.createHarness(html);
}
