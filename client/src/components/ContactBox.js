import ContactList from "./ContactList";

export default function ContactBox({
  q,
  setQ,
  searchParam,
  sortTypes,
  currenSort,
}) {
  return (
    <div>
      <ContactList
        q={q}
        setQ={setQ}
        searchParam={searchParam}
        sortTypes={sortTypes}
        currenSort={currenSort}
      />
    </div>
  );
}
