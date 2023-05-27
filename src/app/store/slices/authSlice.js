const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: '' },
  reducers: {
    saveToken(state, action) {
      state.token = action.payload;
    },
    removeToken(state) {
      state.token = '';
    },
  },
});

const { actions, reducer } = authSlice;

export const { saveToken, removeToken } = actions;
export default reducer;
