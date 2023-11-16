import CustomerCreated from "../customer-created.event";
import EventHandler from "../../../shared/event/event-handler.interface";

export default class EnviaConsoleLog1Handler implements EventHandler<CustomerCreated> {

  public handle(event: CustomerCreated): void {
    console.log(`Esse é o primeiro console.log do evento: ${event.constructor.name}`);
  }

}
