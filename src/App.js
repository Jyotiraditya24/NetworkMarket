import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Chart from './components/Pages/Chart';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Tables from './components/Pages/Tables'
import PrizeWheel from './components/PrizeWheel';
import Blankpage from './components/Pages/Blankpage';
import Profile from './components/Pages/Profile';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { ScaleLoader } from "react-spinners";
import Form from './components/Pages/Form';
import ForgotPassword from './components/Pages/ForgotPassword';

function App() {

  
  return (
    <div className="App">
      <ToastContainer />
      <div className="homeSpinner d-none" id="spinner" style={{position:'fixed',top:0,bottom:0,left:0,right:0,display:'flex',justifyContent:'center',alignItems:'center',zIndex:'99999',backgroundColor:'#f5deb36e'}}>
           <ScaleLoader color="#36d7b7" />
        </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path='/Login' element ={<Login/>}></Route>
          <Route exact path='/Register' element ={<Register/>}></Route>
          <Route exact path='/Home' element ={<Home/>}></Route>
          <Route exact path='/Blankpage' element ={<Blankpage/>}></Route>
          <Route exact path="/PrizeWheel" element={<PrizeWheel/>}></Route>
          <Route exact path='/Tables' element ={<Tables/>}></Route>
          <Route exact path='/Form' element ={<Form />}></Route> 
          <Route exact path='/ForgotPassword' element ={<ForgotPassword />}></Route> 
        </Routes>
      </Router>
   
       

          {/* <PrizeWheel/>  */}
          {/* <Login></Login>
          <Register></Register> */}
          {/* <Tables></Tables> */}
          
           {/* <Blankpage/> */}

    
    </div>
  );
}

export default App;
