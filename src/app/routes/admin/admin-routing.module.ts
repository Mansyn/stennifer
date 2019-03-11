import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AdminComponent } from './admin.component'
import { UsersComponent } from './users/users.component'
import { GuestsComponent } from './guests/guests.component'
import { AdminGuard } from 'src/app/core/admin.guard'
import { EditorGuard } from 'src/app/core/editor.guard'

const routes: Routes = [
    { path: '', component: AdminComponent, canActivate: [EditorGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AdminGuard] },
    { path: 'guests', component: GuestsComponent, canActivate: [EditorGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
