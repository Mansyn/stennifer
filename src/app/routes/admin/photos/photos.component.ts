import { Component, OnInit } from '@angular/core'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'
import { Photo, PhotoViewModel } from 'src/app/models/photo'
import { Observable, combineLatest, Subject } from 'rxjs'
import { AngularFireStorage } from '@angular/fire/storage'
import { AuthService } from 'src/app/core/auth.service'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>()

  private photosCollection: AngularFirestoreCollection<Photo>
  photos: PhotoViewModel[]

  constructor(
    public auth: AuthService,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage) {
    this.photosCollection = this.afs.collection<Photo>('photos')
  }

  ngOnInit() {
    const users$ = this.auth.getAllUsers()
    const photos$ = this.photosCollection.valueChanges()

    combineLatest(users$, photos$, (_users, _photos) => {
      this.photos = []
      for (let _photo of _photos) {
        this.photos.push({
          id: _photo.id,
          uid: _photo.uid,
          fileName: _photo.fileName,
          userName: _users.find(u => u.uid == _photo.uid).displayName,
          url: _photo.url
        })
      }
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  removePhoto(photo: Photo) {
    this.afStorage.ref('/uploads/' + photo.uid + '/' + photo.fileName).delete()
    this.photosCollection.doc(photo.id).delete()
  }

  handleClick(photo: Photo) {
    this.removePhoto(photo)
  }
}
