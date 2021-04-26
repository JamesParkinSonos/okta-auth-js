
async function waitForPopup(openPopupPromise) {
  // Get existing windows count
  const existingHandlesCount = (await browser.getWindowHandles()).length;

  // Open popup window
  await openPopupPromise();

  // Wait for popup window opened and switch to it
  let handles;
  await browser.waitUntil(async () => {
    handles = await browser.getWindowHandles();
    return handles.length > existingHandlesCount;
  }), 5000, 'wait for popup';
  await browser.switchToWindow(handles[handles.length - 1]);

  // Close popup
  try {
    await browser.closeWindow();
  } catch(_e) {
    // Can be already closed
  }

  // Return to original window
  await browser.switchToWindow(handles[existingHandlesCount - 1]);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export {
  waitForPopup, sleep
};
