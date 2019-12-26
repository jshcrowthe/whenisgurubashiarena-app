import { LitElement, html } from 'lit-element';

class CountdownTimer extends LitElement {
  static get tagName() { return 'countdown-timer'; }

  constructor() {
    super();
  }
  
  render() {
    return html`<p>Hello World!</p>`;
  }
}

customElements.define(CountdownTimer.tagName, CountdownTimer);
