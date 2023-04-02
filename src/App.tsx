import { useEffect, useState } from 'react';
// import './App.css';
import './index.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import {
  createRoutesFromElements, Link, createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import { backend } from './declarations/backend';

function App() {
  const [count, setCount] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  // Get the current counter value
  const fetchCount = async () => {
    try {
      setLoading(true);
      const count = await backend.get();
      setCount(+count.toString()); // Convert BigInt to number
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const increment = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      setLoading(true);
      await backend.inc(); // Increment the count by 1
      await fetchCount(); // Fetch the new count
    } finally {
      setLoading(false);
    }
  };

  // Fetch the count on page load
  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="App bg-gray-900 w-screen h-screen">

    </div>
  );
}

// export default App;

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<App />} />
  </Route>
));


export default () => (
  <RouterProvider router={router} />
)