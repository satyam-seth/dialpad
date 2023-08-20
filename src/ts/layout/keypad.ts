import DialpadButton from '../components/buttons/buttons';
import KEYPAD_BUTTONS_DATA from './data';
import { KeypadButtonData, KeypadConfig } from './types';

/**
 *
 * Keypad
 *
 */
export default class Keypad {
  // keypad config
  private config: KeypadConfig;

  constructor(config: KeypadConfig) {
    this.config = config;
  }

  /**
   *
   * Keypad skeleton
   *
   */
  private get skeleton(): HTMLDivElement {
    const keypad = document.createElement('div');
    keypad.id = this.id;
    keypad.classList.add('keypad');

    // append digits buttons
    KEYPAD_BUTTONS_DATA.forEach((config: KeypadButtonData) => {
      // create button instance
      const btn = new DialpadButton({
        namespace: config.namespace,
        ariaLabel: config.ariaLabel,
        title: config.title,
        subtitle: config.subtitle,
        onClick: this.config.onKeypadButtonClick,
      });

      // append button
      btn.build(keypad);
    });

    // append dummy element
    keypad.appendChild(document.createElement('span'));

    // append call button
    keypad.appendChild(this.callButton);

    // append backspace button
    keypad.appendChild(this.backspaceButton);

    return keypad;
  }

  // eslint-disable-next-line class-methods-use-this
  getMaterialIcon(iconName: string) {
    const iconElement = document.createElement('span');
    iconElement.className = 'material-symbols-outlined';
    iconElement.innerText = iconName;
    return iconElement;
  }

  /**
   *
   * Keypad call button
   *
   */
  private get callButton(): HTMLElement {
    const callBtn = document.createElement('button');
    callBtn.classList.add('keypad__call-btn');
    callBtn.setAttribute('aria-label', 'call button');

    // append call icon
    callBtn.appendChild(this.getMaterialIcon('call'));

    // add click event listener
    callBtn.addEventListener('click', this.config.onCallBtnClick);

    return callBtn;
  }

  /**
   *
   * Keypad backspace button
   *
   */
  private get backspaceButton(): HTMLElement {
    const backspaceBtn = document.createElement('button');
    backspaceBtn.classList.add('keypad__backspace-btn');
    backspaceBtn.setAttribute('aria-label', 'Backspace button');
    backspaceBtn.disabled = true;

    // append backspace icon
    backspaceBtn.appendChild(this.getMaterialIcon('backspace'));

    // add click event listener
    backspaceBtn.addEventListener('click', this.config.onClearBtnClick);

    return backspaceBtn;
  }

  /**
   *
   * To get backspace button element for dom manipulations
   *
   */
  get backspaceButtonElement(): HTMLButtonElement {
    return this.querySelector.querySelector(
      '.keypad__backspace-btn'
    ) as HTMLButtonElement;
  }

  /**
   *
   * Unique id for keypad
   *
   */
  get id() {
    return `keypad-${this.config.namespace}`;
  }

  /**
   *
   * Keypad query selector for dom manipulation
   *
   */
  get querySelector(): HTMLDivElement {
    return document.getElementById(this.id)! as HTMLDivElement;
  }

  /**
   *
   * Appends keypad to a specified parent element.
   *
   * @param parentElement
   *
   */
  build(parentElement: HTMLElement) {
    parentElement.appendChild(this.skeleton);
  }

  /**
   *
   * Enable backspace button
   *
   */
  enableBackspaceButton() {
    this.backspaceButtonElement.disabled = false;
  }

  /**
   *
   * Disable backspace button
   *
   */
  disableBackspaceButton() {
    this.backspaceButtonElement.disabled = true;
  }
}
