import { AxiosInstance } from "axios";
import { GameGetParams } from "common";

const Games = (instance: AxiosInstance) => {
    const getGames = async (params: GameGetParams) =>
        instance
            .get("/games", { params })
            .then(res => res.data);

    return {
        getGames
    };
};

export default Games;