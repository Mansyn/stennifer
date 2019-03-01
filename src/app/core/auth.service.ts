import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { firebase } from '@firebase/app'
import '@firebase/auth'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'

import { User, Profile } from '../models/user'

@Injectable()
export class AuthService {
  user$: Observable<User>;

  // only for admin use
  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    //// Get auth data, then get firestore user document || null
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
    const user: User = {
      uid: response.uid,
      displayName: response.displayName,
      email: response.email,
      phoneNumber: response.phoneNumber,
      photoURL: response.photoURL,
      roles: {}
    };
    this.updateUserData(user);
  }

  registerUser(response, name, phoneNumber?) {
    const user: User = {
      uid: response.uid,
      displayName: name,
      email: response.email,
      phoneNumber: phoneNumber || '',
      photoURL: response.photoURL,
      roles: {}
    };
    this.updateUserData(user);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider)
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      this.updateUserData(credential.user)
    });
  }

  signOut() {
    this.afAuth.auth.signOut()
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      roles: {
        subscriber: true
      }
    };
    return userRef.set(data, { merge: true });
  }

  setUserEditor(user, isEditor) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      roles: {
        editor: isEditor
      }
    };
    return userRef.set(data, { merge: true });
  }

  setUserAdmin(user, isAdmin) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      roles: {
        admin: isAdmin
      }
    };
    return userRef.set(data, { merge: true });
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
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
