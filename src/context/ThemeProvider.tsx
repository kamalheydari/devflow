'use client'
import { useContext, createContext, useState, useEffect, Dispatch, SetStateAction } from 'react'

type Mode = 'dark' | 'light'

interface ThemeContextProps {
  mode: Mode
  setMode: Dispatch<SetStateAction<Mode>>
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'dark',
  setMode: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('dark')

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
