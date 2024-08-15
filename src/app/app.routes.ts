import { Routes } from '@angular/router';
import { UserDetailsComponent } from '@components/user-list/user-details/user-details.component';
import { UserListComponent } from '@components/user-list/user-list.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];
