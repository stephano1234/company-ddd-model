import EventHandler from "../event-handler.interface";
import Event from "../event.interface";
import CustomerAddressChanged from "../../../customer/event/customer-address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandler {

  public handle(event: Event): void {
    if (event instanceof CustomerAddressChanged) {
      const customer = event.data;
      console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address?.toString() ?? 'null'}`);
    }
  }

}
