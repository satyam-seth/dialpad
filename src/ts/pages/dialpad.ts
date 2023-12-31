import InputElement from '../components/forms/inputs';
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

  // input field instance
  private inputField!: InputElement;

  // keypad instance
  private keypad!: Keypad;

  // recent call number
  private recentCallOnNumber?: string;

  /**
   *
   * construct Dialpad instance
   *
   */
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
    this.inputFieldLayout.build(dialpad);

    // build keypad layout
    this.keypadLayout.build(dialpad);

    // append copyright text
    dialpad.appendChild(this.copyrightText);

    return dialpad;
  }

  /**
   *
   * To get Input Element
   *
   */
  private get inputFieldLayout(): InputElement {
    this.inputField = new InputElement({
      namespace: this.config.namespace,
      onValueEmpty: () => {
        // eslint-disable-next-line no-console
        console.log('disable backspace button');
        this.keypad.disableBackspaceButton();
      },
      onValueNonEmpty: () => {
        // eslint-disable-next-line no-console
        console.log('enable backspace button');
        this.keypad.enableBackspaceButton();
      },
    });
    return this.inputField;
  }

  /**
   *
   * To get Keypad Layout
   *
   */
  private get keypadLayout() {
    this.keypad = new Keypad({
      namespace: this.config.namespace,
      onKeypadBtnClick: (value: string) => {
        // eslint-disable-next-line no-console
        console.log('clicked on button', value);

        // insert value
        this.inputField.insertValue(value);
        this.keypad.enableBackspaceButton();
      },
      onZeroBtnLongPress: (value: string) => {
        // eslint-disable-next-line no-console
        console.log('long pressed on zero button');

        // insert zero button subtitle value `+`
        this.inputField.replaceValue(value);
      },
      onZeroBtnLongPressCancel: () => {
        // focus input field
        this.inputField.focus();
      },
      onCallBtnClick: () => {
        // eslint-disable-next-line no-console
        console.log('clicked on call button');

        // check whether try to call on recent number
        if (
          this.inputField.value === '' &&
          this.recentCallOnNumber !== undefined
        ) {
          // eslint-disable-next-line no-console
          console.log('fill last call on number in input field value');
          this.inputField.value = this.recentCallOnNumber;
          this.inputField.focus();
          this.keypad.enableBackspaceButton();
        }
        // if value is not empty (or add check for valid phone number)
        else if (this.inputField.value !== '') {
          // update last call on number
          this.recentCallOnNumber = this.inputField.value;

          // eslint-disable-next-line no-console
          console.log('placing call on ', this.inputField.value);
        }
      },
      onBackspaceBtnClick: () => {
        // eslint-disable-next-line no-console
        console.log('clicked on clear button');
        this.inputField.removeValue();
      },
      onBackspaceBtnLongPress: () => {
        // eslint-disable-next-line no-console
        console.log('long press on backspace button');

        // clear input value and hide backspace button
        this.inputField.value = '';
        this.inputField.focus();
        this.keypad.disableBackspaceButton();
      },
    });

    return this.keypad;
  }

  /**
   *
   * append copyright text element
   *
   */
  // eslint-disable-next-line class-methods-use-this
  get copyrightText(): HTMLParagraphElement {
    // create copyright text
    const copyrightTextElement = document.createElement('p');
    copyrightTextElement.className = 'copyright-text';
    copyrightTextElement.innerText = `Made by • Satyam Seth Ⓒ ${new Date().getFullYear()}`;

    return copyrightTextElement;
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
