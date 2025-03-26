import Statuses from '@/components/Statuses'

export default async function Page() {
  const data = await fetch(
    'https://momentum.redberryinternship.ge/api/statuses'
  ).then((res) => res.json())

  return (
    <>
      <Statuses serverStatuses={data} />
    </>
  )
}
