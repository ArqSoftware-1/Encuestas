import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class LoginService {

    private isLoggedInSubject: BehaviorSubject < boolean > ;

    constructor(private http: Http) {
        this.isLoggedInSubject = new BehaviorSubject(this.checkIsLoggedIn());
    }

    get loggedInObservable() {
        return this.isLoggedInSubject.asObservable();
    }

    checkIsLoggedIn() {
        let isLoggedIn = false;
        try {
            isLoggedIn = tokenNotExpired();
        } catch (e) {

        }
        return isLoggedIn;
    }

    logOut() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("email");
        this.isLoggedInSubject.next(this.checkIsLoggedIn());
    }

    login(data, cbSuccess = null) {

        this.http.post("/login", JSON.stringify(data), new RequestOptions({
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            }))
            .map((res: Response) => res.json())
            .subscribe(
                (res: Response & {
                    jwt: string,
                    message: string
                }) => {
                    if (res.jwt) {
                        localStorage.setItem("id_token", res.jwt);
                        this.isLoggedInSubject.next(this.checkIsLoggedIn());
                        cbSuccess(res);
                    } else {
                        alert(res.message);
                    }
                }, (error: Error) => {
                    alert("Se ha producido un error al conectar con el servidor");
                    console.log(error)
                }
            );
    }

}