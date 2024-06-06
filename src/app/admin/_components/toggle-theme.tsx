"use client"
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

function ToggleTheme() {
    const {theme, setTheme} = useTheme()

  return (
    <Button 
    onClick={() => setTheme(theme == "light" ? "dark" : "light")}
    variant="outline" size="icon" className='absolute bottom-4 right-4'>
        <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className='sr-only'>Toggle Theme</span>
    </Button>
  )
}

export default ToggleTheme