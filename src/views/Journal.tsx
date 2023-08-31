import React from 'react'
import { usePlayContext } from '../contexts'
import useJournals from '../hooks/useJournals'
import Journals from '../components/Journals'

const Journal = () => {
  const { userId, gameId } = usePlayContext()
  const { data: journals } = useJournals({ userId, gameId })

  return <Journals journals={journals || []} />
}

export default Journal
