import { Component } from '@angular/core'
import { AuthService } from 'src/app/core/auth.service'
import * as _ from 'lodash'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
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
