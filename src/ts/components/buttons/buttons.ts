import DialpadButtonConfig from './type';

/**
 *
 * Dialpad Button
 *
 */
export default class DialpadButton {
  // button config
  private config: DialpadButtonConfig;

  constructor(config: DialpadButtonConfig) {
    this.config = config;
  }

  /**
   *
   * Dialpad button skeleton
   *
   */
  private get skeleton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = this.id;
    button.classList.add('dialpad-btn');
    button.setAttribute('aria-label', this.config.ariaLabel);

    // append title
    button.appendChild(this.titleElement);

    // append subtitle
    button.appendChild(this.subtitleElement);

    // add click event listener
    button.addEventListener('click', this.config.onClick);

    return button;
  }

  /**
   *
   * Dialpad button tile element
   *
   */
  private get titleElement(): HTMLElement {
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
  private get subtitleElement(): HTMLElement {
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