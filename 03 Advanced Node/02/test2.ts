/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from "events";

// Define the event types and their argument types
interface MyEvents extends Record<string, any[]> {
  "event-1": [];
  "event-2": [number, string];
}

// Create a typed wrapper class around EventEmitter
class TypedEventEmitter<TEvents extends Record<string, any[]>> {
  private emitter = new EventEmitter();

  emit<TEvent extends keyof TEvents>(eventName: TEvent, ...args: TEvents[TEvent]) {
    this.emitter.emit(eventName as string, ...args);
  }

  on<TEvent extends keyof TEvents>(eventName: TEvent, listener: (...args: TEvents[TEvent]) => void) {
    this.emitter.on(eventName as string, listener);
  }

  off<TEvent extends keyof TEvents>(eventName: TEvent, listener: (...args: TEvents[TEvent]) => void) {
    this.emitter.off(eventName as string, listener);
  }
}

// Usage example
const myEmitter = new TypedEventEmitter<MyEvents>();

myEmitter.on("event-1", () => {
  console.log("event-1 triggered");
});

myEmitter.on("event-2", (num, str) => {
  console.log(`event-2 triggered with args: ${num}, ${str}`);
});

myEmitter.emit("event-1");
myEmitter.emit("event-2", 42, "hello");
