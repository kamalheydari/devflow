'use client'
import { deleteQuestion } from '@/lib/actions'
import { deleteAnswer } from '@/lib/actions/answer.action'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  type: 'Question' | 'Answer'
  itemId: string
}

const EditDeleteAction: React.FC<Props> = (props) => {
  const { itemId, type } = props

  const pathname = usePathname()
  const { push } = useRouter()

  const handleDelete = async () => {
    if (type === 'Question') {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      })
    } else if (type === 'Answer') {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      })
    }
  }
  const handleEdit = () => {
    push(`/question/edit/${JSON.parse(itemId)}`)
  }

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'Question' && (
        <button onClick={handleEdit}>
          <Image src="/assets/icons/edit.svg" alt="Edit" width={14} height={14} className="object-contain" />
        </button>
      )}
      <button onClick={handleDelete}>
        <Image src="/assets/icons/trash.svg" alt="Delete" width={14} height={14} className="object-contain" />
      </button>
    </div>
  )
}

export default EditDeleteAction
