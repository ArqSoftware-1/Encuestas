import { Routes, RouterModule } from '@angular/router';

import { DirectorComponent } from '../../components/director/director.component';

export const routes: Routes = [
    { path: 'director/crear', component: DirectorComponent }
];

export const routing = RouterModule.forChild(routes);