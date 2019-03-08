import { Component, OnInit } from '@angular/core'
import { combineLatest, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth.service'
import { ProfileService } from 'src/app/core/profile.service'
import { UserProfile } from '../../models/user'
import UserUtils from 'src/app/models/user.utils'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>()

  userProfiles: UserProfile[] = []

  constructor(
    public auth: AuthService,
    public profileService: ProfileService) { }

  ngOnInit() {
    const users$ = this.auth.getAllUsers()
    const profiles$ = this.profileService.getProfiles()

    combineLatest(users$, profiles$, (_users, _profiles) => {

      for (let _user of _users) {
        let _profile = _profiles.find(p => p.user_uid == _user.uid)
        let userProfile = UserUtils.mapToUserProfile(_user, _profile)
        if (userProfile) {
          this.userProfiles.push(userProfile)
        }
      }
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
