export interface Registry {
  unregister: () => void;
}

export interface Callable {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [key: string]: Function;
}

export interface Subscriber {
  [key: string]: Callable;
}

export interface IEventBus {
  dispatch<T>(event: string, arg?: T): void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  register(event: string, callback: Function): Registry;
}

export class EventBus implements IEventBus {
  private subscribers: Subscriber;
  private static nextId = 0;
  private static instance?: EventBus = undefined;

  private constructor() {
    this.subscribers = {};
  }

  public static getInstance(): EventBus {
    if (this.instance === undefined) {
      this.instance = new EventBus();
    }

    return this.instance;
  }

  public dispatch<T>(event: string, arg?: T): void {
    const subscriber = this.subscribers[event];

    if (subscriber === undefined) {
      return;
    }

    Object.keys(subscriber).forEach((key) => subscriber[key](arg));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public register(event: string, callback: Function): Registry {
    const id = this.getNextId();
    if (!this.subscribers[event]) this.subscribers[event] = {};

    this.subscribers[event][id] = callback;

    return {
      unregister: () => {
        if (this.subscribers[event] === undefined) {
          return;
        }

        delete this.subscribers[event][id];
        if (Object.keys(this.subscribers[event]).length === 0) delete this.subscribers[event];
      },
    };
  }

  private getNextId(): number {
    return EventBus.nextId++;
  }
}
