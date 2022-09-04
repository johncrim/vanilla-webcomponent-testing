// Hello world vanilla web component
class HelloWorldWebComponent extends HTMLElement {

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback() {
    const name = this.getAttribute('name');
    this.innerHTML = `Hello ${name}!`;
  }

}
customElements.define('jc-hello-world', HelloWorldWebComponent);
