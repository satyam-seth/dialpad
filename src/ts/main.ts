import Dialpad from './pages/dialpad';

window.onload = () => {
  // create dialpad instance
  const dialpad = new Dialpad({ namespace: 'demo' });

  // build dialpad
  dialpad.build(document.body);
};
