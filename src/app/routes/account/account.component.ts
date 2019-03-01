import { Component, OnInit, OnDestroy } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Subject, Observable } from 'rxjs'
import { takeUntil, map } from 'rxjs/operators'
import * as firebase from 'firebase'

import { AuthService } from 'src/app/core/auth.service'
import { User, Profile } from 'src/app/models/user'
import { ProfileService } from 'src/app/core/profile.service'

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  form: FormGroup
  user: User
  profileQuery: Observable<Profile[]>
  newProfile = {
    addtional: 0,
    over21: false
  } as Profile

  constructor(
    private afAuth: AngularFireAuth,
    public auth: AuthService,
    public profileService: ProfileService,
    private router: Router,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe((_user) => {
      if (_user && _user.uid) {
        this.user = _user
        this.profileQuery = this.profileService.getUserProfile(_user.uid).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Profile;
            const id = a.payload.doc.id;
            return { id, ...data };
          })))
      } else {
        this.router.navigate(['/account/login']);
      }
    })
  }

  displayDate(dateTime) {
    return (new Date(dateTime)).toDateString()
  }

  onSave() {
    this.newProfile.user_uid = this.user.uid
    this.newProfile.acceptDate = new Date().getTime()
    this.profileService.addProfile(this.newProfile)
  }

  signout() {
    const that = this;
    this.afAuth.auth.signOut().then(function () {
      that.router.navigate(['/home']);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
