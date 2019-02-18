import { Component } from '@angular/core'
import { AuthService } from 'src/app/core/auth.service'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public auth: AuthService) { }

}
