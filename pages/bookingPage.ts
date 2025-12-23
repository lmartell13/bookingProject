import { basePage } from "./basePage";
import { bookingLocators } from "./locators/bookings";
import {Page, expect, Locator} from "@playwright/test";

export class bookingPage extends basePage {
    
    private readonly fromPort: Locator;
    private readonly toPort: Locator;
    private readonly submitButton: Locator;
    private readonly inputName: Locator;
    private readonly findFlights: Locator;
    private readonly address: Locator;
    private readonly city: Locator;
    private readonly state: Locator;
    private readonly zipCode: Locator;
    private readonly creditCard: Locator;
    private readonly cardNumber: Locator;
    private readonly cardName: Locator;
    private readonly finalMessage: Locator;

    constructor(page: Page){
        super(page);

        this.fromPort = page.locator(bookingLocators.fromPort);
        this.toPort = page.locator(bookingLocators.toPort);
        this.submitButton = page.locator(bookingLocators.submitButton);
        this.inputName = page.locator(bookingLocators.inputName);
        this.findFlights = page.locator(bookingLocators.findFlights);
        this.address = page.locator(bookingLocators.address);
        this.city = page.locator(bookingLocators.city);
        this.state = page.locator(bookingLocators.state);
        this.zipCode = page.locator(bookingLocators.zipCode);
        this.creditCard = page.locator(bookingLocators.creditCard);
        this.cardNumber = page.locator(bookingLocators.cardNumber);
        this.cardName = page.locator(bookingLocators.cardName);
        this.finalMessage = page.locator(bookingLocators.finalMessage);

    }

    async selectDestiny(){
        await this.selectOpt(bookingLocators.fromPort, "Paris")
        await this.selectOpt(bookingLocators.toPort, "Buenos Aires")
        await this.clickOn(bookingLocators.submitButton)
        await this.clickOn(bookingLocators.findFlights)

    }

    async fillPersonalInfo(){
        await this.fillField(bookingLocators.inputName, "Testing User");
        await this.fillField(bookingLocators.address, "123 Testing Av");
        await this.fillField(bookingLocators.city, "San Salvador");
        await this.fillField(bookingLocators.state, "San Salvador");
        await this.fillField(bookingLocators.zipCode, "1234");
        await this.selectOpt(bookingLocators.creditCard, "Visa");
        await this.fillField(bookingLocators.cardNumber, "123456789");
        await this.fillField(bookingLocators.cardName, "Testing User");
        await this.clickOn(bookingLocators.submitButton)

    }

    async bookingConfirmation(){
        await this.expectVisible(bookingLocators.finalMessage)
    }
  

}
