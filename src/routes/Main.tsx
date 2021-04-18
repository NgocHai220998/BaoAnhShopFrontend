import React, { lazy } from "react";
import { Redirect } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/overview" />,
  },
  {
    path: `/overview`,
    exact: true,
    component: lazy(() => import("@/views/Overview")),
  },
  {
    path: `/content/list`,
    exact: true,
    component: lazy(() => import("@/views/ContentList/List")),
  },
  {
    path: `/san-pham/danh-sach`,
    exact: true,
    component: lazy(() => import("@/views/JobList/JobList")),
  }
];

export default routes;
