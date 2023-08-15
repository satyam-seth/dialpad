import DialpadButton from './components/buttons';

window.onload = () => {
  // eslint-disable-next-line no-console
  console.log('dialpad');

  // create button instance
  const btn = new DialpadButton({
    namespace: 'one',
    ariaLabel: 'One',
    title: '1',
    subtitle: 'abc',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 1');
    },
  });

  // build button
  btn.build(document.body);
};
