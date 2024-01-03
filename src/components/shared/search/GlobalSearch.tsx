'use client'

import Image from 'next/image'

import { Input } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { GlobalResult } from '@/components/shared'

const GlobalSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchContainerRef = useRef(null)

  const query = searchParams.get('q')

  const [search, setSearch] = useState(query || '')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (
        searchContainerRef.current && // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
        setSearch('')
      }
    }

    setIsOpen(false)

    document.addEventListener('click', handleOutSideClick)

    return () => document.removeEventListener('click', handleOutSideClick)
  }, [pathname])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'global',
          value: search,
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keyToRemove: ['global', 'type'],
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search, router, searchParams, query, pathname])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)

    if (!isOpen) setIsOpen(true)
    if (e.target.value === '' && isOpen) setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden" ref={searchContainerRef}>
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image src="/assets/icons/search.svg" width={24} height={24} className="cursor-pointer" alt="search" />
        <Input
          type="text"
          placeholder="Search Globally"
          value={search}
          onChange={handleChange}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  )
}
export default GlobalSearch
