import {test, expect} from '@playwright/test'
import { bookingPage } from '../pages/bookingPage';
import { basePage } from '../pages/basePage';

test('Booking a flight based on price', async({page}) => {
    const bookings = new bookingPage(page);
    const base = new basePage(page);

    //Open the website and sending the url to the loadweb function
    await base.loadWeb("https://blazedemo.com/index.php")

    //Select destiny
    await bookings.selectDestiny();
    
    // Selecting a flight only if price is greater than 500 using If/Else
    await bookings.selectFlightByPrice(500);

    //Filling booking form
    await bookings.fillPersonalInfo();

    //Final assertion
    await bookings.bookingConfirmation();

})

test('Booking a flight based on arrival time', async({page}) => {
    const bookings = new bookingPage(page);
    const base = new basePage(page);

    //Open the website and sending the url to the loadweb function
    await base.loadWeb("https://blazedemo.com/index.php")

    //Select destiny
    await bookings.selectDestiny();
    
    // Selecting a flight only if price is greater than 500 using If/Else
    await bookings.selectFlightByTime(900);

    //Filling booking form
    await bookings.fillPersonalInfo();

    //Final assertion
    await bookings.bookingConfirmation();

})