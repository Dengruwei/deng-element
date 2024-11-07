import makeInstaller from "./makeInstaller";
import components from "./components";
import "@toy-element/theme";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import printLogo from "./printLogo";

printLogo();

library.add(fas);

const installer = makeInstaller(components);

export * from "@toy-element/components";
export * from "@toy-element/locale";
export default installer;
