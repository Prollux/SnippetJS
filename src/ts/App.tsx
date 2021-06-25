import React, { FC } from 'react'
import "../sass/styles.scss"
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { Provider } from 'react-redux'
import { store } from '../store'
import CodePanel from './components/CodePanel'


const App = () => {
  return (
    <>
    <Provider store={store}>
      <CodePanel />
    </Provider>
    </>
  )
}

export default App
