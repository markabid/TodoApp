import { Component } from "@angular/core";
import { Page } from "ui/page";
import { Router } from "@angular/router";

@Component({
  selector: "my-app",
  template: `
  <Page class="pagec">
    <StackLayout>
        <Label class="start" text="Todo.me"></Label>
        <Button text="GET STARTED" class="submit-button" (tap)="submit()"></Button>
    </StackLayout>
  </Page>
  `,
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent {
    constructor(private page: Page, private router: Router) {
        //page.backgroundImage = 'http://www.mulierchile.com/hd-mobile-nature-wallpapers/hd-mobile-nature-wallpapers-014.jpg';
        page.actionBarHidden = true;
    }

    submit() {
        this.router.navigate(["/list"])
    }  
}