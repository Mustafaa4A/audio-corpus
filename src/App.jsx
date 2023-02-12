import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>dfv</h1>} />
        <Route path="/Login" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>

    </div>
  )
}

export default App;