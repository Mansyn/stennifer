import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { AuthService } from 'src/app/core/auth.service'
import { Subject, combineLatest } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material'

import { UserProfile } from 'src/app/models/user'
import { SelectionModel } from '@angular/cdk/collections'
import { UserRoleDialog } from './dialogs/user-role.component'
import { ProfileService } from 'src/app/core/profile.service'
import UserUtils from 'src/app/models/user.utils'

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>()

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  displayedColumns = ['select', 'name', 'email', 'phoneNumber', 'roles']
  dataSource = new MatTableDataSource<UserProfile>()
  selection = new SelectionModel<UserProfile>(true, [])

  userProfiles: UserProfile[]

  constructor(
    public auth: AuthService,
    private profileService: ProfileService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    const users$ = this.auth.getAllUsers()
    const profiles$ = this.profileService.getProfiles()

    combineLatest(users$, profiles$, (_users, _profiles) => {
      this.userProfiles = []
      for (let _user of _users) {
        let _profile = _profiles.find(p => p.user_uid == _user.uid)
        let userProfile = UserUtils.mapToUserProfile(_user, _profile)
        if (userProfile) {
          this.userProfiles.push(userProfile)
        }
      }
      this.dataSource.data = this.userProfiles
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe()

    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected === numRows
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row))
  }

  isRole(role: string) {
    let found = false
    switch (role) {
      case 'admin':
        found = this.selection.selected[0].roles.admin
        break
      case 'editor':
        found = this.selection.selected[0].roles.editor
        break
    }
    return found
  }

  roleDialog(add: boolean, role: string): void {
    const targets = this.selection.selected

    const dialogRef = this.dialog.open(UserRoleDialog, {
      width: '350px',
      data: { add: add, role: role, users: targets }
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        targets.forEach((target) => {
          if (role === 'admin') {
            this.auth.setUserAdmin(target, add);
            this.openSnackBar(
              add ? target.displayName + ' set to admin' : target.displayName + ' removed from admin',
              'OKAY'
            )
          } else if (role === 'editor') {
            this.auth.setUserEditor(target, add);
            this.openSnackBar(
              add ? target.displayName + ' set to editor' : target.displayName + ' removed from editor',
              'OKAY'
            )
          }
        })
        this.selection.clear()
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}