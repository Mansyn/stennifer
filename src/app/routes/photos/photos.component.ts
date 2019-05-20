import { Component, OnInit, ViewChild } from '@angular/core'
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from 'ngx-image-gallery'
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage'
import { AngularFireAuth } from '@angular/fire/auth'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;

  // gallery configuration
  conf: GALLERY_CONF

  // gallery images
  images: GALLERY_IMAGE[]

  user: firebase.User
  ref: AngularFireStorageReference
  task: AngularFireUploadTask
  uploadProgress: any

  constructor(private afAuth: AngularFireAuth, private afStorage: AngularFireStorage) {

    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.user = res
      }
    })

    this.conf = {
      imageBorderRadius: '6px',
      imageOffset: '50px',
      showDeleteControl: false,
      showImageTitle: true,
      reactToKeyboard: true,
      backdropColor: 'rgba(0, 0, 0, 0.87)',
      thumbnailSize: 50,
      inline: true
    }
  }

  ngOnInit() {
    this.images = [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fberry-steps.jpg?alt=media&token=53fcecc7-3c4f-4bd8-b5a6-947b89b157e7',
        altText: 'Sitting in front of Berry',
        title: 'Sitting in front of Berry',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fberry-steps_thmb.jpg?alt=media&token=0f73c03b-e39b-4625-bbf2-8ad6aa50b577'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fbaseball.jpg?alt=media&token=6daf0d10-dad4-4a43-a8ec-8817d7548336',
        altText: 'At the Dragons game',
        title: 'At the Dragons game',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fbaseball_thmb.jpg?alt=media&token=6122f7c5-1423-45a4-80a4-be1e357a8183'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fall.jpg?alt=media&token=d4be1d68-f77c-4b85-8d0b-45a8da2fee37',
        altText: 'Brady Bunch type picture in front of Berry',
        title: 'Brady Bunch type picture in front of Berry',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fall_thmb.jpg?alt=media&token=6850ca1e-66ff-4a58-b352-58f90ae031d1'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fengagement-ring.jpg?alt=media&token=ed34405b-a88f-44c0-837e-89b1cb1ecb23',
        altText: 'The engagement ring',
        title: 'The engagement ring',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fengagement-ring_thmb.jpg?alt=media&token=abe867c7-968a-402e-b9a8-1bb772a749e9'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fengagement.jpg?alt=media&token=274e36d3-a8cd-4c35-8ea1-e43cefd73cd0',
        altText: 'On the patio at House of Cards',
        title: 'On the patio at House of Cards',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fengagement_thmb.jpg?alt=media&token=b0fe0c4d-1506-498d-933b-73cb392589e6'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fengagement2.jpg?alt=media&token=f6af6222-3ff7-4bea-8606-01b7223cf9df',
        altText: 'On the patio at House of Cards',
        title: 'On the patio at House of Cards',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fengagement2_thmb.jpg?alt=media&token=f3cb0adf-c755-46ee-ab82-94d4390e7fd6'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fhalloween-pose.jpg?alt=media&token=7771c845-a85c-4e94-85b4-4144bbe57628',
        altText: 'At the Halloween party at Rhinegeist',
        title: 'At the Halloween party at Rhinegeist',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fhalloween-pose_thmb.jpg?alt=media&token=46c910d9-923d-412f-bda7-8af338ccf8a1'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fhalloween.jpg?alt=media&token=1a121e4e-6279-412f-a47f-5d51b1f1265b',
        altText: 'At the Halloween party at Rhinegeist',
        title: 'At the Halloween party at Rhinegeist',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fhalloween_thmb.jpg?alt=media&token=4c327894-cca3-43cb-b708-cb31a5d74681'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fkiss.jpg?alt=media&token=ebc35149-497d-4457-9695-1569338202af',
        altText: 'Our first kiss after getting engaged',
        title: 'Our first kiss after getting engaged',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fkiss_thmb.jpg?alt=media&token=9e7305d6-fe8f-4a9a-9462-b6ca350b20d0'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fnashville.jpg?alt=media&token=80240a64-9ad7-4a9d-83c0-2f2ac3abdfb1',
        altText: 'Our favorite waitress in Nashville',
        title: 'Our favorite waitress in Nashville',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fnashville_thmb.jpg?alt=media&token=3272fdd5-77bb-4d1f-a616-b9536636de92'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fneworleans-candle.jpg?alt=media&token=bbae3155-34dd-4dc5-b56f-139d74a1f130',
        altText: 'At a celebration in New Orleans',
        title: 'At a celebration in New Orleans',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fneworleans-candle_thmb.jpg?alt=media&token=205f6179-c07d-4c6b-9c89-9ec2eafa9e15'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fneworleans.jpg?alt=media&token=eb657ccc-f361-45ca-a847-6aee2f775fc3',
        altText: 'Having drinks in New Orleans',
        title: 'Having drinks in New Orleans',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fneworleans_thmb.jpg?alt=media&token=4471a870-bed2-4902-be9c-94d9d13afc02'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fstephen-girls.jpg?alt=media&token=5b8fb304-3eb3-4cbd-9ddc-2b9aa827d57f',
        altText: 'Stephen and the girls',
        title: 'Stephen and the girls',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fstephen-girls.jpg?alt=media&token=5b8fb304-3eb3-4cbd-9ddc-2b9aa827d57f'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fstephen-kids.jpg?alt=media&token=eb09896c-285a-447c-a4b0-ae9fed5354cf',
        altText: 'Stephen and the kids',
        title: 'Stephen and the kids',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/photos%2Fstephen-kids_thmb.jpg?alt=media&token=06b1497f-9238-4a14-9938-62c7c0606a6d'
      }
    ]
  }

  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }

  /**************************************************/

  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }

  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }

  upload(event) {
    const file = event.target.files[0]
    this.ref = this.afStorage.ref('/uploads/' + this.user.uid + '/' + file.name)

    this.task = this.ref.put(event.target.files[0])

    this.uploadProgress = this.task.snapshotChanges()
      .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100))
  }

}
