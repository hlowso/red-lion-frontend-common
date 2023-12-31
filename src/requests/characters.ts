import {
  CharacterGetParams,
  CharacterActivityRequestParams,
  CharacterItemRequestParams,
  PurchaseItemAsCharacterRequestBody,
  FormulaContextValue,
  CharacterGoal,
  CharacterListRow,
  CharacterList,
  Requisite,
  ActivityStreak,
  TimeCard,
  TimeCardPunchRow,
  CommitmentRow
} from 'common'
import { HTTPRequests } from '.'

const Characters = ({ GET, PATCH, POST }: HTTPRequests) => {
  const getCharacters = async (params: CharacterGetParams) =>
    GET('/characters', params)

  const getCharacterActivityCountToday = async ({
    characterId,
    activityId
  }: CharacterActivityRequestParams): Promise<number> =>
    GET(`/characters/${characterId}/activities/${activityId}/count-today`)

  const getCharacterTallyTargets = async ({ id }: CharacterGetParams) =>
    GET(`/characters/${id}/tally-targets`)

  const getCharacterGoals = async ({
    id
  }: CharacterGetParams): Promise<CharacterGoal[]> =>
    GET(`/characters/${id}/goals`).then((goals: CharacterGoal[]) =>
      goals.map((g) => ({
        ...g,
        targetDate: g.targetDate ? new Date(g.targetDate) : undefined
      }))
    )

  const getCharacterLists = async ({
    id
  }: CharacterGetParams): Promise<CharacterListRow[]> =>
    GET(`/characters/${id}/lists`)

  const getCharacterLongestStreaks = async ({
    id
  }: CharacterGetParams): Promise<ActivityStreak[]> =>
    GET(`/characters/${id}/longest-streaks`)

  const getTimeCardToday = async ({
    id,
    timeCardId
  }: {
    id: number
    timeCardId: number
  }): Promise<TimeCard> =>
    GET(`/characters/${id}/time-cards/${timeCardId}/today`)

  const getTimeCardStreak = async (params: {
    id: number
    timeCardId: number
  }): Promise<number> =>
    GET(`/characters/${params.id}/time-card-streaks/${params.timeCardId}`)

  const getCharacterCommitment = ({
    id
  }: CharacterGetParams): Promise<CommitmentRow> =>
    GET(`/characters/${id}/commitments/today`)

  const getCommitmentStreak = ({
    id
  }: CharacterGetParams): Promise<CommitmentRow> =>
    GET(`/characters/${id}/commitment-streak`)

  const createCharacterGoal = async (
    params: Omit<CharacterGoal, 'id' | 'goalId'>
  ): Promise<CharacterListRow[]> =>
    POST(`/characters/${params.characterId}/goals`, params)

  const punchTimeCard = async ({
    id,
    timeCardId
  }: {
    id: number
    timeCardId: number
  }): Promise<TimeCardPunchRow> =>
    POST(`/characters/${id}/time-cards/${timeCardId}/today`)

  const commitCharacterActivities = (params: {
    characterId: number
    activityIds: number[]
  }) => POST(`/characters/${params.characterId}/commitments`, params)

  const completeActivityAsCharacter = async (
    { characterId, activityId }: CharacterActivityRequestParams,
    body?: { fieldValues: FormulaContextValue[] }
  ) =>
    PATCH(`/characters/${characterId}/activities/${activityId}/complete`, body)

  const purchaseItemAsCharacter = async (
    { characterId, itemId }: CharacterItemRequestParams,
    body: PurchaseItemAsCharacterRequestBody
  ) => PATCH(`/characters/${characterId}/items/${itemId}/purchase`, body)

  const utilizeItemAsCharacter = async ({
    characterId,
    itemId
  }: CharacterItemRequestParams) =>
    PATCH(`/characters/${characterId}/items/${itemId}/use`)

  const updateCharacterList = (params: Partial<CharacterList>) =>
    PATCH(`/characters/${params.characterId}/lists/${params.listId}`, params)

  const reorderCharacterActivities = (
    characterId: number,
    listId: number,
    activityIds: number[]
  ) =>
    PATCH(`/characters/${characterId}/lists/${listId}/activity-positions`, {
      activityIds
    })

  const updateCharacterGoal = (
    characterGoal: Requisite<Partial<CharacterGoal>, 'characterId' | 'goalId'>
  ) =>
    PATCH(
      `/characters/${characterGoal.characterId}/goals/${characterGoal.goalId}`,
      characterGoal
    )

  return {
    getCharacters,
    getCharacterActivityCountToday,
    getCharacterTallyTargets,
    getCharacterGoals,
    getCharacterLists,
    getCharacterLongestStreaks,
    getTimeCardToday,
    getTimeCardStreak,
    getCharacterCommitment,
    getCommitmentStreak,
    createCharacterGoal,
    punchTimeCard,
    commitCharacterActivities,
    completeActivityAsCharacter,
    purchaseItemAsCharacter,
    utilizeItemAsCharacter,
    updateCharacterList,
    reorderCharacterActivities,
    updateCharacterGoal
  }
}

export default Characters
