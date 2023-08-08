import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 1000,
});

const loadContactSuccess = (contacts) => ({
  type: "LOAD_CONTACT_SUCCESS",
  contacts,
});

export const loadStudent = () => (dispatch) =>
  request.get("api/phonebooks").then((response) => {
    if (response.data) dispatch(loadContactSuccess(response.data));
  });

//end of load data

const addContactDraw = (user) => ({ type: "ADD_CONTACT_DRAW", user });

const addContactSuccess = (id, user) => ({
  type: "ADD_CONTACT_SUCCESS",
  id,
  user,
});

export const addContact = (name, phone) => (dispatch) => {
  const id = Date.now().toString();
  const avatar = null;
  dispatch(addContactDraw({ id, name, phone, avatar }));
  return request.post("api/phonebooks", { name, phone }).then((response) => {
    dispatch(addContactSuccess(id, response.data));
  });
};

//end of add data

const deleteContactSuccess = (id) => ({
  type: "DELETE_CONTACT_SUCCESS",
  id,
});

export const deleteContact = (id) => (dispatch) =>
  request.delete(`api/phonebooks/${id}`).then((response) => {
    dispatch(deleteContactSuccess(id));
  });

//end of delete data

const updateContactSuccess = (user) => ({
  type: "UPDATE_CONTACT_SUCCESS",
  user,
});
export const updateContact = (id, name, phone) => (dispatch) => {
  request
    .put(`api/phonebooks/${id}`, { name, phone })
    .then((response) => {
      dispatch(updateContactSuccess(response.data));
    })
    .catch(() => {
      alert("update gagal");
    });
};

//end of update data

const updateAvatarSuccess = (users) => ({
  type: "UPDATE_AVATAR_SUCCESS",
  users,
});

export const updateAvatar = (id, avatar) => (dispatch) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  request
    .put(`api/phonebooks/${id}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatch(updateAvatarSuccess(response.data));
    })
    .catch((e) => {
      console.log(e);
      alert("update avatar gagal");
    });
};
