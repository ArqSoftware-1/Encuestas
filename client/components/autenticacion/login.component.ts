import { Component } from '@angular/core';
import { LoginService } from "../../service/autenticacion/login.service";
import { ApiService } from "../../service/api.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'materias',
  templateUrl: 'client/components/autenticacion/login.component.html',
  providers: [LoginService]
 
})
export class LoginComponent {


	constructor(loginService:LoginService, route: ActivatedRoute){

	}


}
