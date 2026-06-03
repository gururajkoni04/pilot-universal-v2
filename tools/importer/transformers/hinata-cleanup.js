/* eslint-disable */
export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    // Remove intro card (step 1 - not main content)
    const introCard = element.querySelector('#intro-card');
    if (introCard) introCard.remove();

    // Remove success card (shown after interaction - not main content)
    const successCard = element.querySelector('#success-card');
    if (successCard) successCard.remove();

    // Remove decorative heart span inside question card
    const heartSpan = element.querySelector('#question-card > div > span');
    if (heartSpan) heartSpan.remove();
  }
}
