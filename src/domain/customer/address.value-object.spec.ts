import Address from "./address.value-object";

const EMPTY = '';

describe('Address', () => {

  let validAddress: Address;
  const validStreet = 'street';
  const validNumber = 10;
  const validZip = 'zip';
  const validCity = 'city';
  const validAddressString = 'street, 10, zip city';

  beforeEach(() => {
    validAddress = new Address(validStreet, validNumber, validZip, validCity);
  });

  it('should assign the street parameter to the street atribute when creating a new valid address.', () => {
    expect(validAddress.street).toBe(validStreet);
  });

  it('should assign the number parameter to the number atribute when creating a new valid address.', () => {
    expect(validAddress.number).toBe(validNumber);
  });

  it('should assign the zip parameter to the zip atribute when creating a new valid address.', () => {
    expect(validAddress.zip).toBe(validZip);
  });

  it('should assign the city parameter to the city atribute when creating a new valid address.', () => {
    expect(validAddress.city).toBe(validCity);
  });

  it('should throw error when creating a new address with an invalid street.', () => {
    expect(() => new Address(EMPTY, validNumber, validZip, validCity)).toThrow('Street is required.');
  });

  it('should throw error when creating a new address with an invalid number.', () => {
    expect(() => new Address(validStreet, -1, validZip, validCity)).toThrow('Number must be greater than or equal to 0.');
  });

  it('should throw error when creating a new address with an invalid zip.', () => {
    expect(() => new Address(validStreet, validNumber, EMPTY, validCity)).toThrow('Zip is required.');
  });

  it('should throw error when creating a new address with an invalid city.', () => {
    expect(() => new Address(validStreet, validNumber, validZip, EMPTY)).toThrow('City is required.');
  });

  it('should generate the correct address string when calling toString.', () => {
    expect(validAddress.toString()).toBe(validAddressString);
  });

});
