import { AxiosInstance } from "axios";
import { ActivityGetParams } from "common";

const Activities = (instance: AxiosInstance) => {
    const getActivities = async (params: ActivityGetParams) =>
        instance
            .get("/activities", { params })
            .then(res => res.data);

    return {
        getActivities
    };
}

export default Activities;