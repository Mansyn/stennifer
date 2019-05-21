import { Component, OnInit } from '@angular/core'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'
import { Photo } from 'src/app/models/photo'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  private photosCollection: AngularFirestoreCollection<Photo>
  photos$: Observable<Photo[]>

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    this.photosCollection = this.afs.collection<Photo>('photos')
    this.photos$ = this.photosCollection.valueChanges()
  }

}
