import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  view: {
    viewState: false,
    data: null,
  },
  edit: {
    editState: false,
    data: null,
  },
  task: {
    taskState: false,
    data: null,
  },
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setView: (state, action) => {
      state.view.viewState = action.payload.state;
      state.view.data = action.payload.data;
    },
    setEdit: (state, action) => {
      state.edit.editState = action.payload.state;
      state.edit.data = action.payload.data;
    },
    setTask: (state, action) => {
      state.task.taskState = action.payload.state;
      state.task.data = action.payload.data;
    },
  },
});

export const { setCollapsed, setView, setEdit, setTask } = siteSlice.actions;

export default siteSlice.reducer;
