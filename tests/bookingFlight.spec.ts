import {test, expect} from '@playwright/test'
import { bookingPage } from '../pages/bookingPage';
import { basePage } from '../pages/basePage';

test('Booking flight', async({page}) => {
    const bookings = new bookingPage(page);
    const base = new basePage(page);

    //Open the website and sending the url to the loadweb function
    await base.loadWeb("https://blazedemo.com/index.php")

    //Select destiny
    await bookings.selectDestiny();

    //Filling booking form
    await bookings.fillPersonalInfo();

    //Final assertion
    await bookings.bookingConfirmation();




})