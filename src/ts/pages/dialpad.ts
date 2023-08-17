import InputElement from '../components/inputs/inputs';
import Keypad from '../layout/keypad';
import DialpadConfig from './types';

/**
 *
 * Dialpad Page
 *
 */
export default class Dialpad {
  // dialpad configuration
  private config: DialpadConfig;

  constructor(config: DialpadConfig) {
    this.config = config;
  }

  /**
   *
   * page skeleton
   *
   * @returns {HTMLDivElement}
   *
   */
  private skeleton(): HTMLElement {
    const dialpad = document.createElement('section');
    dialpad.id = this.id;
    dialpad.className = 'dialpad';

    // build input field
    this.inputField.build(dialpad);

    // build keypad layout
    this.keypadLayout.build(dialpad);

    return dialpad;
  }

  // eslint-disable-next-line class-methods-use-this
  private get inputField() {
    return InputElement.instance;
  }

  private get keypadLayout() {
    const keypad = new Keypad({
      namespace: this.config.namespace,
      onKeypadButtonClick: (value: string) => {
        // eslint-disable-next-line no-console
        console.log('clicked on button', value);

        // insert value
        this.inputField.insertValue(value);
      },
      onCallBtnClick: () => {
        // eslint-disable-next-line no-console
        console.log('clicked on call button');

        // eslint-disable-next-line no-console
        console.log('placing call on ', this.inputField.value);
      },
      onClearBtnClick: () => {
        // eslint-disable-next-line no-console
        console.log('clicked on clear button');

        this.inputField.remove();
      },
    });

    return keypad;
  }

  /**
   *
   * Unique id for page
   *
   * @returns {string}
   *
   */
  get id(): string {
    return `dialpad-${this.config.namespace}`;
  }

  /**
   *
   * querySelect for app
   *
   * @returns {HTMLElement}
   *
   */
  get element(): HTMLElement {
    return document.getElementById(this.id)!;
  }

  /**
   *
   * Remove dialpad skeleton from dom
   *
   */
  destroy(): void {
    this.element.remove();
  }

  /**
   *
   * Append dialpad skeleton into parent element
   *
   * @param parentElement {HTMLElement}
   */
  build(parentElement: HTMLElement) {
    parentElement.appendChild(this.skeleton());
  }
}