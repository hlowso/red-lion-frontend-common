import { AxiosInstance } from "axios";
import { TallyGetParams } from "common";

const Tallies = (instance: AxiosInstance) => {
    const getTallies = async (params: TallyGetParams) =>
        instance
            .get("/tallies", { params })
            .then(res => res.data);

    return {
        getTallies
    };
};

export default Tallies;