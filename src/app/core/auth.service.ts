import { Injectable } from '@angular/core'
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { User } from '../models/user'

@Injectable()
export class AuthService {

  private usersCollection: AngularFirestoreCollection<User>
  user$: Observable<User>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  updateUser(response) {
    const user = {
      uid: response.uid,
      displayName: response.displayName,
      email: response.email,
      phoneNumber: response.phoneNumber,
      photoURL: response.photoURL,
      roles: {}
    }
    this.updateUserData(user)
  }

  updateUserSoft(user: any) {
    this.afs.doc<firebase.User>(`users/${user.uid}`).valueChanges()
      .subscribe(_user => {
        if (_user) {
          let updatedUser: User = {
            uid: user.uid,
            displayName: user.displayName || _user.displayName,
            email: user.email || _user.email,
            phoneNumber: user.phoneNumber || _user.phoneNumber,
            photoURL: user.photoURL || _user.photoURL,
            roles: _user['roles']
          }
          this.afs.doc(`users/${user.uid}`).set(updatedUser, { merge: true })
        } else {
          this.updateUser(user)
        }
      })
  }

  registerUser(response, name, phoneNumber?) {
    const user = {
      uid: response.uid,
      displayName: name,
      email: response.email,
      phoneNumber: phoneNumber || '',
      photoURL: response.photoURL,
      roles: {}
    }
    this.updateUserData(user)
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider)
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      this.updateUserSoft(credential.user)
    })
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, { merge: true })
  }

  setUserEditor(user: any, isEditor: boolean) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      roles: {
        editor: isEditor
      }
    }
    return userRef.set(data, { merge: true })
  }

  setUserAdmin(user, isAdmin) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      roles: {
        admin: isAdmin
      }
    }
    return userRef.set(data, { merge: true })
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }

  getAllUsers() {
    this.usersCollection = this.afs.collection<User>('users')
    return this.usersCollection.valueChanges()
  }

  getAllSubscribers() {
    this.usersCollection = this.afs.collection('users', (ref) => ref.where('roles.subscriber', '==', true))
    return this.usersCollection.valueChanges()
  }
}
