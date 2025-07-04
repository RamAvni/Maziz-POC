import axios from "axios";
import { OPEN_BUS_API_URL } from "../consts/OPEN_BUS_API_URL";
import { GtfsRouteType, openBusErrorType } from "../schemas";

export async function getAllGtfsRoutes(): Promise<
  GtfsRouteType[] | openBusErrorType
> {
  const routes = await axios.get(`${OPEN_BUS_API_URL}/gtfs_routes/list`);
  return routes.data;
}
