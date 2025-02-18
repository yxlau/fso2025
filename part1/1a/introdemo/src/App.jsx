const Hello = () => {
  return (
    <div>
      <p>Hello world!</p>
    </div>
  );
};

const App = () => {
  const now = new Date();
  const a = 10;
  const b = 20;
  console.log(now, a + b);

  return (
    <div>
      <Hello />
    </div>
  );
};

export default App;
