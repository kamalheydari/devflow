'use client'

import { HomePageFilters } from '@/constants/filters'
import { Button } from '@/components/ui'
import clsx from 'clsx'
import { useState } from 'react'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {}

const HomeFilters: React.FC<Props> = (props) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [active, setActive] = useState('')

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive(item)

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      })

      router.push(newUrl, { scroll: false })
    } else {
      setActive(item)
       
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLocaleLowerCase(),
      })

      router.push(newUrl, { scroll: false })
    }
  }

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex ">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          className={clsx('body-medium rounded-lg px-6 py-3 capitalize shadow-none', {
            'bg-primary-100 text-primary-500': active === item.value,
            'bg-light-800 text-light-500': active !== item.value,
          })}
          onClick={()=>handleTypeClick(item.value)}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilters
