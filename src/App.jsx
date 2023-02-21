import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./index.css";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DisplayText from "./pages/DisplayText";

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dataset = lazy(() => import('./pages/Dataset'));
const TextDataset = lazy(() => import('./pages/TextDataset'));
const AudioDataset = lazy(() => import('./pages/AudioDataset'));
const Users = lazy(() => import('./pages/Users'));
const Contribute = lazy(() => import('./pages/Contribute'));
const Http404 = lazy(() => import('./pages/Http404'));


const font = "'Work Sans', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: font,
  },
});


const App = () => {
  const user = useSelector(auth => auth.user);
  const isLogin = useSelector(auth => auth.isLogin);
 

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigation />} >
          <Route index element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contribute"
             element={isLogin ? (<Contribute />) : (<Navigate replace to='/' />)}
          />
          <Route path="/dataset"
            element={(isLogin && user?.roll==='admin')  ? (<Dataset />) :
              (<Navigate replace to='/' />)}
          />
          <Route path="dataset/text"
            element={(isLogin && user?.roll === 'admin') ? (<TextDataset />) :
              (<Navigate replace to='/' />)}
          />
          <Route path="dataset/audio"
            element={(isLogin && user?.roll==='admin')  ? (<AudioDataset />) :
              (<Navigate replace to='/' />)}
            />
          <Route path="dataset/text/display"
            element={(isLogin && user?.roll==='admin')  ? (<DisplayText />) :
              (<Navigate replace to='/' />)}
            />
            <Route path="/contributers"
            element={(isLogin && user?.roll==='admin')  ? (<Users />) :
              (<Navigate replace to='/' />)}
          />
        </Route>
        <Route path="/signin"
           element={!isLogin ? (<SignIn />) : (<Navigate replace to='/' />)}
        />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="*" element={<Http404 />} />
      </Routes>
    </Suspense>
    </ThemeProvider>
  )
}

export default App;