import InputElement from './components/inputs/inputs';
import Keypad from './layout/keypad';

// extend type
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    inputElement: InputElement;
  }
}

// expose input element instance
window.inputElement = InputElement.instance;

window.onload = () => {
  // eslint-disable-next-line no-console
  console.log('dialpad');

  // append input element
  InputElement.instance.build(document.body);

  // create keypad instance
  const keypad = new Keypad({
    namespace: 'dialpad',
    onCallBtnClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on call button');
    },
    onClearBtnClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on clear button');
    },
  });

  // build keypad
  keypad.build(document.body);
};
