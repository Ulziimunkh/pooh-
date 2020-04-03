import React, { Component } from 'react'
import './Test.css'

export default class Test extends Component {
    myFunction = () =>{
        alert('Hello Tse')
    }
    render() {
        return (
            <div>
                <div class="container" onclick={this.myFunction }>
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                </div>
            </div>
        )
    }
}
