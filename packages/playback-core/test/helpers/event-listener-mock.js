/**
 * Mock addEventListener and removeEventListener on an element to track listeners
 * @param {HTMLElement} element - The element to mock
 * @returns {Object} An object containing:
 *   - eventListeners: Map of event types to arrays of listeners
 *   - restore: Function to restore original methods
 *   - hasEventListener: Function to check if a listener exists
 */
export function mockEventListeners(element) {
  const eventListeners = new Map();
  const originalAddEventListener = element.addEventListener.bind(element);
  const originalRemoveEventListener = element.removeEventListener.bind(element);

  element.addEventListener = function (type, listener, options) {
    if (!eventListeners.has(type)) {
      eventListeners.set(type, []);
    }
    eventListeners.get(type).push({ listener, options });
    return originalAddEventListener(type, listener, options);
  };

  element.removeEventListener = function (type, listener, options) {
    if (eventListeners.has(type)) {
      const listeners = eventListeners.get(type);
      const index = listeners.findIndex((l) => l.listener === listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
      if (listeners.length === 0) {
        eventListeners.delete(type);
      }
    }
    return originalRemoveEventListener(type, listener, options);
  };

  // Helper method to check if an event listener exists
  element.hasEventListener = function (type) {
    return eventListeners.has(type) && eventListeners.get(type).length > 0;
  };

  // Return an object with the eventListeners map and a restore function
  return {
    eventListeners,
    restore: () => {
      element.addEventListener = originalAddEventListener;
      element.removeEventListener = originalRemoveEventListener;
      delete element.hasEventListener;
    },
    hasEventListener: (type) => {
      return eventListeners.has(type) && eventListeners.get(type).length > 0;
    },
  };
}
