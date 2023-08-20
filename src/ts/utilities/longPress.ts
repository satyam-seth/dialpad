/**
 *
 * LongPress event
 *
 */
export default class LongPressEvent {
  // target html element
  private target: EventTarget;

  // callback function
  private callback: Function;

  // state to detect press and hold
  private isHeld: boolean = false;

  // setTimeout Id
  private activeHoldTimeoutId: number | null = null;

  /**
   * @param {EventTarget} target The HTML element to apply the event to
   * @param {Function} callback The function to run once the target is clicked and held
   */
  constructor(target: EventTarget, callback: Function) {
    this.target = target;
    this.callback = callback;

    // start timer
    this.target.addEventListener('mousedown', this.onHoldStart.bind(this));
    this.target.addEventListener('touchstart', this.onHoldStart.bind(this));

    // stop timer
    this.target.addEventListener('mouseup', this.onHoldEnd.bind(this));
    this.target.addEventListener('mouseout', this.onHoldEnd.bind(this));
    this.target.addEventListener('mouseleave', this.onHoldEnd.bind(this));
    this.target.addEventListener('touchend', this.onHoldEnd.bind(this));
    this.target.addEventListener('touchcancel', this.onHoldEnd.bind(this));
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

    this.activeHoldTimeoutId = window.setTimeout(() => {
      if (this.isHeld === true) {
        // eslint-disable-next-line no-console
        console.log('long press detected');
        this.callback();
      }
    }, 1000);
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
   * Apply long press event without using new keyword
   *
   * @param {EventTarget} target The HTML element to apply the event to
   * @param {Function} callback The function to run once the target is clicked and held
   *
   */
  static apply(target: EventTarget, callback: Function) {
    // eslint-disable-next-line no-new
    new LongPressEvent(target, callback);
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
