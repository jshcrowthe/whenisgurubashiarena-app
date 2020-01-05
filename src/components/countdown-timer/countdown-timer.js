import { LitElement, css, html } from 'lit-element';
import { timer } from 'rxjs';
import moment from "moment-timezone";

const interval = 1000;

function computeNextEvent(now) {
  const timeZone = 'America/Los_Angeles';
  const eventTimes = [0, 3, 6, 9, 12, 15, 18, 21, 24];

  let nextEvent;
  let nextToday = eventTimes.find(val => val > now.tz(timeZone).hour()); 
  if (nextToday) {
    nextEvent = moment().tz(timeZone).minute(0).second(0).hour(nextToday);
  } else {
    nextEvent = moment().tz(timeZone).minute(0).second(0).add(1, 'days').hour(0);
  }

  return nextEvent;
}

const time = timer(0, interval);

class CountdownTimer extends LitElement {
  static get tagName() { return 'countdown-timer'; }
  static get properties() { 
    return {
      timeToNext: String
    }
  }
  
  constructor() {
    super();
    this.timeToNext = '';

    time.subscribe(() => {
      const now = moment();
      const next = computeNextEvent(now);
      const duration = moment.duration(next.diff(now));
    
      this.timeToNext = `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
    });
  }
  
  render() {
    return html`<p>${this.timeToNext}</p>`;
  }
}

customElements.define(CountdownTimer.tagName, CountdownTimer);
