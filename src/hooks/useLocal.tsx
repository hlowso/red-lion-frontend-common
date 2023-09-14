import { useEffect, useState } from 'react'

type Key = 'hidden-activities' | 'committing-activities'

interface Map {
  'hidden-activities': number[]
  'committing-activities': number[]
}

const defaults = (key: Key) => {
  switch (key) {
    case 'hidden-activities':
    case 'committing-activities':
      return '[]'
  }
}

const useLocal = (key: Key) => {
  const [value, setValue] = useState(
    () => localStorage.getItem(key) || defaults(key)
  )
  useEffect(() => localStorage.setItem(key, value), [value])

  const parse = (value: string) => {
    switch (key) {
      case 'hidden-activities':
      case 'committing-activities':
        return JSON.parse(value) as Map[Key]
    }
  }

  const set = (value: Map[Key]) => {
    switch (key) {
      case 'hidden-activities':
      case 'committing-activities':
        return setValue(JSON.stringify(value))
    }
  }

  return {
    value: parse(value),
    set
  }
}

export default useLocal
