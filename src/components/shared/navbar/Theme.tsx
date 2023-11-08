'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components'

import { themes } from '@/constants'

const Theme = () => {
  const { setTheme, resolvedTheme } = useTheme()

  // fix hydration error
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return <div className="h-[36px] w-[52px]" />

  return (
    <div className="text-gray-400">
      <Menubar className="relative border-none bg-transparent shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="data-[state=open]:bg-light-200 cursor-pointer focus:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
            {resolvedTheme === 'light' ? (
              <Image src="/assets/icons/moon.svg" alt="moon" width={20} height={20} className="active-theme" />
            ) : (
              <Image src="/assets/icons/sun.svg" alt="sun" width={20} height={20} className="active-theme" />
            )}
          </MenubarTrigger>
          <MenubarContent className="bourder absolute right-[-3rem] mt-3 min-w-[120px] rounded py-2 dark:border-dark-400 dark:bg-dark-300">
            {themes.map((item, i) => (
              <MenubarItem
                key={i}
                className="flex cursor-pointer items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400 "
                onClick={() => setTheme(item.value)}
              >
                <Image
                  src={item.icon}
                  alt={item.value}
                  height={16}
                  width={16}
                  className={`${resolvedTheme === item.value ? 'active-theme' : null}`}
                />
                <p
                  className={`body-seminold text-light-500 ${
                    resolvedTheme === item.value ? 'text-primary-500' : 'text-dark100_light900'
                  }`}
                >
                  {item.label}
                </p>
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
export default Theme
