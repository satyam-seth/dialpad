import { DialpadButtonClickHandler } from '../components/buttons/type';

/**
 *
 * config for keypad
 *
 */
export interface KeypadConfig {
  // unique string for namespacing
  namespace: string;

  // keypad button (e.g. 1, 2, *, # etc) click handler
  // eslint-disable-next-line no-unused-vars
  onKeypadButtonClick: DialpadButtonClickHandler;

  // call button click handler
  onCallBtnClick: () => void;

  // clear button click handler
  onClearBtnClick: () => void;
}

/**
 *
 * Keypad button data type
 *
 */
export interface KeypadButtonData {
  // unique string for namespacing
  namespace: string;

  // aria label e.g. One, Two, Three etc
  ariaLabel: string;

  // title e.g. 1,2,4,* etc
  title: string;

  // subtitle e.g. ABC, CDE, GHI etc
  subtitle?: string;
}
