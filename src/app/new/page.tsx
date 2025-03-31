import NewPage from '@/components/NewPage'
import TasksPage from '@/components/TaskPage'

type Props = {}

function Page({}: Props) {
  return (
    <div>
      <NewPage />
      <TasksPage />
    </div>
  )
}

export default Page
