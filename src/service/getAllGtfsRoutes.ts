import axios from "axios";
import { OPEN_BUS_API_URL } from "./OPEN_BUS_API_URL";

export async function getAllGtfsRoutes() {
  const routes = await axios.get(`${OPEN_BUS_API_URL}/gtfs_routes/list`);
  return routes.data;
}
