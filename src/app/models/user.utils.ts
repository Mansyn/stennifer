import { User, Profile, UserProfile } from './user'
import * as moment from 'moment'

export default class UserUtils {
  static mapToUserProfile(user: User, profile: Profile): UserProfile {
    const userProfile = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      roles: user.roles,
      additional: profile ? profile.additional : 0,
      birthday: profile ? moment(profile.birthday) : moment(),
      acceptDate: profile ? profile.acceptDate : 0
    };

    return userProfile;
  }
}
