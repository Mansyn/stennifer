import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imageUrls: string[]

  ngOnInit() {
    this.imageUrls = ['/assets/museum/1.jpg', '/assets/museum/4.jpg', '/assets/museum/5.jpg', '/assets/museum/9.jpg']
  }

}