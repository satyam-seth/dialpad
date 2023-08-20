/**
 *
 * Config for InputElement
 *
 */
export interface InputElementConfig {
  // unique string for namespacing
  namespace: string;

  // run if the value is empty during the input event
  onValueEmpty: () => void;

  // run if the value is empty during the input event.
  onValueNonEmpty: () => void;
}
