// @flow

import React from 'react'
import { formatDayMonth, formatDay } from '../util'

type State = {
  dates: Array<Date>,
  today: Date,
}

export default class DatesHeader extends React.Component<*, State> {
  constructor() {
    super()

    this.state = {
      dates: [],
      today: new Date(),
    }
  }

  componentDidMount() {
    const { today } = this.state
    const day = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()

    const dates = []
    for (let i = day - 2; i < day + 3; i++) {
      const dateObj = new Date(`${year}-${month + 1}-${i}`)
      dates.push(dateObj)
    }
    this.setState({ dates })
  }

  render() {
    const formattedToday = formatDayMonth(this.state.today)
    return (
      <article className="dates-header">
        {this.state.dates.map((date: Date, i: number) => {
          const formattedDate = formatDayMonth(date)
          return (
            <p
              key={`date-${i}`}
              className={formattedToday === formattedDate ? 'is-today' : ''}
            >
              {formatDay(date.getDay())} <br />
              {formattedDate}
            </p>
          )
        })}
      </article>
    )
  }
}
