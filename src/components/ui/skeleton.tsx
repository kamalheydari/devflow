import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('animate-pulse bg-primary-500/25 dark:bg-primary-500/10 rounded-md ', className)} {...props} />
  )
}

export { Skeleton }
