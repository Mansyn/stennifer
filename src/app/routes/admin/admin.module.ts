import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularFireStorageModule } from '@angular/fire/storage'

// app
import { AdminRoutingModule } from './admin-routing.module'
import { PipesModule } from 'src/app/components/pipes/pipes.module'
import { AdminComponent } from './admin.component'
import { UsersComponent } from './users/users.component'
import { UserPhoneDialog } from './users/users.component'
import { UserRoleDialog } from './users/dialogs/user-role.component'
import { GuestsComponent } from './guests/guests.component'

@NgModule({
  imports: [
    AdminRoutingModule,
    AngularFireStorageModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    PipesModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
    UserRoleDialog,
    UserPhoneDialog,
    GuestsComponent
  ],
  entryComponents: [
    UserPhoneDialog,
    UserRoleDialog
  ]
})
export class AdminModule { }
