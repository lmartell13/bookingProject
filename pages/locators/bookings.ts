//List of locators to be used
export const bookingLocators = {
    fromPort:  'select[name="fromPort"]',
    toPort: 'select[name="toPort"]',
    submitButton: 'input[type="submit"]',
    inputName: 'input[id="inputName"]',
    findFlights: '//tr[1]/td[1]/input',
    address: 'input[id="address"]',
    city: 'input[id="city"]',
    state: 'input[id="state"]',
    zipCode: 'input[id="zipCode"]',
    creditCard: '#cardType',
    cardNumber: 'input[id="creditCardNumber"]',
    cardName: 'input[id="nameOnCard"]',
    finalMessage: '//h1[text()="Thank you for your purchase today!"]',
    
    // New locators for price filtering
    flightRows: 'table.table tbody tr',
    priceColumn: 'td:nth-child(7)',
    timeColumn: 'td:nth-child(6)',  
    selectFlightBtn: 'input[type="submit"]'
}

