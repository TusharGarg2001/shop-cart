// themeAction.js
export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = (theme) => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};


  