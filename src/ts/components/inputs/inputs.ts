/**
 *
 * Input Element
 *
 */
export default class InputElement {
  // singleton instance
  // eslint-disable-next-line no-use-before-define
  private static singletonInstance: InputElement;

  /**
   *
   * Make constructor private to prevent direct
   * construction calls with the `new` operator.
   *
   */
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  private constructor() {}

  /**
   *
   *  The static method that controls the access to the singleton instance.
   *
   */
  static get instance() {
    // if singleton instance is not initialized yet,
    // create new instance assign to singleton instabce
    if (!InputElement.singletonInstance) {
      InputElement.singletonInstance = new InputElement();
    }

    return InputElement.singletonInstance;
  }

  /**
   *
   * input element skeleton
   *
   */
  private get skeleton(): HTMLInputElement {
    const input = document.createElement('input');
    input.className = this.className;
    input.autofocus = true;
    input.type = 'text';

    // try to prevent the keyboard from popping up on mobile devices
    input.addEventListener('focus', (e) => {
      e.preventDefault();
    });

    return input;
  }

  /**
   *
   * css class name for input element
   *
   */
  // eslint-disable-next-line class-methods-use-this
  get className() {
    return 'input-element';
  }

  /**
   *
   * Input element query selector for dom manipulation
   *
   */
  get querySelector(): HTMLInputElement {
    return document.querySelector(`.${this.className}`)! as HTMLInputElement;
  }

  /**
   *
   * Appends input element to a specified parent element.
   *
   * @param parentElement
   *
   */
  build(parentElement: HTMLElement) {
    parentElement.appendChild(this.skeleton);
  }

  /**
   *
   * Make sure input element is focused
   *
   */
  makeSureFocused() {
    if (!this.focused) {
      this.focus();
    }
  }

  /**
   *
   * Get input element caret position
   *
   */
  get caretPosition(): number {
    // make sure the input is focused
    this.makeSureFocused();
    return this.querySelector.selectionStart!;
  }

  /**
   *
   * Set input element caret position
   *
   * @param position - desired caret position index value
   *
   */
  set caretPosition(position: number) {
    // make sure the input is focused
    this.makeSureFocused();

    // set selection
    this.querySelector.selectionStart = position;
    this.querySelector.selectionEnd = position;
  }

  /**
   *
   * To check whether the input element is focused or not
   *
   */
  get focused(): boolean {
    return document.activeElement === this.querySelector;
  }

  /**
   *
   * To get input element value
   *
   */
  get value(): string {
    return this.querySelector.value;
  }

  /**
   *
   * To set input element value
   *
   * @param value - The value to set
   *
   */
  set value(value: string) {
    this.querySelector.value = value;
  }

  /**
   *
   * Focus input element
   *
   */
  focus() {
    this.querySelector.focus();
  }

  /**
   *
   * Insert a value at the caret position
   *
   * @param value - The value to be inserted
   *
   */
  // eslint-disable-next-line class-methods-use-this
  insertValue(value: string) {
    // capture current state
    const currentValue = this.value;
    const currentCaretPosition = this.caretPosition;

    // prepare updated state
    const updatedValue =
      currentValue.slice(0, currentCaretPosition) +
      value +
      currentValue.slice(currentCaretPosition);
    const updatedCaretPosition = currentCaretPosition + value.length;

    // update state
    this.value = updatedValue;
    this.caretPosition = updatedCaretPosition;
  }

  /**
   *
   * Remove characters from the value starting at the caret position
   *
   * @param count - The number of characters, default value is 1
   *
   */
  remove(count: number = 1) {
    // capture current state
    const currentValue = this.value;
    const currentCaretPosition = this.caretPosition;

    // prepare updated state
    const beforeCaretValue = currentValue.slice(0, currentCaretPosition);
    const afterCaretValue = currentValue.slice(currentCaretPosition);
    const endIndex = beforeCaretValue.length - count;
    const updatedValue = beforeCaretValue.slice(0, endIndex) + afterCaretValue;
    const updatedCaretPosition = currentCaretPosition - count;

    // update state
    this.value = updatedValue;
    this.caretPosition = updatedCaretPosition;
  }

  /**
   *
   * Clear the value of input element
   *
   */
  clear() {
    this.value = '';
    this.focus();
  }
}
