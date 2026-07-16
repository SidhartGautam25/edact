function createStore(initialState) {
  let state = initialState;

  let subscribers = [];

  function getState() {
    return state;
  }

  function subscribe(listener) {
    subscribers.push(listener);

    return function unsubscribe() {
      const index = subscribers.indexOf(listener);

      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    };
  }

  function notify() {
    subscribers.forEach((listener) => {
      listener();
    });
  }

  function setState(newState) {
    state = newState;

    notify();
  }

  return {
    getState,
    setState,
    subscribe,
  };
}

export { createStore };
