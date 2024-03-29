import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import UserState from './context/user/userState';
import Login from './components/Login';
import Signup from './components/Signup';
import React ,{useContext} from 'react'
import Alert from './components/Alert';
import AlertContext from './context/alert/AlertContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const {alert} = useContext(AlertContext);

  return (
    <>
      <BrowserRouter>
      <UserState>
      <NoteState>
          <Navbar/>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <Alert alert={alert}/>
          <div className='a'>
              <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>  
                <Route path='/login' element={<Login />} />  
                <Route path='/SignUp' element={<Signup />} />  
              </Routes>
          </div>
      </NoteState>
      </UserState>
      </BrowserRouter>
    
    </>
  );
}

export default App;