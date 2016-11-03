import { Component } from "@angular/core";
import { ApiService } from "../../service/api.service";

@Component({
    selector: "encuesta",
    templateUrl: `client/components/respuestaEncuesta/respuestaEncuesta.component.html`
})
export class RespuestaEncuestaComponent {
    error: string;
    response: {};

    constructor(private apiService: ApiService) {}

    protected() {
        this.apiService
            .get("/api")
            .subscribe(
                (data) => { this.response = data; },
                (error: Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }
}
