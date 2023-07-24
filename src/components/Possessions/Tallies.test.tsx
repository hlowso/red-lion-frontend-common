import { getColor } from './Tallies'

describe('Tallies.tsx', () => {
  describe('getColor', () => {
    test('returns the correct hex for a given RB variant', () => {
      expect(getColor('warning')).toBe('#ffc107')
    })
  })
})
