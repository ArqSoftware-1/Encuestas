import { Routes, RouterModule } from '@angular/router';

import { RespuestaEncuestaComponent } from '../../components/respuestaEncuesta/respuestaEncuesta.component';
import { AsignarAlumnoComponent } from '../../components/respuestaEncuesta/asignarAlumno.component';

export const routes: Routes = [
    { path: 'respuesta-encuesta/:token', component: RespuestaEncuestaComponent },
    { path: 'asignar/alumno/:idEncuesta', component: AsignarAlumnoComponent }
];

export const routing = RouterModule.forChild(routes);