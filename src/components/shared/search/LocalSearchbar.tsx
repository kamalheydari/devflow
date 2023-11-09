'use client'

import { Input } from '@/components'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Props {
  route: string
  iconPosition: 'left' | 'right'
  imgSrc: string
  placeholder: string
  otherClasses?: string
}

const LocalSearchbar: React.FC<Props> = (props) => {
  const { iconPosition, imgSrc, otherClasses, placeholder } = props
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
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-dark400_light700 border-none shadow-none outline-none"
      />

      {iconPosition === 'right' ? (
        <Image src={imgSrc} alt="search icon" width={24} height={24} className="cursor-pointer" />
      ) : null}
    </div>
  )
}

export default LocalSearchbar
