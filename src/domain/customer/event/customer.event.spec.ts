import EventDispatcherImpl from "../../shared/event/event-dispatcher.impl";
import Address from "../address.value-object";
import Customer from "../customer.entity";
import CustomerAddressChanged from "./customer-address-changed.event";
import CustomerCreated from "./customer-created.event";
import EnviaConsoleLog1Handler from "../../shared/event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../shared/event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../../shared/event/handler/envia-console-log.handler";

describe('Customer Events', () => {

  const eventDispatcher = new EventDispatcherImpl();
  eventDispatcher.register(CustomerCreated, new EnviaConsoleLog1Handler());
  eventDispatcher.register(CustomerCreated, new EnviaConsoleLog2Handler());
  eventDispatcher.register(CustomerAddressChanged, new EnviaConsoleLogHandler());

  it('should notify all customer event handlers.', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const customer = new Customer('id', 'name');
    eventDispatcher.notify(new CustomerCreated(customer));
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, 'Esse é o primeiro console.log do evento: CustomerCreated');
    expect(consoleLogSpy).toHaveBeenNthCalledWith(2, 'Esse é o segundo console.log do evento: CustomerCreated');
    customer.addOrChangeAddress(new Address('street', 10, 'zip', 'city'));
    eventDispatcher.notify(new CustomerAddressChanged(customer));
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address!.toString()}`);
  });

});
