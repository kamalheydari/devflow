'use client'

import { HomePageFilters } from '@/constants/filters'
import { Button } from '@/components'
import clsx from 'clsx'

interface Props {}

const HomeFilters: React.FC<Props> = (props) => {
  const active = 'newest'

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex ">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          className={clsx('body-medium rounded-lg px-6 py-3 capitalize shadow-none', {
            'bg-primary-100 text-primary-500': active === item.value,
            'bg-light-800 text-light-500': active !== item.value,
          })}
        >
          {item.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilters
