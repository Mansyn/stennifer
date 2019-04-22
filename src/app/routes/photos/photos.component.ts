import { Component, OnInit, ViewChild } from '@angular/core'
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery"


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

  constructor() {
    this.conf = {
      imageBorderRadius: '6px',
      imageOffset: '50px',
      showDeleteControl: false,
      showImageTitle: true,
      reactToKeyboard: true,
      backdropColor: 'rgba(0, 0, 0, 0.87)',
      inline: true
    }
  }

  ngOnInit() {
    this.images = [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/baseball.jpg?alt=media&token=7d6d7b63-d33c-4b5b-9819-a3e9bf036a62",
        altText: 'At the Dragons game',
        title: 'At the Dragons game',
        thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/baseball_thmb.jpg?alt=media&token=f1909123-353c-473b-a08b-7a8ce0d36e55"
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/engagement-ring.jpg?alt=media&token=e0b29f76-5d9e-4d3e-904a-09727351b449',
        altText: 'The engagement ring',
        title: 'The engagement ring',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/engagement-ring_thmb.jpg?alt=media&token=8f2d40bc-b5b9-463d-88d4-9f36228e92f8'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/engagement.jpg?alt=media&token=90fc9a79-3bce-47b7-8acf-a0bf1db532b1',
        altText: 'On the patio at House of Cards',
        title: 'On the patio at House of Cards',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/engagement2_thmb.jpg?alt=media&token=d4dba261-1774-422f-88e2-eabfbcef8011'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/engagement2.jpg?alt=media&token=e8f09c66-6b46-4be3-90e2-7b08e12e47ce',
        altText: 'On the patio at House of Cards',
        title: 'On the patio at House of Cards',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/engagement2_thmb.jpg?alt=media&token=d4dba261-1774-422f-88e2-eabfbcef8011'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/halloween-pose.jpg?alt=media&token=343a4c0f-761d-4a94-b5ba-da6d846160c2',
        altText: 'At the Halloween party at Rhinegeist',
        title: 'At the Halloween party at Rhinegeist',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/halloween-pose_thmb.jpg?alt=media&token=25e75248-2665-43a4-8fcf-a316110ac5a8'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/halloween.jpg?alt=media&token=995e1697-e155-4f6b-a46f-47a93be95a92',
        altText: 'At the Halloween party at Rhinegeist',
        title: 'At the Halloween party at Rhinegeist',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/halloween_thmb.jpg?alt=media&token=2862d929-f2cc-4105-b2c5-3aed7af08c0d'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/kiss.jpg?alt=media&token=f3c9d85a-f2ab-4538-88d0-51377f386b69',
        altText: 'Our first kiss after getting engaged',
        title: 'Our first kiss after getting engaged',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/kiss_thmb.jpg?alt=media&token=75b549c1-0ca3-4b50-8458-a2627b984f8f'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/nashville.jpg?alt=media&token=e1de3ab0-9205-4fcd-b387-800b6a4c6bf9',
        altText: 'Our favorite waitress in Nashville',
        title: 'Our favorite waitress in Nashville',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/nashville_thmb.jpg?alt=media&token=6e23ef48-d117-4cf2-a041-50c1970b9014'
      },
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/neworleans.jpg?alt=media&token=909362d1-dda1-4160-990b-3716a4168700',
        altText: 'Having drinks in New Orleans',
        title: 'Having drinks in New Orleans',
        thumbnailUrl: 'https://firebasestorage.googleapis.com/v0/b/stennifer-0.appspot.com/o/neworleans_thmb.jpg?alt=media&token=dfca2722-3301-47fd-a443-06221fed3d69'
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

}
