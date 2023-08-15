import DialpadButton from '../components/buttons';
import DialpadButtonConfig from '../components/type';
import KEYPAD_BUTTONS_DATA from './data';
import KeypadConfig from './type';

/**
 *
 * Dialpad Button
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
   * keypad skeleton
   *
   */
  private get skeleton(): HTMLDivElement {
    const keypad = document.createElement('div');
    keypad.id = this.id;
    keypad.classList.add('keypad');

    // append digits buttons
    KEYPAD_BUTTONS_DATA.forEach((config: DialpadButtonConfig) => {
      // create button instance
      const btn = new DialpadButton(config);

      // append button
      btn.build(keypad);
    });

    // append call button
    keypad.appendChild(this.callButton);

    // append clear button
    keypad.appendChild(this.clearButton);

    return keypad;
  }

  /**
   *
   * keypad call button
   *
   */
  private get callButton(): HTMLElement {
    const callBtn = document.createElement('button');
    callBtn.classList.add('keypad__call-btn');
    callBtn.setAttribute('aria-label', 'call button');
    callBtn.innerText = 'Call';

    // add click event listener
    callBtn.addEventListener('click', this.config.onCallBtnClick);

    return callBtn;
  }

  /**
   *
   * keypad clear button
   *
   */
  private get clearButton(): HTMLElement {
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('keypad__clear-btn');
    clearBtn.setAttribute('aria-label', 'clear button');
    clearBtn.innerText = 'Clear';

    // add click event listener
    clearBtn.addEventListener('click', this.config.onClearBtnClick);

    return clearBtn;
  }

  /**
   *
   * unique id for keypad
   *
   */
  get id() {
    return `keypad-${this.config.namespace}`;
  }

  /**
   *
   * keypad query selector for dom manipulation
   *
   */
  get querySelector(): HTMLDivElement {
    return document.getElementById(this.id)! as HTMLDivElement;
  }

  /**
   *
   * append keypad to a specified parent element.
   *
   * @param parentElement
   *
   */
  build(parentElement: HTMLElement) {
    parentElement.appendChild(this.skeleton);
  }
}
