import { DevosaurusEngine } from "./core/engine";
import { DevosaurusConfig } from "./core/types";

export { Actions } from "./presets";

let instance: DevosaurusEngine | null = null;

export const initDevosaurus = (config?: DevosaurusConfig) => {
  if (!instance) {
    instance = new DevosaurusEngine(config);
  }
  return instance;
};

export { DevosaurusEngine };
