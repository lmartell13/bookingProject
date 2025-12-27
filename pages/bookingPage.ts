import { basePage } from "./basePage";
import { bookingLocators } from "./locators/bookings";
import test, {Page, expect, Locator} from "@playwright/test";

export class bookingPage extends basePage {
    //Will be used to stored the locators from basePage
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
        //Assigning every locator from basePage
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
        //Selecting a destination
        await this.selectOpt(bookingLocators.fromPort, "Paris")
        await this.selectOpt(bookingLocators.toPort, "Buenos Aires")
        await this.clickOn(bookingLocators.submitButton)
        //await this.clickOn(bookingLocators.findFlights)

    }

    async fillPersonalInfo(){
        //Sending the data to every input in the form
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
        //Assertion to validate the correct flow
        await this.expectVisible(bookingLocators.finalMessage)
    }

    // ---Method to select a flight only if price is greater than 500 ---

    async selectFlightByPrice(minPrice: number) {
        const rows = this.page.locator(bookingLocators.flightRows);
        const rowCount = await rows.count();
        let wasFlightFound = false;

        for (let i = 0; i < rowCount; i++) {
            const currentRow = rows.nth(i);
            const priceRawText = await currentRow.locator(bookingLocators.priceColumn).innerText();
            
            // Converting currency text (e.g. "$765.32") to a numeric value
            const numericPrice = parseFloat(priceRawText.replace('$', ''));

            // IF statement to check the price condition
            if (numericPrice > minPrice) {
                console.log(`Matching flight was found, the price is: $${numericPrice}. \nProceeding...`);
                await currentRow.locator(bookingLocators.selectFlightBtn).click();
                wasFlightFound = true;
                break; // Exit the loop as soon as we find a match
            } 
        }

        // Final check if no flight matched the IF condition
        if (!wasFlightFound) {
            // This will stop the execution immediately and mark the test as "Skipped"
            test.skip(true, `No flights were found with a price higher than ${minPrice}`);
        }
    }

    // ---Method to select a flight based on arrival ---
    async selectFlightByTime(minTime: number) {
        const rows = this.page.locator(bookingLocators.flightRows);
        const rowCount = await rows.count();
        let wasFlightFound = false;

        for (let i = 0; i < rowCount; i++) {
            const currentRow = rows.nth(i);
            const timeRawText = await currentRow.locator(bookingLocators.timeColumn).innerText();
            
            // Converting currency text (e.g. "$765.32") to a numeric value
            const numericTime = parseFloat(timeRawText.replace(':', '').replace('PM',''));
            

            // IF statement to check the price condition
            if (numericTime > minTime) {
                console.log(`Matching flight was found, the estimated time of arrival is: ${timeRawText}. \nProceeding...`);
                await currentRow.locator(bookingLocators.selectFlightBtn).click();
                wasFlightFound = true;
                break; // Exit the loop as soon as we find a match
            } 
        }

        // Final check if no flight matched the IF condition
        if (!wasFlightFound) {
            // This will stop the execution immediately and mark the test as "Skipped"
            test.skip(true, 'No flights were found for the specified time');
        }
    }
}
