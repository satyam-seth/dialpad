/**
 *
 * config for keypad
 *
 */
export default interface KeypadConfig {
  // unique string for namepacing
  namespace: string;

  // call button click handler
  onCallBtnClick: () => void;

  // clear button click handler
  onClearBtnClick: () => void;
}
