import { NavLink, createBrowserRouter, useRouteError } from "react-router-dom";
import { Master } from "../componnents/layouts/Master";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "route1",
        element: <div>Route 1</div>,
      },
    ],
  },
]);

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Oops!</h1>
          <p class="py-6">Une erreur est survenue ...</p>
          <p class="py-6">{error.statusText || error.message}</p>
          <NavLink to="/">
            <button class="btn btn-primary">Retour</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default router;
