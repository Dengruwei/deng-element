import { makeInstaller } from "@toy-element/utils";
import components from "./components";
import "@toy-element/theme";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const installer = makeInstaller(components);

export * from "../components";
export default installer;
