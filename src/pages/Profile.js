import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Profile extends Component {
    static propTypes = {
        prop: PropTypes
    }
    render() {
        return (
            <>
            <div className="App">
              <header className="App-header">
               <p>This is profile page</p>
              </header>
            </div>
            </>
        )
    }
}
