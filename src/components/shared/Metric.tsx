import Image from 'next/image'
import Link from 'next/link'

interface Props {
  imgUrl: string
  alt: string
  value: number | string
  title: string
  textStyles?: string
  href?: string
  isAuthor?: boolean
}

const Metric: React.FC<Props> = (props) => {
  const { alt, imgUrl, title, value, href, textStyles, isAuthor } = props

  const metricContent = (
    <>
      <Image src={imgUrl} width={16} height={16} alt={alt} className={`object-contain ${href ? 'rounded-full' : ''}`} />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}></span>
        {title}
      </p>
    </>
  )

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    )
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>
}

export default Metric
