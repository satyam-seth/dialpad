import Keypad from './layout/keypad';

window.onload = () => {
  // eslint-disable-next-line no-console
  console.log('dialpad');

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
