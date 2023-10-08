import LongPressEvent from '../../utilities/longPress';
import DialpadButtonConfig from './type';

/**
 *
 * Dialpad Button
 *
 */
export default class DialpadButton {
  // button config
  private config: DialpadButtonConfig;

  /**
   *
   * construct DialpadButton instance
   *
   */
  constructor(config: DialpadButtonConfig) {
    // config assertion
    if (config.subtitle === undefined && config.onLongPress !== undefined) {
      throw new Error('Invalid config for dialPad button');
    }

    this.config = config;
  }

  /**
   *
   * Dialpad button skeleton
   *
   */
  get skeleton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = this.id;
    button.classList.add('dialpad-btn');
    button.setAttribute('aria-label', this.config.ariaLabel);

    // append title
    button.appendChild(this.titleElement);

    // append subtitle
    button.appendChild(this.subtitleElement);

    // configure button events
    this.configureButtonEvents(button);

    return button;
  }

  /**
   *
   * Apply long press event on button element
   *
   * @param button
   *
   */
  applyLongPressEvent(button: HTMLButtonElement) {
    LongPressEvent.apply({
      target: button,
      onLongPressCallback: () => {
        this.config.onLongPress!(this.config.subtitle!);
      },
      onPressStart: () => {
        this.config.onClick(this.config.title);
      },
      onLongPressCancel: this.config.onLongPressCancel,
    });
  }

  /**
   *
   * Apply click event listener on button element
   *
   * @param button
   *
   */
  addClickEventListener(button: HTMLButtonElement) {
    button.addEventListener('click', () => {
      this.config.onClick(this.config.title);
    });
  }

  /**
   *
   * If onLongPress callback is exist in config apply long press event
   * Else apply click event listener on button
   *
   * @param button
   *
   */
  configureButtonEvents(button: HTMLButtonElement) {
    if (this.config.onLongPress !== undefined) {
      // apply long press event
      this.applyLongPressEvent(button);
    } else {
      // add click event listener
      this.addClickEventListener(button);
    }
  }

  /**
   *
   * Dialpad button tile element
   *
   */
  get titleElement(): HTMLElement {
    const title = document.createElement('h1');
    title.classList.add('dialpad-btn__title');
    title.innerText = this.config.title;
    return title;
  }

  /**
   *
   * Dialpad button subtile
   *
   */
  get subtitleElement(): HTMLElement {
    const subtitle = document.createElement('p');
    subtitle.classList.add('dialpad-btn__subtitle');
    subtitle.innerText = this.config.subtitle ?? '';
    return subtitle;
  }

  /**
   *
   * Unique id for dialpad button
   *
   */
  get id() {
    return `dialpad-btn-${this.config.namespace}`;
  }

  /**
   *
   * Dialpad button query selector for dom manipulation
   *
   */
  get querySelector(): HTMLButtonElement {
    return document.getElementById(this.id)! as HTMLButtonElement;
  }

  /**
   *
   * Appends dialpad button to a specified parent element.
   *
   * @param parentElement
   *
   */
  build(parentElement: HTMLElement) {
    parentElement.appendChild(this.skeleton);
  }
}
