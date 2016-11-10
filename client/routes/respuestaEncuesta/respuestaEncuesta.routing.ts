import { Routes, RouterModule } from '@angular/router';

import { RespuestaEncuestaComponent } from '../../components/respuestaEncuesta/respuestaEncuesta.component';

export const routes: Routes = [
    { path: 'respuesta-encuesta/:token', component: RespuestaEncuestaComponent }
];

export const routing = RouterModule.forChild(routes);