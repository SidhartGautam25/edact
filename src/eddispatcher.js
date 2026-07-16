class Dispatcher {
  constructor() {
    this.handlers = {};
  }

  subscribe(command, handler) {
    if (!this.handlers[command]) {
      this.handlers[command] = [];
    }

    this.handlers[command].push(handler);
  }

  dispatch(command, payload) {
    const handlers = this.handlers[command] || [];

    handlers.forEach((handler) => {
      handler(payload);
    });
  }
}

export { Dispatcher };
