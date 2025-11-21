import { DomActions } from "./dom";
import { NavActions } from "./navigation";
import { StorageActions } from "./storage";
import { FormActions } from "./forms";
import { ViewportActions } from "./viewport";
import { ClipboardActions } from "./clipboard";
import { UtilActions } from "./utils";
import { NetworkActions } from "./network";

export const Actions = {
  ...DomActions,
  ...NavActions,
  ...StorageActions,
  Forms: FormActions,
  Viewport: ViewportActions,
  Clipboard: ClipboardActions,
  Utils: UtilActions,
  Network: NetworkActions,
};
