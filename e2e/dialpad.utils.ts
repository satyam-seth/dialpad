import { Locator, expect } from '@playwright/test';

/**
 *
 * Assert Button Area Label - assert that the button has correct area label attribute value
 *
 * @param btnLocator - button locator
 * @param areaLabelText - area label text
 *
 */
async function assertButtonAreaLabel(
  btnLocator: Locator,
  areaLabelText: string
) {
  const btnAreaLabel = await btnLocator.getAttribute('aria-label');
  expect(btnAreaLabel).toEqual(areaLabelText);
}

/**
 *
 * Assert Action Button - assert that the button has correct area label and icon
 *
 * @param btnLocator - button locator
 * @param areaLabelText - area label text
 * @param titleText - title inner text
 * @param subtitleText - subtitle inner text
 *
 */
export async function assertActionButton(
  btnLocator: Locator,
  areaLabelText: string,
  titleText: string,
  subtitleText: string
) {
  // Assert that button  has correct area label
  await assertButtonAreaLabel(btnLocator, areaLabelText);

  // Assert that button has correct title
  const btnTitle = btnLocator.locator('h1.dialpad-btn__title');
  const btnTitleText = await btnTitle.innerText();
  expect(btnTitleText).toEqual(titleText);

  // Assert that button has correct subtitle
  const btnSubtitle = btnLocator.locator('p.dialpad-btn__subtitle');
  const btnSubtitleText = await btnSubtitle.innerText();
  expect(btnSubtitleText).toEqual(subtitleText);

  // Assert that button is visible
  await expect(btnLocator).toBeVisible();
}

/**
 *
 * Assert Icon Button - assert that the button has correct area label and icon
 *
 * @param btnLocator - button locator
 * @param areaLabelText - area label text
 * @param iconName - material icon name
 *
 */
export async function assertIconButton(
  btnLocator: Locator,
  areaLabelText: string,
  iconName: string
) {
  // Assert that button  has correct area label
  await assertButtonAreaLabel(btnLocator, areaLabelText);

  // Assert that button has correct icon
  const btnIconSnap = btnLocator.locator('span.material-symbols-outlined');
  const btnIcon = await btnIconSnap.innerText();
  expect(btnIcon).toEqual(iconName);
}
