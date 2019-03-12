import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { AuthService } from 'src/app/core/auth.service'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup
  mailing = false
  working: boolean
  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public auth: AuthService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.auth.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.router.navigate(['/account'])
        }
      })
    this.buildForm()
  }

  buildForm() {
    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      'email': ['', Validators.compose([Validators.email, Validators.required])],
      'password': ['', Validators.required]
    })
  }

  onRegister() {
    if (this.form.valid) {
      this.working = true
      const self = this
      const form = this.form.value
      this.afAuth.auth.createUserWithEmailAndPassword(form.email, form.password)
        .then((user) => {
          self.auth.registerUser(user.user, form.name)
        })
        .catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            self.openSnackBar('Password is too weak.', 'OKAY');
          } else if (errorCode === 'auth/email-already-in-use') {
            self.openSnackBar('Email already in use', 'OKAY');
          } else {
            self.openSnackBar(errorMessage, 'OKAY');
          }
          self.working = false;
          console.log(error);
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
