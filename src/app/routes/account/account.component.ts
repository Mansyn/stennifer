import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'
import { FormGroup } from '@angular/forms'
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'

import { Subject, combineLatest } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import * as moment from 'moment'

import { AuthService } from 'src/app/core/auth.service'
import { Profile, UserProfile, User } from 'src/app/models/user'
import { ProfileService } from 'src/app/core/profile.service'

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class AccountComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>()

  form: FormGroup
  newProfile = {
    additional: 0,
    acceptDate: -1
  }
  userRef: User
  phoneNumberRef = ''
  emailRef = ''
  nameRef = ''

  profile: Profile = { uid: '', user_uid: '', additional: -1, acceptDate: -1, birthday: '' }
  userprofile: UserProfile

  constructor(
    private afAuth: AngularFireAuth,
    public auth: AuthService,
    public profileService: ProfileService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const user$ = this.auth.user$
    const profiles$ = this.profileService.getProfiles()

    combineLatest(user$, profiles$, (_user, _profiles) => {

      if (_user && _user.uid) {

        this.userprofile = {
          uid: _user.uid,
          email: _user.email,
          displayName: _user.displayName,
          phoneNumber: _user.phoneNumber,
          photoURL: _user.photoURL,
          additional: 0,
          acceptDate: -1
        } as UserProfile

        this.userRef = this.userprofile
        this.emailRef = this.userprofile.email
        this.nameRef = this.userprofile.displayName
        this.phoneNumberRef = this.userprofile.phoneNumber

        for (let _profile of _profiles) {
          if (_profile.user_uid === _user.uid) {
            this.profile = _profile
            this.userprofile.additional = _profile.additional
            this.userprofile.birthday = moment(_profile.birthday)
            this.userprofile.acceptDate = _profile.acceptDate
          }
        }
      } else {
        this.router.navigate(['/account/login'])
      }

    })
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  displayDate(dateTime) {
    return (new Date(dateTime)).toDateString()
  }

  onAdd() {
    delete this.profile.uid
    this.profile.user_uid = this.userprofile.uid
    this.profile.additional = this.newProfile.additional
    this.profile.birthday = this.newProfile['birthday'].format('MM-DD-YYYY')
    this.profile.acceptDate = new Date().getTime()
    this.profileService.addProfile(this.profile)
  }

  onUpdate() {
    this.profile.additional = this.userprofile.additional
    this.profile.birthday = this.userprofile.birthday.format('MM-DD-YYYY')
    this.profile.acceptDate = new Date().getTime()
    this.profileService.updateProfile(this.profile)
  }

  disableUpdate() {
    if (this.userprofile.birthday == null || this.profile.additional == null) {
      return true
    } else {
      return this.profile.additional == this.userprofile.additional &&
        this.profile.birthday == this.userprofile.birthday.format('MM-DD-YYYY')
    }
  }

  toggleUser() {
    if (this.userRef.displayName.length
      && this.userRef.email.length
      && this.userRef.phoneNumber.length === 10) {
      this.auth.updateUser(this.userRef)
    } else {
      this.userRef.phoneNumber = this.phoneNumberRef
      this.userRef.email = this.emailRef
      this.userRef.displayName = this.nameRef
    }
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
