import EventHandler from "../../../shared/event/event-handler.interface";
import CustomerAddressChanged from "../customer-address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandler<CustomerAddressChanged> {

  public handle(event: CustomerAddressChanged): void {
    const customer = event.data;
    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address?.toString() ?? 'null'}`);
  }

}
