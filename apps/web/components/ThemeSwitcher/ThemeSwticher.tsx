'use client'

import { Switch } from '@nextui-org/react'
import { MoonIcon } from './MoonIcon'
import { SunIcon } from './SunIcon'

import { useController } from './hooks'

export default function ThemeSwitcher() {
  const { mounted, setTheme, theme } = useController()

  if (!mounted) return null

  return (
    <Switch
      defaultSelected={theme === 'light'}
      size="md"
      color="secondary"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      data-testid="theme-switcher"
    />
  )
}
