import Event from "./event.interface";
import EventDispatcher from "./event-dispatcher.interface";
import EventDispatcherImpl from "./event-dispatcher.impl";
import EventHandler from "./event-handler.interface";

class MockEvent extends Event {
  constructor(
    mockData: { prop1: string, prop2: number },
  ) {
    super(mockData);
  }
}

class MockEventHandler implements EventHandler<MockEvent> {
  public handle(event: MockEvent): void {
    console.log('Handling event...');
    console.log(`Created at ${event.timeCreated}.`);
    console.log('Event data:');
    console.log(`${JSON.stringify(event.data)}`);
  }
}

describe('Event Dispatcher', () => {

  let eventDispatcher: EventDispatcher;
  const eventHandler = new MockEventHandler();

  beforeEach(() => {
    eventDispatcher = new EventDispatcherImpl();
  });

  it('should register an event handler.', () => {
    eventDispatcher.register(MockEvent, eventHandler);
    expect(eventDispatcher.getEventHandlers(MockEvent)).toBeDefined();
    expect(eventDispatcher.getEventHandlers(MockEvent)!.length).toBe(1);
    expect(eventDispatcher.getEventHandlers(MockEvent)![0]).toBe(eventHandler);
  });

  it('should unregister an event handler.', () => {
    eventDispatcher.register(MockEvent, eventHandler);
    class OtherEventHandlerMock implements EventHandler<MockEvent> {
      public handle(_: MockEvent): void { }
    }
    eventDispatcher.register(MockEvent, new OtherEventHandlerMock());
    eventDispatcher.unregisterHandlerByEvent(MockEvent, eventHandler);
    expect(eventDispatcher.getEventHandlers(MockEvent)).toBeDefined();
    expect(eventDispatcher.getEventHandlers(MockEvent)!.length).toBe(1);
    expect(eventDispatcher.getEventHandlers(MockEvent)!.includes(eventHandler)).toBe(false);
  });

  it('should unregister all event handlers of an event.', () => {
    eventDispatcher.register(MockEvent, eventHandler);
    class OtherEventHandlerMock implements EventHandler<MockEvent> {
      public handle(_: MockEvent): void { }
    }
    eventDispatcher.register(MockEvent, new OtherEventHandlerMock());
    eventDispatcher.unregisterAllByEvent(MockEvent);
    expect(eventDispatcher.getEventHandlers(MockEvent)).toBeDefined();
    expect(eventDispatcher.getEventHandlers(MockEvent)!.length).toBe(0);
  });

  it('should unregister all event handlers of all events.', () => {
    eventDispatcher.register(MockEvent, eventHandler);
    class OtherEventHandlerMock implements EventHandler {
      public handle(_: Event): void { }
    }
    eventDispatcher.register(Event, new OtherEventHandlerMock());
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers(MockEvent)).toBeUndefined();
    expect(eventDispatcher.getEventHandlers(Event)).toBeUndefined();
  });

  it('should notify all event handlers.', () => {
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');
    eventDispatcher.register(MockEvent, eventHandler);
    eventDispatcher.notify(new MockEvent({ prop1: 'text', prop2: 10 }));
    expect(spyEventHandler).toHaveBeenCalled();
  });

});
