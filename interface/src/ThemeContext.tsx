import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from '@pancakeswap-libs/uikit'

const CACHE_KEY = 'IS_DARK'

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: false, toggleTheme: () => null })

const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : true
  })

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
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
      background: 'rgba(11, 11, 38, 1)',
      primary: '#ABAADD',
      input: '#0b0b26',
      invertedContrast: '#0B0B26',
      textDisabled: "#ABAADD"
    },
    modal: {
      background: '#17163A'
    }
  }

  const newLight = {
    ...light,
    colors: {
      ...light.colors,
      text: '#4B4A84',
      textSubtle: '#ABAADD',
      input: '#ececff',
      primary: '#ceceea',
      invertedContrast: '#ECECFF',
      textDisabled: "#3E3D74"
    },
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? newDark : newLight}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
