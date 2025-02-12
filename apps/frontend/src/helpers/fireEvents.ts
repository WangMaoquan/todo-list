export const fireEvents = {
  keyDown(eventInitDict: KeyboardEventInit) {
    window.dispatchEvent(new KeyboardEvent('keydown', eventInitDict));
  },
};
