import { Component, OnInit } from '@angular/core'
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore'
import { Photo } from 'src/app/models/photo'
import { Observable } from 'rxjs'
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  private photosCollection: AngularFirestoreCollection<Photo>
  photos$: Observable<Photo[]>
  photos: Photo[]

  public get uploads(): IMasonryGalleryImage[] {
    return this.photos.map(m => <IMasonryGalleryImage>{
      imageUrl: m.url
    })
  }

  constructor(private afs: AngularFirestore) {
    this.photos = []
  }

  ngOnInit() {
    this.photosCollection = this.afs.collection<Photo>('photos')
    this.photos$ = this.photosCollection.valueChanges()

    this.photos$.subscribe((photos) => {
      this.photos = photos
    })
  }

}
