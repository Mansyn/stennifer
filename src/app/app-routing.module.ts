import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './routes/home/home.component'
import { AccountComponent } from './routes/account/account.component'
import { LoginComponent } from './routes/account/login/login.component'
import { RegisterComponent } from './routes/account/register/register.component'
import { InvitationComponent } from './routes/invitation/invitation.component'
import { AccommodationsComponent } from './routes/accommodations/accommodations.component'
import { PhotosComponent } from './routes/photos/photos.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'invitation', component: InvitationComponent },
  { path: 'accommodations', component: AccommodationsComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'admin', loadChildren: './routes/admin/admin.module#AdminModule' },
  { path: '*', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
