import React, { Component } from 'react'
import RouterViews from './router/index'
import './css/style.scss'
import {Provider} from 'react-redux'
import store from './store/index'

class App extends Component {
  render() {
    return (
      <div className="box">
        <Provider store={store}>
          <RouterViews></RouterViews>
        </Provider>
      </div>
    )
  }
}
export default App;