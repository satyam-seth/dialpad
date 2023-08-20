import LongPressEventConfig from './types';

/**
 *
 * LongPress event
 *
 */
export default class LongPressEvent {
  // target html element
  private config: LongPressEventConfig;

  // state to detect press and hold
  private isHeld: boolean = false;

  // setTimeout Id
  private activeHoldTimeoutId: number | null = null;

  // long press timeout in milliseconds
  private longPressTimeout = 500;

  /**
   *
   * construct LongPressEvent instance and add event listener
   *
   */
  constructor(config: LongPressEventConfig) {
    this.config = config;

    // start timer
    this.config.target.addEventListener(
      'mousedown',
      this.onHoldStart.bind(this)
    );
    this.config.target.addEventListener(
      'touchstart',
      this.onHoldStart.bind(this)
    );

    // stop timer
    this.config.target.addEventListener('mouseup', this.onHoldEnd.bind(this));
    this.config.target.addEventListener('mouseout', this.onHoldEnd.bind(this));
    this.config.target.addEventListener(
      'mouseleave',
      this.onHoldEnd.bind(this)
    );
    this.config.target.addEventListener('touchend', this.onHoldEnd.bind(this));
    this.config.target.addEventListener(
      'touchcancel',
      this.onHoldEnd.bind(this)
    );
  }

  /**
   *
   * start set timeout timer on long press event for callback execution
   *
   */
  private onHoldStart() {
    // eslint-disable-next-line no-console
    console.log('Start Pressing');
    this.isHeld = true;

    // call on press start handler
    if (this.config.onPressStart) {
      this.config.onPressStart();
    }

    this.activeHoldTimeoutId = window.setTimeout(() => {
      if (this.isHeld === true) {
        // eslint-disable-next-line no-console
        console.log('long press detected');
        this.config.onLongPressCallback();
      }
    }, this.longPressTimeout);
  }

  /**
   *
   * clear set timeout timer on long press event
   *
   */
  private onHoldEnd() {
    // eslint-disable-next-line no-console
    console.log('Stop Pressing');
    this.isHeld = false;

    if (this.activeHoldTimeoutId !== null) {
      window.clearTimeout(this.activeHoldTimeoutId);
      this.activeHoldTimeoutId = null;
    }
  }

  /**
   *
   * Apply long press event without using `new` keyword
   *
   */
  static apply(config: LongPressEventConfig) {
    // eslint-disable-next-line no-new
    new LongPressEvent(config);
  }
}

// Example how to use
// window.onload = () => {
//   // const demoButton = document.querySelector('button');
//   // Using new keyword
//   // new ClickAndHold(demoButton, () => {
//   //     console.log('Long Press');
//   //     alert('Long Press Detected');
//   // });
//   // // Without using new keyword
//   // ClickAndHold.apply(demoButton, () => {
//   //   console.log('Long Press');
//   //   alert('Long Press Detected');
//   // });
// };
