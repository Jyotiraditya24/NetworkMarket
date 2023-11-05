import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { localhost } from '../constant';
import handleSpinner from '../spinner';

function ForgotPassword() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');
  const [enteredOTP, setEnteredOtp] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [flag, setFlag] = useState(false);

  async function findUser(email) {
    let url = new URL(localhost + '/getOneUser')
    url.searchParams.append('email', email)
    try {
      const response = await fetch(url, { method: 'GET', redirect: "follow" });
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  const sendOTP = async (e) => {
    e.preventDefault()
    toast.dismiss()
    if (email.length < 5) {
      toast.error('Please enter valid Email')
      return null
    }
    handleSpinner(true)
    let user = await findUser(email)
    console.log(user)
    if (user.message === "Not found") {
      toast.error('User Not Exist')
      handleSpinner(false)
      return
    }
    let url = new URL(localhost + '/sendVerificationCode')
    try {
      const response = await fetch(url, {
        method: 'POST',
        redirect: "follow",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      console.log(result)
      setOTP(result.verificationCode);
      toast.success('OTP Send Successfully')
    } catch (error) {
      throw error;
    }
    setFlag(true)
    handleSpinner(false)
  }


  const handleReset = async () => {
    toast.dismiss();
    if (otp.toString() !== enteredOTP) {
      toast.error('Invalid Entered OTP');
      return;
    }
    if (password !== verifyPassword) {
      toast.error('Password doesn\'t match');
      return;
    }
    if (password.length < 5) {
      toast.error('Please enter a strong password');
      return;
    }
  
    const requestBody = {
      email: email,
      password: password,
    };
  
    try {
      handleSpinner(true)
      const url = new URL(localhost + '/updateData');
      url.searchParams.append('email',email)
      const response = await fetch(url, {
        method: 'PUT',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const result = await response.json();
      toast.success('Password Recovered Successfully');
      setTimeout(() => {
        window.location.href = '/Login'
        
      }, 2000);
      console.log(result);
    } catch (error) {
      console.error('Error updating data:', error);
    } finally{
      handleSpinner(false)
    }
  };
  
  return (
    <div><div className="content-wrapper d-flex align-items-center auth">
      <div className="row flex-grow">
        <div className="col-lg-5 col-md-9 mx-auto">
          <div className="auth-form-light text-left p-5 text-center">
            <div className="brand-logo">
              <img src="../../assets/images/logo.png" />
            </div>
            <h4>Recover Your Password</h4>
            <form className="pt-3">
              <div className="form-group">
                <div className="form-group" style={{ display: 'flex', justifyContent: 'center', gap: '2vh', alignItems: 'center' }}>
                  <input type="email" disabled={flag} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email Id" onChange={(e) => { setEmail(e.target.value.toLocaleLowerCase()) }} />
                  <button disabled={flag} style={{ width: '12vh', padding:'1vh 1vh', borderRadius: '4px', backgroundColor: 'white', border: '1px solid gray',fontSize:'2vw',fontSize:'0.8rem' }} onClick={sendOTP} >Get OTP</button>
                </div>
                <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="6 - Digit OTP" onChange={(e) => { setEnteredOtp(e.target.value) }} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Verify Password" onChange={(e) => { setVerifyPassword(e.target.value) }} />
              </div>
              <div className="mt-3">
                <a className="btn btn-block btn-gradient-primary btn-lgfont-weight-medium auth-form-btn" href="#" onClick={handleReset} >Reset</a>
              </div>
              <div className="text-center mt-4 font-weight-light"><a href="/Login" className="text-primary">Go to Login </a></div>
            </form>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default ForgotPassword