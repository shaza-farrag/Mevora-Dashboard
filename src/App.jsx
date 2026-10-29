<<<<<<< HEAD
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
=======

import AppRouter from "./routes/AppRouter";

function App() {
  return <AppRouter />;
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267
}

export default App;
