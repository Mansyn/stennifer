import { Component, OnInit } from '@angular/core'
import { combineLatest, Subject } from 'rxjs'
import { AuthService } from 'src/app/core/auth.service'
import { ProfileService } from 'src/app/core/profile.service'
import UserUtils from 'src/app/models/user.utils'
import { takeUntil } from 'rxjs/operators'
import { UserProfile } from 'src/app/models/user'
import * as moment from 'moment'

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>()

  userProfiles: UserProfile[]
  today: moment.Moment

  constructor(
    public auth: AuthService,
    public profileService: ProfileService) {
    this.userProfiles = []
    this.today = moment()
  }

  ngOnInit() {
    const users$ = this.auth.getAllUsers()
    const profiles$ = this.profileService.getProfiles()

    combineLatest(users$, profiles$, (_users, _profiles) => {
      this.userProfiles = []
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

  findAge(birthday: moment.Moment) {
    return this.today.diff(birthday, 'years')
  }

  displayDate(dateTime) {
    if (dateTime == 0) {
      return 'n/a'
    } else {
      return (new Date(dateTime)).toDateString()
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
