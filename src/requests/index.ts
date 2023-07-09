import axios from "axios";
import Users from "./users";
import Games from "./games";
import Characters from "./characters";
import Activities from "./activities";
import Logs from "./logs";
import Tallies from "./tallies";
import Items from "./items";
import Lists from "./lists";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER_URL! + process.env.REACT_APP_API_BASE_URL!,
});

const Requests = {
  ...Users(instance),
  ...Games(instance),
  ...Characters(instance),
  ...Activities(instance),
  ...Logs(instance),
  ...Tallies(instance),
  ...Items(instance),
  ...Lists(instance),
};

export default Requests;
