const Persons = ({ entries, filter, deleteEntry }) => {
  const entriesToShow = filter
    ? entries.filter((entry) => entry.name.toLowerCase().includes(filter))
    : entries;

  return entriesToShow.map((entry) => (
    <div key={entry.id}>
      {entry.name} {entry.number}
     <button onClick={() => deleteEntry(entry.id)}>delete</button>
    </div>
  ));
};

export default Persons;
