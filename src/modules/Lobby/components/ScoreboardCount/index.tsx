import Typography from '@/common/components/base/Typography'
import userStore from '@/common/stores/user/user-store'

interface ScoreboardCountProps {
  score: {
    year: string
    score: number
  }
  addingScoreToOwnYear?: number
}
const ScoreboardCount = ({ score, addingScoreToOwnYear = 0 }: ScoreboardCountProps) => {
  const user = userStore((state) => state.user)

  const realScore = score.score + Number(score.year.includes(String(user.year)) ? addingScoreToOwnYear : 0)

  return (
    <div className="flex flex-row justify-between">
      <Typography variant="h4" className="text-white">
        {score.year}
      </Typography>
      <Typography variant="h4" className="text-white">
        {realScore.toLocaleString()}
      </Typography>
    </div>
  )
}

export default ScoreboardCount
