'use client'

import Image from 'next/image'

import { cn, formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

import { Input } from '@/components/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  route: string
  iconPosition: 'left' | 'right'
  imgSrc: string
  placeholder: string
  otherClasses?: string
}

const LocalSearchbar: React.FC<Props> = (props) => {
  const { iconPosition, imgSrc, otherClasses, placeholder, route } = props

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  const [search, setSearch] = useState(query || '')

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        })

        router.push(newUrl, { scroll: false })
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keyToRemove: ['q'],
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [search, router, route, searchParams, query, pathname])

  return (
    <div
      className={cn(
        'background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4',
        otherClasses
      )}
    >
      {iconPosition === 'left' ? (
        <Image src={imgSrc} alt="search icon" width={24} height={24} className="cursor-pointer" />
      ) : null}

      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder background-light700_dark400 border-none shadow-none outline-none"
      />

      {iconPosition === 'right' ? (
        <Image src={imgSrc} alt="search icon" width={24} height={24} className="cursor-pointer" />
      ) : null}
    </div>
  )
}

export default LocalSearchbar
