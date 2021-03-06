import { Component, ViewChild } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { SemanticPopupComponent } from "ng-semantic";
import "rxjs/add/operator/map";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from "./service/autenticacion/login.service";

@Component({
    selector: "app",
    templateUrl: "client/app.component.html",
    providers: [LoginService]
})
export class AppComponent {
    nombreApp: string = "Encuestas - UNQ";
    user: any = {
        password: "1234",
        username: "Fernando"
    };
    route: Router;
    loginService: LoginService;
    loginSub;

    isLogged: boolean;
    response: Response & {
        hashed ? : string, salt ? : string
    };@
    ViewChild("myPopup") myPopup: SemanticPopupComponent;

    constructor(private http: Http, route: Router, loginService: LoginService) {
        this.isLogged = !!localStorage.getItem("id_token");
        this.loginService = loginService;
        this.route = route;
    }

    logout(): void {
        this.loginService.logOut();
        this.route.navigate(['login']);
    }

    ngOnInit() {
        this.loginSub = this.loginService.loggedInObservable.subscribe(val => {
            this.isLogged = val;
        });
    }

}