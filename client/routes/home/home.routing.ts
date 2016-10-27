import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent }
];

export const routing = RouterModule.forChild(routes);