import React, { useEffect, useState } from 'react'
import './Profile.css'
import { toast } from 'react-toastify';
import handleSpinner from '../spinner';
import { localhost } from '../constant';


function Profile() {

  const [userDetail, setUserDetail] = useState();
  const [networks, setNetworks] = useState([]);
  const [searchNetwork,setSeacrhNetwork] = useState([]);
  const [selectedNetwork,setSelectedNetwork] =useState();

  useEffect(() => {
    const storedUserDetail = JSON.parse(localStorage.getItem('Purple'));
    if (storedUserDetail) {
      setUserDetail(storedUserDetail);
      findNetwork(storedUserDetail.client_Id);
    } else {
      window.location.href = '/Login';
    }
  }, []);

  const findNetwork = async (client_Id) => {
    const url = new URL(`${localhost}/getUsersByQuery`);
    url.searchParams.append('parent_client_Id', client_Id);
    try {
      const response = await fetch(url, { method: 'GET', redirect: 'follow' });
      const result = await response.json();
      var netw = result.data.filter((user) =>{ return  user.accountstatus != "Pending" }) ;
      setNetworks(netw)
      setSeacrhNetwork(netw);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleProfileChange = (event) => {
    setUserDetail((prevUserDetail) => ({
      ...prevUserDetail,
      [event.target.name]: event.target.value,
    }));
  };

  const sendForUpdate = async () => {
    try {
      handleSpinner(true);
      const url = new URL(`${localhost}/updateData`);
      url.searchParams.append('email', userDetail.email);
      const dataToUpdate = userDetail;
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToUpdate),
      });
      const data = await response.json();
      localStorage.setItem('Purple', JSON.stringify(data.data));
      handleSpinner(false);
      if (data.message === 'Data not found') {
        toast.error('Invalid email address');
      } else {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      handleSpinner(false);
      console.log('Error updating data:', error);
      toast.error('Something went wrong');
    }
  };

  const handleCancel = () => {
    const storedUserDetail = JSON.parse(localStorage.getItem('Purple'));
    if (storedUserDetail) {
      setUserDetail(storedUserDetail);
    } else {
      window.location.href = '/Login';
    }
  };

  const profileImageonChange = async (e) => {
    const file = e.target.files[0];
    const base64Data = await convertToBase64(file);
    if (base64Data) {
      const updatedUserDetail = { ...userDetail, profileimg: base64Data };
      setUserDetail(updatedUserDetail);
    }
  };

  async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        resolve(base64Data);
      };
      reader.onerror = (error) => {
        console.log('Error occurred while reading the file:', error);
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }



  const updatePass = async () => {
    let oldPass = userDetail.password
    let old = document.getElementById('oldPassword').value
    let newPass1 = document.getElementById('newPassword1').value
    let newPass2 = document.getElementById('newPassword2').value
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (newPass1 !== newPass2) {
      toast.error('Password doesn\'t match')
      return null
    }
    if (oldPass !== old) {
      toast.error('Incorrect old password')
      return null
    }
    if (!regex.test(newPass1) || newPass1 === '' || newPass1 === null) {
      toast.warn('Please enter strong password')
      return null
    }
    handleSpinner(true)
    let user = userDetail;
    user.password = newPass1
    const url = new URL(`${localhost}/updateData`);
    url.searchParams.append('email', userDetail.email);
    const response = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) });
    const data = await response.json();
    if (data.message === 'Success')
      toast.success('Password updated successfully')
    handleSpinner(false)
  }

  const searchUsers = (e) => {
    const searchValue = e.target.value.toLowerCase(); 
    if (searchValue.length === 0 || searchValue === '' || searchValue === undefined || searchValue === null) {
       setNetworks(searchNetwork);
    } else {
      const networks = searchNetwork;
      const filteredUsers = searchNetwork.filter((user) => {
        const name = user.name.toLowerCase(); // Use toLowerCase() here as well
        return name.includes(searchValue);
      });
      setNetworks(filteredUsers);
    }   
    
  };

     function formattedDateAndTime(dateStr) {
        const dateTime = new Date(dateStr);
        const formattedDateTimeSTR = dateTime.toLocaleString();
        return formattedDateTimeSTR;
    }

  return (
    <div style={{ width: '100%' }}>

      {userDetail ?
        <section className=" pb-2 mb-2 ">
          <div className="Profilecontainer" style={{ textAlign: 'left' }}>
            <div className="bg-white shadow rounded-lg d-block d-sm-flex">
              <div className="profile-tab-nav border-right d-none">
                <div className="p-4">
                  <div className="img-circle text-center mb-3">
                    <img src={userDetail.profileimg ? userDetail.profileimg : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} alt="Image" className="shadow" />
                  </div>
                  <h4 className="text-center">{userDetail.client_Id}</h4>
                </div>
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="account-tab"
                    data-toggle="pill"
                    href="#account"
                    role="tab"
                    aria-controls="account"
                    aria-selected="true"
                  >
                    <i className="fa fa-home text-center mr-1" />
                    Account
                  </a>
                  <a
                    className="nav-link"
                    id="password-tab"
                    data-toggle="pill"
                    href="#password"
                    role="tab"
                    aria-controls="password"
                    aria-selected="false"
                  >
                    <i className="fa fa-key text-center mr-1" />
                    Password
                  </a>
                  <a
                    className="nav-link"
                    id="security-tab"
                    data-toggle="pill"
                    href="#security"
                    role="tab"
                    aria-controls="security"
                    aria-selected="false"
                  >
                    <i className="fa fa-user text-center mr-1" />
                    Security
                  </a>
                  <a
                    className="nav-link"
                    id="application-tab"
                    data-toggle="pill"
                    href="#application"
                    role="tab"
                    aria-controls="application"
                    aria-selected="false"
                  >
                    <i className="fa fa-tv text-center mr-1" />
                    Networks
                  </a>
                  <a
                    className="nav-link"
                    id="notification-tab"
                    data-toggle="pill"
                    href="#notification"
                    role="tab"
                    aria-controls="notification"
                    aria-selected="false"
                  >
                    <i className="fa fa-bell text-center mr-1" />
                    Notification
                  </a>
                </div>
              </div>
              <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="account"
                  role="tabpanel"
                  aria-labelledby="account-tab"
                >
                  <h3 className="mb-4">Code no : {userDetail.client_Id}</h3>
                  <div style={{ display: 'flex', justifyContent: 'center' }} className='my-4'>
                    <div className="small-12 medium-2 large-2 columns">
                      <div className="circle" style={{ backgroundImage: `url(${userDetail.profileimg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                        {!userDetail.profileimg && (
                          <img
                            className="profile-pic"
                            src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                            id='profileImage'
                            alt="Profile"
                          />
                        )}
                      </div>
                    </div>
                    <div className="p-image">
                      <label htmlFor="pfimg">
                        <i className="fa fa-camera upload-button" style={{ marginLeft: '-3vh', color: 'black' }} />
                      </label>
                      <input className="file-upload" type="file" accept="image/*" id="pfimg" multiple="false" onChange={profileImageonChange} />
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name='firstname'
                          onChange={handleProfileChange}
                          value={userDetail.firstname}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name='lastname'
                          value={userDetail.lastname}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          disabled
                          defaultValue={userDetail.email}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Phone number</label>
                        <input
                          type="text"
                          className="form-control"
                          name='phone'
                          onChange={handleProfileChange}
                          value={userDetail.phone}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Aadhaar No.</label>
                        <input
                          type="text"
                          className="form-control"
                          maxLength={12}
                          name='aadhaar'
                          onChange={handleProfileChange}
                          value={userDetail.aadhaar}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name='dob'
                          onChange={handleProfileChange}
                          value={userDetail.dob ? userDetail.dob.slice(0, 10) : ''}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Bio</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          name='bio'
                          onChange={handleProfileChange}
                          value={userDetail.bio}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={sendForUpdate} >Update</button>
                    <button className="btn btn-light" onClick={handleCancel} >Cancel</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="password"
                  role="tabpanel"
                  aria-labelledby="password-tab"
                >
                  <h3 className="mb-4">Password Settings</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Old password</label>
                        <input type="password" className="form-control" id='oldPassword' />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>New password</label>
                        <input type="password" className="form-control" id='newPassword1' />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Confirm new password</label>
                        <input type="password" className="form-control" id='newPassword2' />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={updatePass} >Update</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="security"
                  role="tabpanel"
                  aria-labelledby="security-tab"
                >
                  <h3 className="mb-4">Security Settings</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Login</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Two-factor auth</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="recovery"
                          />
                          <label className="form-check-label" htmlFor="recovery">
                            Recovery
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="application"
                  role="tabpanel"
                  aria-labelledby="application-tab"
                >
                  <h3 className="mb-4">Your Networks</h3>
                  <div className="container mx-0 my-3" >
                    <div className="row height d-flex justify-content-center align-items-center">
                      <div className="col-md-12 p-0">
                        <div style={{display:'flex',justifyContent:'left'}}>
                        <div className="form" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <input
                            type="text"
                            className="form-control form-input"
                            placeholder="Search Users..."
                            onChange={searchUsers}
                          />
                          <span className="left-pan" style={{padding:'1vh 1vh',backgroundColor:'#d8d7d6'}}>
                          <i className="fa fa-search" />
                          </span>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {networks ?
                      <div class="TableProfcontainer mt-2" style={{overflow:'auto'}}>
                        <table className='ProfileNetwordtable' >
                          <thead>
                            <tr>
                              <th>Sr.No.</th>
                              <th>Client Id</th>
                              <th>Name</th>
                              <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            {networks.map((user, idx) => {
                              return (
                                <tr data-toggle="modal" data-target="#exampleModalCenter" style={{cursor:'pointer'}} onClick={()=>setSelectedNetwork(user)} >
                                  <td>{idx + 1}</td>
                                  <td>{user.client_Id}</td>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                      :
                      <div className='text-center' style={{ width: '100%' }} >no netword found</div>}
                  </div>
                  <div
                        className="modal fade"
                        id="exampleModalCenter"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                    <div className="modal-dialog modal-dialog-centered " role="document" style={{maxWidth:'600px'}}>
                      <div className="modal-content shadow-lg">
                        <div className="modal-header shadow-sm" style={{backgroundColor:'#c9c9c9'}}>
                          <h5 className="modal-title" id="exampleModalLongTitle">
                            User Detail
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <table>
                            <tr>
                              <td>
                                <h6><span style={{ color: '#3f3f3f' }}>Name</span> - <span style={{ color: 'gray' }} >{selectedNetwork?.name}</span></h6>
                              </td>
                              <td>
                                <h6><span style={{ color: '#3f3f3f' }}>Client Id</span> - <span style={{ color: 'gray' }} >{selectedNetwork?.client_Id}</span></h6>
                              </td>
                            </tr>                           
                            <tr>
                              <td style={{padding:'0 1.53vh'}}>
                                <h6><span style={{ color: '#3f3f3f' }}>SK Coin ₡</span> - <span style={{ color: 'gray' }} >{selectedNetwork?.purchased_coinA || 0}</span></h6>
                              </td>
                              <td style={{padding:'0 1.53vh'}} >
                                <h6><span style={{ color: '#3f3f3f' }}>FEC Coin ₠</span> - <span style={{ color: 'gray' }} >{selectedNetwork?.purchased_coinB || 0}</span></h6>
                              </td>
                            </tr>
                            <tr>
                              <td  >
                                <h6><span style={{ color: '#3f3f3f' }}>DCT Coin ₾</span> - <span style={{ color: 'gray' }} >{selectedNetwork?.purchased_coinC || 0}</span></h6>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={{padding:'0 1.53vh'}}>
                                <h6><span style={{ color: '#3f3f3f' }}>Email</span> - <span style={{ color: 'gray' }} >{selectedNetwork?.email}</span></h6>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={{padding:'0 1.53vh'}}>
                                <h6><span style={{ color: '#3f3f3f' }}>Created Date</span> - <span style={{ color: 'gray' }} >{formattedDateAndTime(selectedNetwork?.createddatetime)}</span></h6>
                              </td>
                            </tr>
                            {console.log(selectedNetwork)}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="notification"
                  role="tabpanel"
                  aria-labelledby="notification-tab"
                >
                  <h3 className="mb-4">Notification Settings</h3>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="notification1"
                      />
                      <label className="form-check-label" htmlFor="notification1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                        accusantium accusamus, neque cupiditate quis
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="notification2"
                      />
                      <label className="form-check-label" htmlFor="notification2">
                        hic nesciunt repellat perferendis voluptatum totam porro
                        eligendi.
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="notification3"
                      />
                      <label className="form-check-label" htmlFor="notification3">
                        commodi fugiat molestiae tempora corporis. Sed dignissimos
                        suscipit
                      </label>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        : <></>}
    </div>
  )
}

export default Profile