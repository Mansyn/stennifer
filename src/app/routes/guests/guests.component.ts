import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/core/auth.service'
import { ProfileService } from 'src/app/core/profile.service'
import { User, Profile } from '../../models/user'

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {

  users$: Observable<User[]>

  constructor(
    public auth: AuthService,
    public profileService: ProfileService) { }

  ngOnInit() {
    this.users$ = this.auth.getAllUsers()
  }

  // getProfile(user: User): Observable<Profile> {
  //   return this.profileService.getUserProfileData(user.uid)[0]
  // }
}
