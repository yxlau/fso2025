const Persons = ({ entries, filter }) => {
  const entriesToShow = filter
    ? entries.filter((entry) => entry.name.toLowerCase().includes(filter))
    : entries;

  return entriesToShow.map((entry) => (
    <div key={entry.id}>
      {entry.name} {entry.number}
    </div>
  ));
};

export default Persons;
