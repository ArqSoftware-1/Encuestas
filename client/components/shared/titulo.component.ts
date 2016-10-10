import { Component, Input } from "@angular/core";

@Component({
    selector: "titulo",
    template: `<h2 class="ui header divided">{{nombre}}</h2>`
})
export class TituloComponent {
    @Input() nombre: string;
}
