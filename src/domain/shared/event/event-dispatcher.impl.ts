import Event from "./event.interface";
import EventDispatcher from "./event-dispatcher.interface";
import EventHandler from "./event-handler.interface";

export default class EventDispatcherImpl implements EventDispatcher {

  private eventHandlers: { [event: string]: EventHandler[] } = {};

  public notify(event: Event): void {
    const handlers = this.eventHandlers[event.constructor.name] ?? [];
    handlers.forEach(handler => handler.handle(event));
  }

  public register(event: new (...args: any) => Event, handler: EventHandler<Event>): void {
    !this.eventHandlers[event.name] && (this.eventHandlers[event.name] = []);
    this.eventHandlers[event.name]!.push(handler);
  }

  public unregisterHandlerByEvent(event: new (...args: any) => Event, handler: EventHandler<Event>): void {
    if (this.eventHandlers[event.name]) {
      const index = this.eventHandlers[event.name]!.indexOf(handler);
      index !== -1 && this.eventHandlers[event.name]!.splice(index, 1);
    }
  }

  public unregisterAllByEvent(event: new (...args: any) => Event): void {
    this.eventHandlers[event.name] && (this.eventHandlers[event.name] = []);
  }

  public unregisterAll(): void {
    this.eventHandlers = {};
  }

  public getEventHandlers(event: new (...args: any) => Event): EventHandler<Event>[] | undefined {
    return this.eventHandlers[event.name];
  }

}
