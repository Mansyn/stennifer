import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'wedding-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  weddingDateString: string
  weddingTimeString: string
  weddingDate: moment.Moment
  now: moment.Moment
  timeLeft: moment.Duration

  days: number
  hours: number
  minutes: number
  seconds: number

  constructor() {
    this.weddingDateString = "2019-10-05"
    this.weddingTimeString = "18:00";
  }

  ngOnInit() {
    this.makeTimer();

    setInterval(() => {
      this.makeTimer();
    }, 1000)
  }

  makeTimer() {
    this.weddingDate = moment(this.weddingDateString + ' ' + this.weddingTimeString)

    this.now = moment()

    this.timeLeft = moment.duration(this.weddingDate.diff(this.now));

    this.days = Math.floor(this.timeLeft.asDays())
    this.hours = this.timeLeft.hours()
    this.minutes = this.timeLeft.minutes()
    this.seconds = this.timeLeft.seconds()
  }
}
