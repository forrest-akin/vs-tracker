import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createPalette from 'material-ui/styles/palette'
import createMuiTheme from 'material-ui/styles/theme'
import { blue, pink } from 'material-ui/styles/colors'
import MuiThemeProvider, { MUI_SHEET_ORDER } from 'material-ui/styles/MuiThemeProvider'

import store from './redux/store'
import App from './app/App'

const palette = createPalette({
  primary: blue,
  accent: pink,
  type: 'dark',
})

const theme = createMuiTheme({ palette })
const themeContext = MuiThemeProvider.createDefaultContext({ theme })
const styleManager = themeContext.styleManager

styleManager.setSheetOrder(MUI_SHEET_ORDER.concat([
  'App',
  'TaskPanel',
  'Task',
  'TaskModal',
]))

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme} styleManager={styleManager}>
      <App />
    </MuiThemeProvider>
  </Provider>, 
  document.getElementById('app')
)
