import { Component, Input } from "@angular/core";

@Component({
    selector: "titulo",
    template: `<h2>{{nombre}}</h2>`
})
export class TituloComponent {
    @Input() nombre: string;
}
