interface DocEvent extends Event {
  key: string;
  value: string;
}

const code = () => {
  const localStore: Storage['setItem'] = localStorage.setItem;

  localStorage.setItem = (key, value) => {
    const event = new Event('localUpdated') as DocEvent;
    event.key = key;
    event.value = value;

    document.dispatchEvent(event);
    localStore.call(this, key, value);
  };

  const localStoreHandler: EventListener = (e) => {
    const docEvent = e as DocEvent;
    const isDarkMode =
      docEvent.key === 'chakra-ui-color-mode' && docEvent.value === 'dark';
    const metaTag = document.querySelectorAll('meta[name="theme-color"]')[0];
    metaTag.setAttribute('content', isDarkMode ? '#23262B' : '#126631');
  };

  document.addEventListener('localUpdated', localStoreHandler, false);
};

export const getTheme = `(${code})();`;
