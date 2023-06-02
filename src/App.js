// CSS
import './App.css';

// Router
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

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
import Search from './pages/Search/Search';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardCompany from './pages/DashboardCompany/DashboardCompany'
import DetailVacancy from './pages/DetailVacancy/DetailVacancy';
import EditVacancy from './pages/EditVacancy/EditVacancy';


function App() {

  const [user, setUser] = useState(undefined)
  
  const {auth} = useRegisterAuth()

  const [uid, setUID] = useState('')

    
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth, user])


  useEffect(() =>{
    if(user) {
        setUID(user.uid)
    } else {
        setUID('')
    }
  }, [user])


  const {userDoc} = useFetchUser('users', uid)

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, [pathname])

    return null
  }

  return (
    <div className="App"> 
      <UserContextProvider value={{user}}>
        <BrowserRouter>
          <Header user={user} />
          <ScrollToTop />
          <div className='container'>
            <Routes>
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/register/company" element={<CompanyRegister />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
              <Route path="/dashboard/user" element={user && userDoc.idA === 0 ? <Dashboard user={user} /> : <Navigate to="/login" />} />
              <Route path="/dashboard/company" element={user && userDoc.idA === 1 ? <DashboardCompany user={user} /> : <Navigate to="/login" />} />
              <Route path="/" element={<Home userDoc={userDoc} user={user} />} />
              <Route path="/create/posts" element={user && userDoc.idA === 1 ?  <Posts /> : <Navigate to="/login" />} />
              <Route path="/search" element={<Search user={user} userDoc={userDoc} />} />
              <Route path="/detail_vacancy/:id" element={<DetailVacancy user={user} />} />
              <Route path="dashboard/company/edit_vacancy/:id" element={<EditVacancy />} />
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
