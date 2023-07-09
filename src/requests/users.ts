import { AxiosInstance } from "axios";

const Users = (instance: AxiosInstance) => {
    const getCurrentUser = async (username?: string) => {
        return instance.get("/user", { params: { username } }).then(res => {
            return res.data;
        });
    };

    return {
        getCurrentUser
    };
};

export default Users;