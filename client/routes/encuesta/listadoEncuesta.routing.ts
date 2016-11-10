import { Routes, RouterModule } from '@angular/router';

import { ListadoEncuestaComponent } from '../../components/encuesta/listadoEncuesta.component';

export const routes: Routes = [
    { path: 'listado-encuesta', component: ListadoEncuestaComponent }
];

export const routing = RouterModule.forChild(routes);