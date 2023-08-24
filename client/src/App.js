import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import ContactBox from "./components/ContactBox";
import ContactAdd from "./components/ContactAdd";

const SearchContact = ({
  q,
  setQ,
  sortTypes,
  currenSort,
  onSortChange,
  navigate,
  setPlus,
}) => (
  <div className="input-group mb-8" id="search">
    <div id="icon" onClick={onSortChange}>
      <i className={`fa-solid ${sortTypes[currenSort].class}`}></i>
    </div>
    <div className="input-container">
      <i className="fa-solid fa-magnifying-glass" id="input-icon"></i>
      <input
        type="text"
        className="form-control"
        aria-describedby="basic-addon1"
        id="input-field"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
        }}
      />
    </div>
    <div id="icon">
      <i
        className="fa-solid fa-user-plus"
        onClick={() => {
          navigate("add");
          setPlus(true);
        }}
      ></i>
    </div>
  </div>
);

function Layout({
  q,
  setQ,
  sortTypes,
  currenSort,
  onSortChange,
  setPlus,
  plus,
}) {
  const navigate = useNavigate();

  return (
    <div>
      {plus ? null : (
        <SearchContact
          q={q}
          setQ={setQ}
          onSortChange={onSortChange}
          currenSort={currenSort}
          sortTypes={sortTypes}
          navigate={navigate}
          setPlus={setPlus}
        />
      )}
      <Outlet />
    </div>
  );
}

function NotFound() {
  return <h1>Halaman tidak ditemukan</h1>;
}

function App() {
  const [q, setQ] = useState("");

  // this code is for showing form to add contact
  const [plus, setPlus] = useState(false);

  const [searchParam] = useState(["name", "phone"]);

  //this is state to sort asc and desc
  const sortTypes = {
    up: {
      class: "fa-arrow-down-a-z",
      fn: (a, b) => a.name.localeCompare(b.name),
    },
    down: {
      class: "fa-arrow-up-z-a",
      fn: (a, b) => b.name.localeCompare(a.name),
    },
  };

  const [currenSort, setCurrentSort] = useState("up");

  const onSortChange = () => {
    let nexSort;

    if (currenSort === "down") nexSort = "up";
    else if (currenSort === "up") nexSort = "down";

    setCurrentSort(nexSort);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              q={q}
              setQ={setQ}
              sortTypes={sortTypes}
              currenSort={currenSort}
              onSortChange={onSortChange}
              setPlus={setPlus}
              plus={plus}
            />
          }
        >
          <Route
            index
            element={
              <ContactBox
                q={q}
                setQ={setQ}
                searchParam={searchParam}
                sortTypes={sortTypes}
                currenSort={currenSort}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="add" element={<ContactAdd setPlus={setPlus} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
