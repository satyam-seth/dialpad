import { expect, test } from '@playwright/test';
import { assertActionButton, assertIconButton } from './dialpad.utils';

test('Dialpad has expected UI components', async ({ page }) => {
  await page.goto('/');

  // Assert that page has correct title
  await expect(page).toHaveTitle('DialPad');

  /// /////////////////////////////////////// ///
  /// --- DIALPAD DEMO SECTION ASSERTIONS --- ///
  /// /////////////////////////////////////// ///
  const dialpadDemoSection = page.locator('section#dialpad-demo.dialpad');

  // Assert that dialpad demo section is visible
  await expect(dialpadDemoSection).toBeVisible();

  /// //////////////////////////////// ///
  /// --- INPUT ELEMENT ASSERTIONS --- ///
  /// //////////////////////////////// ///
  const inputElement = dialpadDemoSection.locator(
    'input#input-demo.input-element'
  );

  // Assert that input element has correct name attribute
  const inputElementNameAttr = await inputElement.getAttribute('name');
  expect(inputElementNameAttr).toEqual('number');

  // Assert that input element has correct type attribute
  const inputElementTypeAttr = await inputElement.getAttribute('type');
  expect(inputElementTypeAttr).toEqual('text');

  // Assert that input element has correct autofocus attribute
  const inputElementAutofocusAttr = await inputElement.getAttribute(
    'autofocus'
  );
  expect(inputElementAutofocusAttr).toEqual('');

  // Assert that input element has correct inputmode attribute
  const inputElementInputModeAttr = await inputElement.getAttribute(
    'inputmode'
  );
  expect(inputElementInputModeAttr).toEqual('none');

  // Assert that input element has correct autocomplete attribute
  const inputElementAutoCompleteAttr = await inputElement.getAttribute(
    'autocomplete'
  );
  expect(inputElementAutoCompleteAttr).toEqual('off');

  // Assert that input element is visible
  await expect(inputElement).toBeVisible();

  /// ///////////////////////////////// ///
  /// --- BUTTON FOR ONE ASSERTIONS --- ///
  /// ///////////////////////////////// ///
  const btnForDigitOne = dialpadDemoSection.locator('button#dialpad-btn-one');

  // Assert that button for one has correct area label attribute
  await assertActionButton(btnForDigitOne, 'One', '1', '');

  /// ///////////////////////////////// ///
  /// --- BUTTON FOR TWO ASSERTIONS --- ///
  /// ///////////////////////////////// ///
  const btnForDigitTwo = dialpadDemoSection.locator('button#dialpad-btn-two');

  // Assert that button for two has correct area label attribute
  await assertActionButton(btnForDigitTwo, 'Two', '2', 'ABC');

  /// /////////////////////////////////// ///
  /// --- BUTTON FOR THREE ASSERTIONS --- ///
  /// /////////////////////////////////// ///
  const btnForDigitThree = dialpadDemoSection.locator(
    'button#dialpad-btn-three'
  );

  // Assert that button for three has correct area label attribute
  await assertActionButton(btnForDigitThree, 'Three', '3', 'DEF');

  /// ////////////////////////////////// ///
  /// --- BUTTON FOR FOUR ASSERTIONS --- ///
  /// ////////////////////////////////// ///
  const btnForDigitFour = dialpadDemoSection.locator('button#dialpad-btn-four');

  // Assert that button for four has correct area label attribute
  await assertActionButton(btnForDigitFour, 'Four', '4', 'GHI');

  /// ////////////////////////////////// ///
  /// --- BUTTON FOR FIVE ASSERTIONS --- ///
  /// ////////////////////////////////// ///
  const btnForDigitFive = dialpadDemoSection.locator('button#dialpad-btn-five');

  // Assert that button for five has correct area label attribute
  await assertActionButton(btnForDigitFive, 'Five', '5', 'JKL');

  /// ///////////////////////////////// ///
  /// --- BUTTON FOR SIX ASSERTIONS --- ///
  /// ///////////////////////////////// ///
  const btnForDigitSix = dialpadDemoSection.locator('button#dialpad-btn-six');

  // Assert that button for six has correct area label attribute
  await assertActionButton(btnForDigitSix, 'Six', '6', 'MNO');

  /// /////////////////////////////////// ///
  /// --- BUTTON FOR SEVEN ASSERTIONS --- ///
  /// /////////////////////////////////// ///
  const btnForDigitSeven = dialpadDemoSection.locator(
    'button#dialpad-btn-seven'
  );

  // Assert that button for seven has correct area label attribute
  await assertActionButton(btnForDigitSeven, 'Seven', '7', 'PQRS');

  /// /////////////////////////////////// ///
  /// --- BUTTON FOR EIGHT ASSERTIONS --- ///
  /// /////////////////////////////////// ///
  const btnForDigitEight = dialpadDemoSection.locator(
    'button#dialpad-btn-eight'
  );

  // Assert that button for eight has correct area label attribute
  await assertActionButton(btnForDigitEight, 'Eight', '8', 'TUV');

  /// ////////////////////////////////// ///
  /// --- BUTTON FOR NINE ASSERTIONS --- ///
  /// ////////////////////////////////// ///
  const btnForDigitNine = dialpadDemoSection.locator('button#dialpad-btn-nine');

  // Assert that button for nine has correct area label attribute
  await assertActionButton(btnForDigitNine, 'Nine', '9', 'WXYZ');

  /// ////////////////////////////////// ///
  /// --- BUTTON FOR ZERO ASSERTIONS --- ///
  /// ////////////////////////////////// ///
  const btnForDigitZero = dialpadDemoSection.locator('button#dialpad-btn-zero');

  // Assert that button for zero has correct area label attribute
  await assertActionButton(btnForDigitZero, 'Zero', '0', '+');

  /// ////////////////////////////////// ///
  /// --- BUTTON FOR STAR ASSERTIONS --- ///
  /// ////////////////////////////////// ///
  const btnForStar = dialpadDemoSection.locator('button#dialpad-btn-star');

  // Assert that button for star has correct area label attribute, title and subtitle
  await assertActionButton(btnForStar, 'Star', '*', '');

  /// ////////////////////////////////// ///
  /// --- BUTTON FOR HASH ASSERTIONS --- ///
  /// ////////////////////////////////// ///
  const btnForHash = dialpadDemoSection.locator('button#dialpad-btn-hash');

  // Assert that button for hash has correct area label attribute, title and subtitle
  await assertActionButton(btnForHash, 'Hash', '#', '');

  /// ////////////////////////////////// ///
  /// --- BUTTON FOR CALL ASSERTIONS --- ///
  /// ////////////////////////////////// ///
  const btnForCall = dialpadDemoSection.locator('button.keypad__call-btn');

  // Assert that button for call has correct area label attribute and icon
  await assertIconButton(btnForCall, 'call button', 'call');

  // Assert that button for call is visible
  await expect(btnForCall).toBeVisible();

  /// /////////////////////////////////////// ///
  /// --- BUTTON FOR BACKSPACE ASSERTIONS --- ///
  /// /////////////////////////////////////// ///
  const btnForBackspace = dialpadDemoSection.locator(
    'button.keypad__backspace-btn'
  );

  // Assert that button for backspace has correct area label attribute and icon
  await assertIconButton(btnForBackspace, 'Backspace button', 'backspace');

  // Assert that initially button for backspace is not visible
  await expect(btnForBackspace).not.toBeVisible();

  // Click on digit zero
  await btnForDigitZero.click();

  // Assert that initially button for backspace now visible
  await expect(btnForBackspace).toBeVisible();

  /// //////////////////////////// ///
  /// --- COPYRIGHT ASSERTIONS --- ///
  /// //////////////////////////// ///
  const copyrightPara = dialpadDemoSection.locator('p.copyright-text');

  // Assert that copyright para has correct text
  const copyrightText = await copyrightPara.innerText();
  expect(copyrightText).toEqual('Made by • Satyam Seth Ⓒ 2023');
});
