import { Routes, RouterModule } from '@angular/router';

import { ListadoMateriaComponent } from '../../components/listadoMateria/listadoMateria.component';

export const routes: Routes = [
    { path: 'materias/listado', component: ListadoMateriaComponent }
];

export const routing = RouterModule.forChild(routes);