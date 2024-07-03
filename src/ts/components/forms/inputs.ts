import { InputElementConfig } from './types';

/**
 *
 * Input Element
 *
 */
export default class InputElement {
  // input element config
  private config: InputElementConfig;

  /**
   *
   * construct InputElement instance
   *
   */
  constructor(config: InputElementConfig) {
    this.config = config;
  }

  /**
   *
   * input element skeleton
   *
   */
  get skeleton(): HTMLInputElement {
    const input = document.createElement('input');
    input.id = this.id;
    input.className = 'input-element';
    input.name = 'number';
    input.type = 'text';
    input.autofocus = true;
    input.inputMode = 'none';
    input.autocomplete = 'off';

    // add input event listener
    input.addEventListener('input', this.inputEventHandler.bind(this));

    return input;
  }

  /**
   *
   * Input element query selector for dom manipulation
   *
   */
  get querySelector(): HTMLInputElement {
    return document.getElementById(this.id) as HTMLInputElement;
  }

  /**
   *
   * Unique id for input element
   *
   * @returns {string}
   *
   */
  get id(): string {
    return `input-${this.config.namespace}`;
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
   * Get input element selection start position
   *
   */
  get selectionStartPosition(): number {
    // make sure the input is focused
    this.makeSureFocused();
    return this.querySelector.selectionStart!;
  }

  /**
   *
   * Get input element caret end position
   *
   */
  get selectionEndPosition(): number {
    // make sure the input is focused
    this.makeSureFocused();
    return this.querySelector.selectionEnd!;
  }

  /**
   *
   * Set input element selection start and end positions
   *
   * @param position - desired caret position index value
   *
   */
  set selectionPosition(position: number) {
    // make sure the input is focused
    this.makeSureFocused();

    // set selection
    this.querySelector.selectionStart = position;
    this.querySelector.selectionEnd = position;
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
   * Insert a value at the caret position
   *
   * @param value - The value to be inserted
   *
   */
  // eslint-disable-next-line class-methods-use-this
  insertValue(value: string) {
    // capture current state
    const currentValue = this.value;
    const { selectionStartPosition, selectionEndPosition } = this;

    // prepare updated state
    let updatedValue;

    if (selectionStartPosition !== selectionEndPosition) {
      //  if input selection start value is not equal to selection end position
      //  it means input value is selected, in this case remove selected value
      //  and insert new value at the selection start (caret) position
      updatedValue =
        currentValue.slice(0, selectionStartPosition) +
        value +
        currentValue.slice(selectionEndPosition);
    } else {
      // else input selection start value is same as selection end value
      //  insert new value at selection  start (caret) position
      updatedValue =
        currentValue.slice(0, selectionStartPosition) +
        value +
        currentValue.slice(selectionStartPosition);
    }
    const updatedCaretPosition = selectionStartPosition + value.length;

    // update state
    this.value = updatedValue;
    this.selectionPosition = updatedCaretPosition;
  }

  /**
   *
   * Remove characters from the value starting at the caret position
   *
   * @param count - The number of characters, default value is 1
   *
   */
  removeValue(count: number = 1) {
    // Capture current state
    const currentValue = this.value;
    const { selectionStartPosition, selectionEndPosition } = this;

    // If there is a selection, remove the selected text
    if (selectionStartPosition !== selectionEndPosition) {
      const updatedValue =
        currentValue.slice(0, selectionStartPosition) +
        currentValue.slice(selectionEndPosition);

      // Update state
      this.value = updatedValue;
      this.selectionPosition = selectionStartPosition;
    } else {
      // Otherwise, remove characters before the caret position
      const beforeCaretValue = currentValue.slice(0, selectionStartPosition);

      if (beforeCaretValue !== '') {
        const afterCaretValue = currentValue.slice(selectionStartPosition);
        const endIndex = beforeCaretValue.length - count;
        const updatedValue =
          beforeCaretValue.slice(0, endIndex) + afterCaretValue;
        const updatedCaretPosition = selectionStartPosition - count;

        // Update state
        this.value = updatedValue;
        this.selectionPosition = updatedCaretPosition;
      }
    }
  }

  /**
   *
   * @param value - The value to be replaced current last value
   *
   */
  replaceValue(value: string) {
    this.removeValue();
    this.insertValue(value);
    this.inputEventHandler();
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

  /**
   *
   * Remove unwanted symbols and allow only digits, +, *, and #
   *
   */
  validation() {
    // prepare updated state
    const { value } = this;
    const caretPositionBeforeRemoveUnwantedChars = this.selectionStartPosition;
    const updatedValueAfterRemoveUnwantedChars = value.replace(
      /[^0-9+*#]/g,
      ''
    );
    const updatedCaretPosition =
      caretPositionBeforeRemoveUnwantedChars +
      updatedValueAfterRemoveUnwantedChars.length -
      value.length;

    // update state
    this.value = updatedValueAfterRemoveUnwantedChars;
    this.selectionPosition = updatedCaretPosition;
  }

  /**
   *
   * `input` event handler
   *
   */
  inputEventHandler() {
    // Remove unwanted symbols and allow only digits, +, *, and #
    this.validation();

    // check whether the value is empty or not, and act accordingly.
    if (this.value === '') {
      // eslint-disable-next-line no-console
      console.log('value empty');
      this.config.onValueEmpty();
    } else {
      // eslint-disable-next-line no-console
      console.log('value non empty');
      this.config.onValueNonEmpty();
    }
  }
}
