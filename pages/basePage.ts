import {Page, expect} from "@playwright/test"

export class basePage{
    protected readonly page:Page

    constructor(page:Page){
        this.page = page
    }

    //Function to open the web page, and will receive the address as a parameter
    async loadWeb(url: string){
        await this.page.goto(url)
    }

    //Function that will be used whenever a click action is needed
    async clickOn(selector: string){
        await this.page.click(selector)
    }

    //Function used to fill out a form
    async fillField(selector: string, value:string){
        await this.page.locator(selector).fill(value)
    }

    //Function to select an element from a select drop down
    async selectOpt(selector: string, value:string){
        await this.page.locator(selector).selectOption(value)
    }

    //Function to have an assertion
    async expectVisible(selector:string){
        await expect(this.page.locator(selector)).toBeVisible()
    }

}