import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'wedding-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  weddingDate: moment.Moment
  now: moment.Moment
  timeLeft: moment.Duration

  days: number
  hours: number
  minutes: number
  seconds: number

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.makeTimer();
    }, 1000)
  }

  makeTimer() {
    this.weddingDate = moment("10-05-2019")

    this.now = moment()

    this.timeLeft = moment.duration(this.weddingDate.diff(this.now));

    this.days = Math.floor(this.timeLeft.asDays())
    this.hours = this.timeLeft.hours()
    this.minutes = this.timeLeft.minutes()
    this.seconds = this.timeLeft.seconds()
  }
}
