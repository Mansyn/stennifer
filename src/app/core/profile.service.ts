import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Profile } from '../models/user'
import { Observable } from 'rxjs'

@Injectable()
export class ProfileService {
    private profiles$: AngularFirestoreCollection<Profile>
    profiles: Observable<Profile[]>

    constructor(private afs: AngularFirestore) {
        this.profiles$ = this.afs.collection<Profile>('profiles')
        this.profiles = this.profiles$.valueChanges()
    }

    getProfiles() {
        return this.profiles
    }

    getUserProfile(user_uid) {
        return this.afs.collection('profiles', ref => ref.where('user_uid', '==', user_uid))
    }

    addProfile(profile: Profile) {
        this.profiles$.add(profile);
    }
}
