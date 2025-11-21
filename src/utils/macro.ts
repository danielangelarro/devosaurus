import { CommandAction } from '../core/types';

export const createMacro = (...actions: CommandAction[]): CommandAction => {
  return () => {
    actions.forEach(action => action());
  };
};