import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule, MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule, MatToolbarModule
} from '@angular/material'

import { environment } from '../environments/environment'

import { CoreModule } from './core/core.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AccountComponent } from './routes/account/account.component'
import { LoginComponent } from './routes/account/login/login.component'
import { RegisterComponent } from './routes/account/register/register.component'
import { HomeComponent } from './routes/home/home.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NavbarComponent } from './components/navbar/navbar.component'
import { FooterComponent } from './components/footer/footer.component'
import { NotificationService } from './core/services/notification.service'
import { PipesModule } from './components/pipes/pipes.module'
import { DisableControlDirective } from './components/directives/disable-control'
import { FocusDirective } from './components/directives/focus.directive';
import { InvitationComponent } from './routes/invitation/invitation.component'

@NgModule({
  declarations: [
    AccountComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    DisableControlDirective,
    FocusDirective,
    InvitationComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    PipesModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
