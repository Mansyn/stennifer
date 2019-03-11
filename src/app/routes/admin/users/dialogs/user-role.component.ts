import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Inject, Component, OnInit } from '@angular/core'
import { UserProfile } from 'src/app/models/user';

@Component({
  selector: 'user-role-dialog',
  template: `<h1 mat-dialog-title>
                <span *ngIf="data.add">Add Role</span>
                <span *ngIf="!data.add">Remove Role</span>
                </h1>
             <div mat-dialog-content>
               <p *ngIf="data.add">Are you sure you want to set {{names}} to {{data.role}}?</p>
               <p *ngIf="!data.add">Are you sure you want to remove {{names}} from {{data.role}}?</p>
             </div>
             <div mat-dialog-actions align="end">
               <button mat-raised-button [mat-dialog-close]="true" cdkFocusInitial>Ok</button>
               <button mat-button [mat-dialog-close]="false">Cancel</button>
             </div>`
})
export class UserRoleDialog implements OnInit {

  users: UserProfile[]
  names: string

  constructor(public dialogRef: MatDialogRef<UserRoleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.users = data.users
    this.names = ''
  }

  ngOnInit() {
    this.names = this.users.map((user) => {
      return user.displayName
    }).join(', ')
  }
}