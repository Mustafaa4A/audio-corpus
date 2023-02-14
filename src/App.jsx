import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Contribute from './pages/Contribute';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Copyright from "./components/Copyright";
import "./index.css";
import Dataset from "./pages/Dataset";
import TextDataset from "./pages/TextDataset";
import Users from "./pages/Users";
const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dataset" element={<Dataset />}/>
          <Route path="dataset/text" element={<TextDataset />} />
          <Route path="dataset/audio" element={<Contact />} />
          <Route path="/users" element={<Users />}/>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
       
    </div>

  )
}

export default App;