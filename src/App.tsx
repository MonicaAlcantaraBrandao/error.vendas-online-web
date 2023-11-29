import type { Router as RemixRouter } from "@remix-run/router";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

import { firstScreenRoutes } from "./modules/firstScreen/routes";
import { loginRoutes } from "./modules/login/routes";
import { productScreens } from "./modules/product/routes";
import { verifyLoggedIn } from "./shared/functions/connection/auth";
import { useNotification } from "./shared/hooks/useNotification";
import { useRequests } from "./shared/hooks/useRequests";
import { useEffect } from "react";
import { URL_USER } from "./shared/constants/urls";
import { MethodsEnum } from "./shared/enums/method.enum";
import { useGlobalContext } from "./shared/hooks/useGlobalContext";

const routes: RouteObject[] = [...loginRoutes];
const routesLoggedIn: RouteObject[] = [
  ...firstScreenRoutes,
  ...productScreens,
].map((route) => ({
  ...route,
  loader: () => verifyLoggedIn,
}));

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalContext();
  const { request } = useRequests();

  useEffect(() => {
    request(URL_USER, MethodsEnum.GET, setUser);
  }, []);

  const router: RemixRouter = createBrowserRouter([
    ...routes,
    ...routesLoggedIn,
  ]);

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
