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

@NgModule({
  imports: [
    AdminRoutingModule,
    AngularFireStorageModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
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
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule { }
