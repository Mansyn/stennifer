import { Component } from '@angular/core'
import { Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth.service'
import { takeUntil } from 'rxjs/operators'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  destroy$: Subject<boolean> = new Subject<boolean>()

  canEdit: boolean
  canDelete: boolean

  constructor(public auth: AuthService) {
    this.canEdit = false
    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user && user.uid) {
        this.canEdit = this.auth.canEdit(user)
        this.canDelete = this.auth.canDelete(user)
      }
    })
  }
}
