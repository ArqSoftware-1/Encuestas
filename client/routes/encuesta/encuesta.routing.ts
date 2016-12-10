import { Routes, RouterModule } from '@angular/router';

import { EstadisticasEncuestaComponent } from '../../components/encuesta/estadisticasEncuesta.component';
import { ListadoEncuestaComponent } from '../../components/encuesta/listadoEncuesta.component';
import { MateriasPublicadasEncuestaComponent } from '../../components/encuesta/materiasPublicadasEncuesta.component';

export const routes: Routes = [
    { path: 'encuestas/listado', component: ListadoEncuestaComponent },
    { path: 'encuestas/estadisticas/:id', component: EstadisticasEncuestaComponent },
    { path: 'encuestas/materias-publicadas/:id', component: MateriasPublicadasEncuestaComponent },
];

export const routing = RouterModule.forChild(routes);