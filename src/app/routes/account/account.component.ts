import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material'
import { Subject, Observable } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { AuthService } from 'src/app/core/auth.service'
import { User } from 'src/app/models/user'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    public auth: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.auth.user$.pipe(takeUntil(this.destroy$)).subscribe((_user) => {
      if (_user && _user.uid) {
        this.user = _user
      } else {
        this.router.navigate(['/account/login']);
      }
    })
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
