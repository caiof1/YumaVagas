// CSS
import './App.css';

// Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import Header from './components/Header';

// Components
import { UserContextProvider } from './context/UserContext';

// hooks
import { useRegisterAuth } from './hooks/useRegisterAuth';
import { useEffect, useState } from 'react';
import { useFetchUser } from './hooks/useFetchUser';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Pages
import Home from './pages/Home/Home'
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Posts from './pages/posts/Posts';
import NotFound from './pages/NotFound/NotFound';
import CompanyRegister from './pages/CompanyRegister/CompanyRegister';
import Profile from './pages/Profile/Profile';


function App() {

  const [user, setUser] = useState(undefined)
  
  const {auth} = useRegisterAuth()

  const [uid, setUID] = useState('')

    
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])


  useEffect(() =>{
    if(user) {
        setUID(user.uid)
    } else {
        setUID('')
    }
  }, [user])


  const {userDoc} = useFetchUser('users', uid)

  console.log(userDoc)

  return (
    <div className="App"> 
      <UserContextProvider value={{user}}>
        <BrowserRouter>
          <Header user={user} />
          <div className='container'>
            <Routes>
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/register/company" element={<CompanyRegister />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/" element={<Home />} />
              <Route path="/create/posts" element={user && userDoc.idA === 1 ?  <Posts /> : <Navigate to="/login" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
