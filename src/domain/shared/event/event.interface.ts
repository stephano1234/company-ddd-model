export default class Event<T = any> {

  public timeCreated = new Date();

  constructor(public data: T) { }

}
