import { getUpcomingEvents } from '@/lib/schedule'
import { ScheduleClient } from './page.client'

export default async function SchedulePage() {
  const events = await getUpcomingEvents()
  return <ScheduleClient events={events} />
}
