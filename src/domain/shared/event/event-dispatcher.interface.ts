import Event from "./event.interface";
import EventHandler from "./event-handler.interface";

export default interface EventDispatcher {

  notify(event: Event): void;
  register(event: new (...args: any) => Event, handler: EventHandler): void;
  unregisterHandlerByEvent(event: new (...args: any) => Event, handler: EventHandler): void;
  unregisterAllByEvent(event: new (...args: any) => Event): void;
  unregisterAll(): void;
  getEventHandlers(event: new (...args: any) => Event): EventHandler[] | undefined;

}
