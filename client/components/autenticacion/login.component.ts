import { Component } from '@angular/core';
import { LoginService } from "../../service/autenticacion/login.service";
import { ApiService } from "../../service/api.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from "@angular/http";

@Component({
  selector: 'login',
  templateUrl: 'client/components/autenticacion/login.component.html',
  providers: [LoginService]
 
})
export class LoginComponent {
    user: any = {
        email: "",
        password: ""
    };
    route: Router;
    loginService: LoginService;

    constructor(private http: Http, loginService:LoginService, route: Router){
        this.route = route;
        this.loginService = loginService;
        if(localStorage.getItem("id_token")){
            this.route.navigate(['encuestas/listado']);
        }
    }

    login() {
        this.loginService.login({ password: this.user.password, email: this.user.email },
                            (res: Response) => {
                                location.reload(); 
                            });
    }

    /*signup() {
        this.http.post("/login/signup", JSON.stringify({ password: this.user.password, username: this.user.username }), new RequestOptions({
            headers: new Headers({"Content-Type": "application/json"})
        }))
            .map((res: any) => res.json())
            .subscribe(
                (res: Response) => {
                    this.response = res;
                },
                (error: Error) => { console.log(error); }
            );
    }*/


}
