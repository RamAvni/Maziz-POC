import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getAllGtfsRoutes } from "../packages/service-open-bus-api/src/functions/getAllGtfsRoutes";
import { OPEN_BUS_API_URL } from "../packages/service-open-bus-api/src/consts/OPEN_BUS_API_URL";
import dayjs from "dayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  const [routes, setRoutes] = useState<any>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [liveVehicle, setLiveVehicle] = useState<object | null>(null);
  const gotRoutes = useRef(false);

  useEffect(() => {
    (async () => {
      const r = await getAllGtfsRoutes();
      gotRoutes.current = true;
      localStorage.setItem("routes", JSON.stringify(r));
      setRoutes(r);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedRoute) {
        const currentTimeFrom = dayjs().subtract(5, "minutes").format();
        const currentTimeTo = dayjs().format();

        console.log(currentTimeFrom);
        console.log(currentTimeTo);
        const liveVehicle = (
          await axios.get(
            `${OPEN_BUS_API_URL}/siri_vehicle_locations/list?line_ref=${selectedRoute.line_ref}&recorded_at_time_from=${encodeURIComponent(currentTimeFrom)}&recorded_at_time_to=${encodeURIComponent(currentTimeTo)}`,
          )
        ).data;
        console.log(liveVehicle);
        setLiveVehicle(liveVehicle);
      }
    })();
  }, [selectedRoute]);

  if (gotRoutes.current)
    return (
      <QueryClientProvider client={queryClient}>
        <select
          value={selectedRoute}
          onChange={(e) =>
            setSelectedRoute(
              routes.find((route) => {
                return (
                  JSON.parse(e.target.value).route_long_name ===
                  route.route_long_name
                );
              }),
            )
          }
        >
          {routes.map((route) => (
            <option value={JSON.stringify(route)}>
              {route.route_long_name}
            </option>
          ))}
        </select>
        <select>
          {liveVehicle?.map((route) => (
            <option>{route.siri_ride__vehicle_ref}</option>
          ))}
        </select>
      </QueryClientProvider>
    );
}

export default App;
