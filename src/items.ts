import { AxiosInstance } from "axios";
import { ItemGetQuery } from "common";

const Items = (instance: AxiosInstance) => {
    const getItems = async (params: ItemGetQuery) =>
        instance
            .get("/items", { params })
            .then(res => res.data);

    return {
        getItems
    };
};

export default Items;