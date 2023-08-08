import { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch } from "react-redux";
import { deleteContact, updateAvatar, updateContact } from "../actions/users";

export default function ContactItem({ student }) {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(student.name);
  const [phone, setPhone] = useState(student.phone);
  const [avatar, setAvatar] = useState(student.avatar);
  const dispatch = useDispatch();

  const submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to remove this contact?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteContact(student.id)),
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const handleAvatarChange = (event) => {
    const picture = event.target.files[0];
    if (event.target.files.length !== 0) {
      setAvatar(picture);
      dispatch(updateAvatar(student.id, picture));
    }
  };

  return (
    <div className="container">
      <div
        className=""
        onClick={() =>
          document.getElementById(`selectAvatar${student.id}`).click()
        }
      >
        {avatar === null ? (
          <img src="/images/bussines-man.png" alt="" className="avatar" />
        ) : (
          <img
            src={
              avatar instanceof File
                ? URL.createObjectURL(avatar)
                : "/images/" + avatar
            }
            alt=""
            className="avatar"
          />
        )}
        <input
          id={"selectAvatar" + student.id}
          hidden
          type="file"
          name="avatar"
          onChange={handleAvatarChange}
        />
      </div>
      <div className="list">
        <br />
        <p>
          {isEdit ? (
            <input
              value={name}
              style={{ width: "60%" }}
              onChange={(event) => setName(event.target.value)}
            />
          ) : (
            name
          )}
        </p>
        <br />
        <p>
          {isEdit ? (
            <input
              value={phone}
              style={{ width: "60%" }}
              onChange={(event) => setPhone(event.target.value)}
            />
          ) : (
            phone
          )}
        </p>
        <br />
        {isEdit ? (
          <div>
            <i
              className="fa-solid fa-floppy-disk"
              onClick={() => {
                dispatch(updateContact(student.id, name, phone));
                setIsEdit(false);
              }}
            ></i>
          </div>
        ) : (
          <div>
            <i
              className="fa-solid fa-pen-to-square"
              onClick={() => setIsEdit(true)}
            ></i>
            <i className="fa-solid fa-trash-can" onClick={submit}></i>
          </div>
        )}
      </div>
    </div>
  );
}
