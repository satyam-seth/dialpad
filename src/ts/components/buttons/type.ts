/**
 *
 * config for dialpad button
 *
 */
export default interface DialpadButtonConfig {
  // unique string for namepacing
  namespace: string;

  // aria label e.g. One, Two, Three etc
  ariaLabel: string;

  // title e.g. 1,2,4,* etc
  title: string;

  // subtite e.g. ABC, CDE, GHI etc
  subtitle?: string;

  // button click handler
  onClick: () => void;
}
