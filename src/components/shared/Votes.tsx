interface Props {
  type: string
  itemId: string
  userId: string
  upvotes: number
  downvotes: number
  hasupVoted: boolean
  hasdownVoted: boolean
  hasSaved?: boolean
}

const Votes: React.FC<Props> = (props) => {
  return <div>Votes</div>
}

export default Votes
