import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import React ,{useContext} from 'react'
import Alert from './components/Alert';
import AlertContext from './context/alert/AlertContext';


function App() {
  const {alert} = useContext(AlertContext);

  return (
    <>
      <BrowserRouter>
      <NoteState>
          <Navbar/>
          <Alert alert={alert}/>
          <div className='a'>
              <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='about' element={<About/>}/> 
                <Route exact path='login' element={<Login/>}/> 
                <Route exact path='SignUp' element={<Signup/>}/> 
              </Routes>
          </div>
      </NoteState>
      </BrowserRouter>
    
    </>
  );
}

export default App;