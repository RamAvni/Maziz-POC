import { useEffect, useRef, useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getAllGtfsRoutes, OPEN_BUS_API_URL } from "@packages/open-bus-api";

function App() {
  const queryClient = new QueryClient();
  const [routes, setRoutes] = useState<any>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const gotRoutes = useRef(false);

  useEffect(() => {
    (async () => {
      const r = await getAllGtfsRoutes();
      gotRoutes.current = true;
      localStorage.setItem("routes", JSON.stringify(r));
      setRoutes(r);
    })();
  }, []);

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
