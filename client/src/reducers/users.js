export default function users(state = [], action) {
  switch (action.type) {
    case "LOAD_CONTACT_SUCCESS":
      return action.contacts;

    case "ADD_CONTACT_DRAW":
      return [{ ...action.user }, ...state];

    case "ADD_CONTACT_SUCCESS":
      return state.map((item) => {
        if (item.id === action.id) item.id = action.user.id;
        return item;
      });

    case "DELETE_CONTACT_SUCCESS":
      return state.filter((item) => item.id !== action.id);

    case "UPDATE_CONTACT_SUCCESS":
      return state.map((item) => {
        if (item.id === action.user.id) item.name = action.user.name;
        item.phone = action.user.phone;
        return item;
      });

    case "UPDATE_AVATAR_SUCCESS":
      return state.map((item) => {
        if (item.id === action.users.id) item.avatar = action.users.avatar;
        return item;
      });

    default:
      return state;
  }
}
