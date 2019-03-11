// @flow

import React from 'react'

type Props = {
  channels: Array<{ title: string, image: string }>,
}

export default class Sidebar extends React.Component<Props> {
  render() {
    return (
      <aside className="aside">
        <h3>Channels</h3>
        {this.props.channels.map((channel, i) => {
          return (
            <div className="img-holder" key={channel.title}>
              <img
                className="img-responsive"
                src={channel.image}
                alt={channel.title}
              />
            </div>
          )
        })}
      </aside>
    )
  }
}
