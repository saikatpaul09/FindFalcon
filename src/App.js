import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
