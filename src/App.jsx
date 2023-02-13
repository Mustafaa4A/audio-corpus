import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Contribute from './pages/Contribute';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Copyright from "./components/Copyright";

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
       <Copyright sx={{ mt: 5 }} />
    </div>

  )
}

export default App;