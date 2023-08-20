import InputElement from './components/forms/inputs';
import Dialpad from './pages/dialpad';

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
  // create dialpad instance
  const dialpad = new Dialpad({ namespace: 'demo' });

  // build dialpad
  dialpad.build(document.body);
};
