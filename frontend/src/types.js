// @flow

export type Schedule = {
  id: string,
  title: string,
  start: string,
  end: string,
}

export type Channel = {
  id: string,
  title: string,
  images: {
    logo: string,
  },
  schedules: Array<Schedule>,
}

export type Channels = {
  channels: Array<Channel>,
}
