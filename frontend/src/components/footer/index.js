// @flow

import React from 'react'

export default class Footer extends React.Component<*> {
  render() {
    return (
      <footer className="footer">
        &#9400; Cool Company {new Date().getFullYear()}
      </footer>
    )
  }
}
