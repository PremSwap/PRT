import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from '@pancakeswap-libs/uikit'

const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : true
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  const newDark = {
    ...dark,
    nav: {
      background: '#17163A',
      hover: dark.nav.hover
    },
    card: {
      ...dark.card,
      background: '#110F37'
    },
    colors: {
      ...dark.colors,
      text: '#ABAADD',
      textSubtle: '#ABAADD',
      background: 'rgba(11, 11, 38, 1)'
    },
    modal: {
      background: '#17163A'
    }
  }

  const newLight = {
    ...light,
    colors: {
      ...light.colors,
      text: '#ABAADD',
      textSubtle: '#ABAADD',
    },
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? newDark : newLight}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
