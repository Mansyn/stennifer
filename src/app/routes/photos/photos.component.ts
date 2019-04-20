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
  conf: GALLERY_CONF = {
    imageBorderRadius: '6px',
    imageOffset: '50px',
    showDeleteControl: false,
    showImageTitle: true,
    reactToKeyboard: true,
    backdropColor: 'rgba(0, 0, 0, 0.87)',
    inline: true
  };

  // gallery images
  images: GALLERY_IMAGE[] = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/engagement.jpg?alt=media&token=112f3468-20df-4a0e-9557-6195183757fc",
      altText: 'Right after we got engaged',
      title: 'Right after we got engaged',
      thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/engagement_thmb.jpg?alt=media&token=7200afd8-8c0c-43b8-87cc-860dce88b169"
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/engagement2.jpg?alt=media&token=dcb5b62e-783f-406e-bf52-3ae086af59cc",
      altText: 'On the patio at House of Cards',
      title: 'On the patio at House of Cards',
      thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/engagement2_thmb.jpg?alt=media&token=32472b43-f5c0-4426-8105-f0e11ec1c014"
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/halloween.jpg?alt=media&token=07d11f1f-e180-43a5-acb2-b657962c593a",
      altText: 'At the Halloween party at Rhinegeist',
      title: 'At the Halloween party at Rhinegeist',
      thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/halloween_thmb.jpg?alt=media&token=43128943-ecf6-4060-8cec-9358b3c4a4d6"
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/nashville.jpg?alt=media&token=3fd1410e-3aef-47c8-a709-b51fc59065cb",
      altText: 'Our favorite waitress in Nashville',
      title: 'Our favorite waitress in Nashville',
      thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/nashville_thmb.jpg?alt=media&token=9bb24833-5948-4fbf-8131-d8a958a57386"
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/neworleans.jpg?alt=media&token=d9022ff1-4409-4cb1-a326-bf83b39671cb",
      altText: 'Having drinks in New Orleans',
      title: 'Having drinks in New Orleans',
      thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/consensor-app.appspot.com/o/neworleans_thmb.jpg?alt=media&token=dedfab59-4b98-4964-aadf-cf696ce0dc15"
    }
  ];

  constructor() { }

  ngOnInit() { }

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
