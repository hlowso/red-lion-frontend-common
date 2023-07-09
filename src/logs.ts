import { AxiosInstance } from "axios";
import { LogGetParams } from "common";

const Logs = (instance: AxiosInstance) => {
  const getLogs = async (params: LogGetParams) =>
    instance.get("/logs", { params }).then((res) => res.data);

  return {
    getLogs,
  };
};

export default Logs;
