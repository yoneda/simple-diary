import { createStore, action, thunk, computed } from "easy-peasy";
import agent from "./agent";
import { isEmpty } from "lodash";

const notes = {
  items: [],
  create: thunk(async (actions, payload, { getState }) => {
    const { account, body, onSuccess } = payload;
    const note = await agent.Note.post({ account, body });
    const { items } = getState();
    actions.set([...items, note]);
    onSuccess();
  }),
  get: thunk(async (actions, payload) => {
    const account = payload;
    const notes = await agent.Note.get(account);
    actions.set(notes);
  }),
  update: thunk(async (actions, payload) => {
    const { id, body, onSuccess } = payload;
    await agent.Note.put({ id, body });
    const notes = await agent.Note.get("yoneda");
    actions.set(notes);
    if (onSuccess !== undefined) onSuccess();
  }),
  set: action((state, payload) => {
    return { ...state, items: payload };
  }),
};

const user = {
  item: {},
  get: thunk(async (actions, payload) => {
    const user = await agent.User.get("yoneda");
    actions.set(user);
  }),
  update: thunk(async (actions, payload) => {
    const {
      mail,
      pass,
      bio,
      showCalendar,
      showDateEditor,
      calendarStart,
      onSuccess,
    } = payload;
    const user = await agent.User.put({
      account: "yoneda",
      mail,
      pass,
      bio,
      showCalendar,
      showDateEditor,
      calendarStart,
    });
    actions.set(user);
    if (onSuccess !== undefined) onSuccess();
  }),
  login: thunk(async (actions, payload) => {
    const { mail, pass, onSuccess } = payload;
    const isSuccess = await agent.User.login({ mail, pass });
    if (!isSuccess) return;
    const user = await agent.User.get();
    actions.set(user);
  }),
  set: action((state, payload) => {
    return { ...state, item: payload };
  }),
};

const app = {
  user: {},
  isLoggedIn: computed((state) => !isEmpty(state.user)),
  login: thunk(async (actions, payload, { getStoreActions }) => {
    console.log(payload);
    const { mail, pass, onSuccess } = payload;
    // ログイン情報をもったクッキーを取得
    const isSuccess = await agent.User.login({ mail, pass });
    if (!isSuccess) return;
    // ユーザを取得
    const user = await agent.User.get();
    actions.setUser(user);
    // ノートを取得
    const notes = await agent.Note.get(user.account);
    const setNotes = getStoreActions().notes.set;
    setNotes(notes);
    onSuccess();
  }),
  logout: thunk(async (actions, payload, { getStoreActions }) => {
    const { onSuccess } = payload;
    // クッキーを削除
    const isSuccess = await agent.User.logout();
    if (!isSuccess) return;
    // ユーザを削除
    actions.setUser({});
    // ノートを削除
    getStoreActions().notes.set([]);
    onSuccess();
  }),
  setUser: action((state, payload) => {
    state.user = payload;
  }),
};
const store = createStore({ user, notes, app });

export default store;
