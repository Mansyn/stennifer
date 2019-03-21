import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Profile } from '../models/user'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ProfileService {
    profilecollection: AngularFirestoreCollection<Profile>
    profiles: Observable<Profile[]>
    profileDoc: AngularFirestoreDocument<Profile>

    constructor(public _afs: AngularFirestore) {
        this.profilecollection = this._afs.collection('profiles', x => x.orderBy('acceptDate', 'asc'))
        this.profiles = this.profilecollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Profile
                const id = a.payload.doc.id
                return { id, ...data }
            }))
        )
    }

    getProfiles() {
        return this.profiles
    }

    addProfile(profile) {
        this.profilecollection.add(profile)
    }

    updateProfile(profile) {
        this.profileDoc = this._afs.doc(`profiles/${profile.id}`)
        delete profile['id']
        this.profileDoc.update(profile)
    }

    deleteProfile(profile) {
        this.profileDoc = this._afs.doc(`profiles/${profile.id}`)
        this.profileDoc.delete()
    }
}
