// @flow
import React from 'react'

import type { Schedule } from '../../types'
import { formatTime } from '../util'

type Props = {
  data: Schedule,
  row: number,
  isLast: boolean,
}

type State = {
  isHovered: boolean,
}

export default class Show extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isHovered: false,
    }
  }

  calculateMarginLeft(date: string): number {
    const dateObj = new Date(date)
    const mins = dateObj.getMinutes()
    const hours = dateObj.getHours()

    return hours === 0 && mins === 0
      ? 0
      : hours * 177.29 + mins * 2.954833333333333
  }

  calculateMarginTop(row: number): number {
    return row * 60
  }

  calculateWidth(startDate: string, endDate: string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)

    let startH = start.getHours()
    let startM = start.getMinutes()
    let endH = end.getHours()
    let endM = end.getMinutes()

    return ((endH - startH) * 60 + (endM - startM)) * 2.954833333333333
  }

  handleMouseEnter = (e: Event) => {
    this.setState({ isHovered: true })
  }

  handleMouseLeave = (e: Event) => {
    this.setState({ isHovered: false })
  }

  isCurrentlyRunning(startDate: string, endDate: string): boolean {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    return start <= now && end >= now
  }

  render() {
    const { data, row, isLast } = this.props
    const width = this.calculateWidth(data.start, data.end)
    const marginTop = this.calculateMarginTop(row)
    const marginLeft = this.calculateMarginLeft(data.start)
    const shouldExpand = width < 80 && this.state.isHovered

    return (
      <p
        className={`show ${
          this.isCurrentlyRunning(data.start, data.end) ? 'is-running' : ''
        } ${shouldExpand ? 'full-size' : ''}`}
        style={{
          marginLeft,
          width: shouldExpand ? '100px' : width,
          marginTop,
          cursor: shouldExpand ? 'zoom-in' : 'initial',
          borderTop: isLast && row !== 0 ? '1px solid #c5c6c7' : undefined,
        }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {data.title} <br />
        {formatTime(data.start)} - {formatTime(data.end)} <br />
      </p>
    )
  }
}
