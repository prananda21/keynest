import { createRouter } from "fumapress/router";
import config from "../press.config";
import HomePage from "./pages/home";

const router = await createRouter(config);

export default router.createPages(function ({ createPage }) {
  createPage({
    path: "/",
    render: "static",
    component: HomePage,
  });
});
