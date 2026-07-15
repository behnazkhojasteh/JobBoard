import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("job-card", "routes/job-card.tsx"),
] satisfies RouteConfig;
