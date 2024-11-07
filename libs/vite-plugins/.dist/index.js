import { each, isFunction } from "lodash-es";
import shell from "shelljs";
function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild
}) {
  return {
    name: "hooks-plugin",
    buildStart() {
      each(rmFiles, (file) => {
        shell.rm("-rf", file);
      });
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}
export {
  hooksPlugin
};
