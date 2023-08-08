import React, { useState, useEffect } from "react";
import ContactItem from "./ContactItem";
import { useDispatch, useSelector } from "react-redux";
import { loadStudent } from "../actions/users";

const ITEMS_PER_PAGE = 10; // Number of items to display per page

export default function ContactList({ q, searchParam, sortTypes, currenSort }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudent());
  }, [dispatch]);

  const contact = useSelector((state) => state.users);

  //this state is to set a page data
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  //this function is to set a search data
  const search = (contact) => {
    return contact.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  };

  useEffect(() => {
    // Update the currentItems whenever listPhone, q, or currenSort changes
    const filteredItems = search([...contact].sort(sortTypes[currenSort].fn));
    setCurrentItems(filteredItems.slice(0, currentPage * ITEMS_PER_PAGE));
  }, [contact, currenSort, currentPage, sortTypes]);

  // Function to handle the scroll event and trigger pagination
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      // User has reached the bottom of the page, load more data
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Attach the scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="main">
      {currentItems.map((student, index) => (
        <ContactItem key={student.id} student={student} />
      ))}

      <div style={{ height: "600px" }}></div>
    </div>
  );
}
