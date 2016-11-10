import { Routes, RouterModule } from '@angular/router';

import { EstadisticasEncuestaComponent } from '../../components/encuesta/estadisticasEncuesta.component';
import { ListadoEncuestaComponent } from '../../components/encuesta/listadoEncuesta.component';

export const routes: Routes = [
    { path: 'encuestas/listado', component: ListadoEncuestaComponent },
    { path: 'encuestas/estadisticas/:id', component: EstadisticasEncuestaComponent },
];

export const routing = RouterModule.forChild(routes);