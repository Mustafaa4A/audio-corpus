import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./index.css";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dataset = lazy(() => import('./pages/Dataset'));
const TextDataset = lazy(() => import('./pages/TextDataset'));
const AudioDataset = lazy(() => import('./pages/AudioDataset'));
const Users = lazy(() => import('./pages/Users'));
const Contribute = lazy(() => import('./pages/Contribute'));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dataset" element={<Dataset />}/>
          <Route path="dataset/text" element={<TextDataset />} />
          <Route path="dataset/audio" element={<AudioDataset />} />
          <Route path="/users" element={<Users />}/>
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </Suspense>
  )
}

export default App;