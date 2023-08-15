import DialpadButtonConfig from '../components/type';

/**
 *
 * Keypad buttons data
 *
 */
const KEYPAD_BUTTONS_DATA: Array<DialpadButtonConfig> = [
  {
    namespace: 'one',
    ariaLabel: 'One',
    title: '1',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 1');
    },
  },
  {
    namespace: 'two',
    ariaLabel: 'Two',
    title: '2',
    subtitle: 'ABC',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 2');
    },
  },
  {
    namespace: 'three',
    ariaLabel: 'Three',
    title: '3',
    subtitle: 'DEF',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 3');
    },
  },
  {
    namespace: 'four',
    ariaLabel: 'Four',
    title: '4',
    subtitle: 'GHI',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 4');
    },
  },
  {
    namespace: 'five',
    ariaLabel: 'Five',
    title: '5',
    subtitle: 'JKL',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 5');
    },
  },
  {
    namespace: 'six',
    ariaLabel: 'Six',
    title: '6',
    subtitle: 'MNO',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 6');
    },
  },
  {
    namespace: 'seven',
    ariaLabel: 'Seven',
    title: '7',
    subtitle: 'PQRS',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 7');
    },
  },
  {
    namespace: 'eight',
    ariaLabel: 'Eight',
    title: '8',
    subtitle: 'TUV',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 8');
    },
  },
  {
    namespace: 'nine',
    ariaLabel: 'Nine',
    title: '9',
    subtitle: 'WXYZ',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 9');
    },
  },
  {
    namespace: 'star',
    ariaLabel: 'Star',
    title: '*',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on *');
    },
  },
  {
    namespace: 'zero',
    ariaLabel: 'Zero',
    title: '0',
    subtitle: '+',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on 0');
    },
  },
  {
    namespace: 'hash',
    ariaLabel: 'Hash',
    title: '#',
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log('clicked on #');
    },
  },
];

export default KEYPAD_BUTTONS_DATA;
