// @flow

import React from 'react'
import Show from './show'

import type { Channel, Channels } from '../../types'
import { padZeroesToTime } from '../util'

type Props = {
  data: Channels,
}

type State = {
  timelineLeft: number,
  hours: Array<number>,
}

export default class Content extends React.Component<Props, State> {
  intervalId: ?IntervalID

  constructor(props: Props) {
    super(props)

    this.state = {
      timelineLeft: 0,
      hours: [],
    }
  }

  componentDidMount() {
    let hours = []
    for (let index = 0; index < 24; index++) {
      hours.push(index)
    }
    this.setState({ hours })

    this.updateTimeline()
    this.intervalId = window.setInterval(this.updateTimeline, 2000)
  }

  updateTimeline = () => {
    const dateObj = new Date()
    const mins = dateObj.getMinutes()
    const hours = dateObj.getHours()

    const margin =
      hours === 0 && mins === 0 ? 0 : hours * 177.29 + mins * 2.954833333333333
    this.setState({ timelineLeft: margin })
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId)
  }

  render() {
    return (
      <article className="content">
        <div className="time-container">
          {this.state.hours.map((time: number) => {
            return (
              <p className="time" key={time}>
                {padZeroesToTime(time)}:00
              </p>
            )
          })}
        </div>
        <div className="shows-container">
          <span
            className="timeline"
            style={{ marginLeft: this.state.timelineLeft }}
          />
          {this.props.data &&
            this.props.data.channels &&
            this.props.data.channels.map((channel: Channel, row: number) => {
              return channel.schedules.map((data, j) => {
                return (
                  <Show
                    data={data}
                    key={`${channel.title}-${data.title}-${row}-${j}`}
                    row={row}
                    isLast={j === channel.schedules.length - 1}
                  />
                )
              })
            })}
        </div>
      </article>
    )
  }
}
