import EventHandler from "../event-handler.interface";
import Event from "../event.interface";

export default class EnviaConsoleLog2Handler implements EventHandler {

  public handle(event: Event): void {
    console.log(`Esse é o segundo console.log do evento: ${event.constructor.name}`);
  }

}
