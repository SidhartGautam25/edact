function createStore(initialState, actions = {}) {
  let state = initialState;

  const subscribers = [];

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

  function update(updater) {
    setState(updater(state));
  }

  const storeActions = {};

  Object.keys(actions).forEach((name) => {
    storeActions[name] = (...args) => {
      const newState = actions[name](state, ...args);

      setState(newState);
    };
  });

  return {
    getState,
    setState,
    update,
    subscribe,
    ...storeActions,
  };
}

export { createStore };
