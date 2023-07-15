import {
  CharacterGetParams,
  CharacterActivityRequestParams,
  CharacterItemRequestParams,
  PurchaseItemAsCharacterRequestBody,
  FormulaContextValue
} from 'common'

const Characters = ({ GET, PATCH }) => {
  const getCharacters = async (params: CharacterGetParams) =>
    GET('/characters', params)

  const getCharacterActivityCountToday = async ({
    characterId,
    activityId
  }: CharacterActivityRequestParams): Promise<number> =>
    GET(`/characters/${characterId}/activities/${activityId}/count-today`)

  const getCharacterTallyTargets = async ({ id }: CharacterGetParams) =>
    GET(`/characters/${id}/tally-targets`)

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

  return {
    getCharacters,
    getCharacterActivityCountToday,
    getCharacterTallyTargets,
    completeActivityAsCharacter,
    purchaseItemAsCharacter,
    utilizeItemAsCharacter
  }
}

export default Characters
