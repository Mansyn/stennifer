import { Component, OnInit } from '@angular/core'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'
import { Photo } from 'src/app/models/photo'
import { Observable } from 'rxjs'
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  private photosCollection: AngularFirestoreCollection<Photo>
  photos$: Observable<Photo[]>

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage) {
  }

  ngOnInit() {
    this.photosCollection = this.afs.collection<Photo>('photos')
    this.photos$ = this.photosCollection.valueChanges()
  }

  removePhoto(photo: Photo) {
    this.afStorage.ref('/uploads/' + photo.uid + '/' + photo.fileName).delete()
    this.photosCollection.doc(photo.id).delete()
  }

  handleClick(photo: Photo) {
    this.removePhoto(photo)
  }
}
