import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class NotificationService {

    private _notification: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor() { }

    notify(message) {
        this._notification.next(message);
        setTimeout(() => this._notification.next(null), 3000);
    }

}
