/**
 *
 * Long press event config
 *
 */
export default interface LongPressEventConfig {
  // The HTML element to apply the event to
  target: EventTarget;

  // on long press handler
  onLongPressCallback: Function;

  // on press start handler - (on click)
  onPressStart?: Function;

  // on press end handler - (after click)
  onLongPressCancel?: Function;
}
