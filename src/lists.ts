import { AxiosInstance } from "axios";
import { ListGetParams } from "common";

const Lists = (instance: AxiosInstance) => {
    const getLists = (params: ListGetParams) =>
        instance
            .get("/lists", { params })
            .then(res => res.data);
            
    return {
        getLists
    };
};

export default Lists;