import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./index.css";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";

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
  const user = useSelector(auth => auth.user);
  const isLogin = useSelector(auth => auth.isLogin);
  console.log(useSelector(auth=>auth));
  useEffect(() => {
    console.log(isLogin);
    console.log(user);
  },[])

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contribute"
             element={isLogin ? (<Contribute />) : (<Navigate replace to='/' />)}
          />
          <Route path="/dataset"
            element={(isLogin && user?.roll==='admin')  ? (<Dataset />) :
              (<Navigate replace to='/signin' />)}
          />
          <Route path="dataset/text"
            element={(isLogin && user?.roll === 'admin') ? (<TextDataset />) :
              (<Navigate replace to='/signin' />)}
          />
          <Route path="dataset/audio"
            element={(isLogin && user?.roll==='admin')  ? (<AudioDataset />) :
              (<Navigate replace to='/signin' />)}
          />
          <Route path="/users" element={<Users />}/>
        </Route>
        <Route path="/signin"
           element={!isLogin ? (<SignIn />) : (<Navigate replace to='/' />)}
        />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Suspense>
  )
}

export default App;