import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from './auth.service'
import { AdminGuard } from './admin.guard'
import { EditorGuard } from './editor.guard'
import { CanReadGuard } from './can-read.guard'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService, AdminGuard, EditorGuard, CanReadGuard]
})
export class CoreModule { }
