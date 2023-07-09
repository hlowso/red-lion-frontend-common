import { AxiosInstance } from "axios";
import {
  CharacterGetParams,
  CharacterActivityRequestParams,
  CharacterItemRequestParams,
  PurchaseItemAsCharacterRequestBody,
} from "common";

const Characters = (instance: AxiosInstance) => {
  const getCharacters = async (params: CharacterGetParams) =>
    instance.get("/characters", { params }).then((res) => res.data);

  const getCharacterActivityCountToday = async ({
    characterId,
    activityId,
  }: CharacterActivityRequestParams): Promise<number> =>
    instance
      .get(`/characters/${characterId}/activities/${activityId}/count-today`)
      .then((res) => res.data);

  const completeActivityAsCharacter = async ({
    characterId,
    activityId,
  }: CharacterActivityRequestParams) =>
    instance
      .patch(`/characters/${characterId}/activities/${activityId}/complete`)
      .then((res) => res.data);

  const purchaseItemAsCharacter = async (
    { characterId, itemId }: CharacterItemRequestParams,
    body: PurchaseItemAsCharacterRequestBody
  ) =>
    instance
      .patch(`/characters/${characterId}/items/${itemId}/purchase`, body)
      .then((res) => res.data);

  const utilizeItemAsCharacter = async ({
    characterId,
    itemId,
  }: CharacterItemRequestParams) =>
    instance
      .patch(`/characters/${characterId}/items/${itemId}/use`)
      .then((res) => res.data);

  return {
    getCharacters,
    getCharacterActivityCountToday,
    completeActivityAsCharacter,
    purchaseItemAsCharacter,
    utilizeItemAsCharacter,
  };
};

export default Characters;
