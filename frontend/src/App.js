// @flow

import React, { Component } from 'react'
import './index.css'
import loadingIcon from './loading.gif'

import Header from './components/header'
import DatesHeader from './components/dates-header'
import Sidebar from './components/sidebar/'
import Content from './components/content'
import Footer from './components/footer'

import type { Channel, Channels } from './types'

type State = {
  data: Channels,
  isLoading: boolean,
  channels: Array<{ title: string, image: string }>,
}

class App extends Component<*, State> {
  constructor() {
    super()

    this.state = {
      data: {},
      isLoading: false,
      channels: [],
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    })

    fetch('http://localhost:1337/epg')
      .then(res => res.json())
      .then((result: Channels) =>
        this.setState({
          data: result,
          isLoading: false,
          channels: this.extractChannelData(result.channels),
        })
      )
      .catch(err => console.error(`Error occured: ${err}`))
  }

  extractChannelData(channels: Array<Channel>) {
    let result = []
    channels.forEach((channel: Channel) => {
      result.push({ title: channel.title, image: channel.images.logo })
    })

    return result
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading">
          <img src={loadingIcon} alt="Loading icon" />
        </div>
      )
    }

    return (
      <div className="wrapper">
        <Header />
        <DatesHeader />
        <Content data={this.state.data} />
        <Sidebar channels={this.state.channels} />
        <Footer />
      </div>
    )
  }
}

export default App
