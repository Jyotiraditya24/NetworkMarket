import React, { useEffect, useState } from 'react';
import './Admin.css';
import handleSpinner from '../spinner';
import { toast } from 'react-toastify';
import { localhost } from '../constant';

function Admin() {
    const [userDetail, setUserDetail] = useState(null);
    const [requested, setRequested] = useState(null);
    const [allCoins, setAllCoins] = useState();
    const [newPrice, setNewPrice] = useState()
    const [selectedCoin, setSelectedCoin] = useState('CoinA')
    const [coinIndex, setCoinIndex] = useState(0)
    const [allTransaction, setAlltransaction] = useState();
    const [addMoneyTranaction, setAddMoneyTranaction] = useState()
    const [withdrawlTranaction, setWithdrawlTranaction] = useState()
    const [newStock,setNewStock] = useState();
    const [selectedStock,setSelectedStock] = useState('CoinA_Stock');
    const [allUserDetails,setAllUserDetails] = useState([]);

    useEffect(() => {
        const getUserDetails = () => {
            const storedUserDetail = JSON.parse(localStorage.getItem('Purple'));
            if (storedUserDetail) {
                setUserDetail(storedUserDetail);
                getNewRequests();
                getCoinsPrices()
            } else {
                window.location.href = '/Login';
            }
        };

        getUserDetails();
        gettransaction()
    }, []);

    const getNewRequests = async () => {
        const url = new URL(`${localhost}/getUsersByQuery`);
        url.searchParams.append('accountstatus', 'Pending');

        try {
            const response = await fetch(url, { method: 'GET', redirect: 'follow' });
            const result = await response.json();
            if (Array.isArray(result.data)) {
                setRequested(result.data);
            } else {
                setRequested([]);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getCoinsPrices = async () => {
        const url = new URL(`${localhost}/getOneCoin`);
        url.searchParams.append('_id', '64b7f0e78145e109939337bf')
        const response = await fetch(url, { method: 'GET', redirect: 'follow' });
        const result = await response.json();
        if (result.message === 'Success')
            setAllCoins(result.data)
    }

    const updateCoinPricefun = async (e) => {
        handleSpinner(true)
        var coinName = e.target.name;
        let updateCoinUrl = new URL(`${localhost}/updateCoin`);
        updateCoinUrl.searchParams.append('_id', '64b7f0e78145e109939337bf');
        let oldCoin = allCoins[coinName];
        var updatePriceobj = {todayPrice :  parseFloat(newPrice), yesterdayPrice : allCoins[selectedCoin]?.[allCoins[selectedCoin].length-1].todayPrice ,'Date':getCurrentDateTime()}
        oldCoin.push(updatePriceobj)
        var convertIntoObj = { [coinName]: oldCoin };
        const response = await fetch(updateCoinUrl, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(convertIntoObj) });
        const data = await response.json();
        if (data.message === 'Success') {
            toast.success('Coin Updated Successfully')
        } else {
            toast.error('Something went wrong')
        }
        handleSpinner(false)
    }


    const updateStocks = async (e) => {
        handleSpinner(true)
        var stockCoin = e.target.name;
        let updateCoinUrl = new URL(`${localhost}/updateCoin`);
            updateCoinUrl.searchParams.append('_id', '64b7f0e78145e109939337bf');        
        var convertIntoObj = { [stockCoin]: parseFloat(newStock) };
        const response = await fetch(updateCoinUrl, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(convertIntoObj) });
        const data = await response.json();
        if (data.message === 'Success') {
            toast.success('Coin Updated Successfully')
        } else {
            toast.error('Something went wrong')
        }
        handleSpinner(false)
    }

    const activateThis = (e) => {
        sendForUpdate(requested[e.target.id], e.target.id);
    };

    const sendForUpdate = async (user, idx) => {
        try {
            handleSpinner(true);
            let sendForUpdateList = [];

            // Get Parent User Related Activator User
            const getParentUserUrl = new URL(`${localhost}/getOneUser`);
            getParentUserUrl.searchParams.append("client_Id", user.parent_client_Id);
            let res1 = await findUser(getParentUserUrl);

            // Update Networking earning and Wallet balance of Parent User
            let halfMoney = user.plan_pricing ? parseFloat(user.plan_pricing) / 2 : 0;
            let parentUser = res1.data;
            parentUser.network_earn = parentUser.network_earn ? parseFloat(parentUser.network_earn) + halfMoney : halfMoney;
            parentUser.balance = parentUser.balance ? parseFloat(parentUser.balance) + halfMoney : halfMoney;
            delete parentUser.profileimg
            sendForUpdateList.push({ filter: parentUser.email, values: parentUser })

            // Update Current User Account Status that Activated
            user.accountstatus = 'Activated';
            
            delete user.profileimg;
            sendForUpdateList.push({ filter: user.email, values: user });

            // Add Money in Owner or Admin Account
            const getAdminUrl = new URL(`${localhost}/getOneUser`);
            getAdminUrl.searchParams.append("email", userDetail.email);
            let res2 = await findUser(getAdminUrl);
            let admin = res2.data
            admin.network_earn = admin.network_earn ? parseFloat(admin.network_earn) + halfMoney : halfMoney;
            admin.balance = admin.balance ? parseFloat(admin.balance) + halfMoney : halfMoney;
            delete admin.profileimg;
            sendForUpdateList.push({ filter: admin.email, values: admin });


            const dataToUpdate = sendForUpdateList;
            var url = new URL(`${localhost}/updateManyData`)
            const response = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataToUpdate), });

            const data = await response.json();

            handleSpinner(false);
            if (data.message === 'Data not found') {
                toast.error('Invalid email address');
            } else {
                toast.success('Activated successfully');
                let tempStore = user
                let userD = [...requested];
                userD.splice(idx, 1);
                setRequested(userD)
                var sendMail = new URL(`${localhost}/sendUserCLientId`)
                const resp = await fetch(sendMail, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: tempStore.email, client_Id: tempStore.client_Id }) });
                const res = await resp.json();

            }
        } catch (error) {
            handleSpinner(false);
            toast.error('Something went wrong');
        }
    };



    async function findUser(url) {
        try {
            const response = await fetch(url, { method: 'GET', redirect: "follow" });
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }

    const approveTransactoin = async (action,transct) => {
        handleSpinner(true)
        var status = action
        console.log(action,transct)
        // let transactions = [...allTransaction];
        // transactions[idx].status = status
        let transactionDetail = transct
        const url = new URL(`${localhost}/getOneUser`);
        url.searchParams.append("client_Id", transactionDetail.client_Id);
        url.searchParams.append("email", transactionDetail.email);
        const res = await findDetails(url);
        let user = res.message === 'Success' ? res.data : 'null';
        if (status === 'Completed') {
            if (transactionDetail.type === 'Withdraw') {
                user.balance = user.balance ? parseFloat(user.balance) - parseFloat(transactionDetail.withdraw_amount) : 0;
            } else {
                user.balance = user.balance ? parseFloat(user.balance) + parseFloat(transactionDetail.adding_amount) : 0 + parseFloat(transactionDetail.adding_amount);
            }
        }
        if (status === 'Rejected') {
            if (transactionDetail.type === 'Withdraw') {
                user.balance = user.balance ? parseFloat(user.balance) + parseFloat(transactionDetail.withdraw_amount) : parseFloat(transactionDetail.withdraw_amount);
            }
        }
        const url2 = new URL(`${localhost}/updateData`);
        url2.searchParams.append('email', user.email)
        url2.searchParams.append('client_Id', user.client_Id);

        const resp = await fetch(url2, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user), });
        const result = await resp.json();

        status === 'Completed' ? result.message === 'Success' ? toast.success('Successfully Approved') : toast.error('Something went wrong') : toast.dismiss()
        status === 'Rejected' ? result.message === 'Success' ? toast.success('Successfully Rejected') : toast.error('Something went wrong') : console.log()

        // const upd = new URL(`${localhost}/updateTransactions`);
        // upd.searchParams.append('_id', '64b8558d0640a2f174ef4f40');
        // const dataToUpdate = { transactions: transactions };
        // const response = await fetch(upd, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataToUpdate), });
        // const data = await response.json();
        transct.status = status;
        const updTrc = new URL(`${localhost}/updateTransact`);
        updTrc.searchParams.append("_id",transct._id);
        const response = await fetch(updTrc, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(transct), });
        await response.json();
        gettransaction()
        handleSpinner(false)
    }




    const getCurrentDateTime = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12;
        const formattedDateAndTime = `${year}-${month}-${day} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
        return formattedDateAndTime;
    }

    const setCoins = (e) => {
        setSelectedCoin(e.target.value);
    };
    const setStocks = (e) => {
        setSelectedStock(e.target.value);
    };

    useEffect(() => {
    }, [coinIndex, allTransaction]); // Run this effect whenever coinIndex changes

    async function gettransaction() {
        console.clear()
        console.log('After Clear')
        const url = new URL(`${localhost}/getTransactions`);
        let res = await findDetails(url);
        let transactionStore = [];
        res.message !== 'No users found' ? transactionStore = res?.data : transactionStore = [];
        if (transactionStore) {
            let tempStore = []
            let tempStore2 = []
            transactionStore.forEach(element => {
                if (element.status === 'Requested' && element.type === 'AddMoney')
                    tempStore.push(element)
                if (element.status === 'Requested' && element.type === 'Withdraw')
                    tempStore2.push(element)
            });
            setAddMoneyTranaction(tempStore)
            setAlltransaction(transactionStore)
            setWithdrawlTranaction(tempStore2)
        }
    }

    async function findDetails(url) {
        try {
            const response = await fetch(url, { method: 'GET', redirect: "follow" });
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }
   
    async function getAllUserDetails() {
        console.clear();
        const url = new URL(`${localhost}/getAllUser`);
        try {
            const response = await fetch(url, { method: "GET", redirect: "follow" });
            const result = await response.json();
            setAllUserDetails(result.data);
          } catch (error) {
            throw error;
          }
    }

    function formattedDateAndTime(dateStr) {
        const dateTime = new Date(dateStr);
        const formattedDateTimeSTR = dateTime.toLocaleString();
        return formattedDateTimeSTR;
    }

    return (
        <div style={{ width: '100%' }}>
            {/* <button onClick={insertCoin} >Add Price</button> */}
            <div className="text-right"><a href="/Form" >Insert Users</a></div>


            {!requested || requested.length === 0 ? (
                <div className='text-center mt-3 p-3 ' style={{ background: 'chocolate' }}>No Account create request found</div>
            ) : (
                <section className='AdminTablebg'>
                    <h1 className='p-4' >Create Account Requests</h1>
                    <div className="tbl-header tbl-content">
                        <table cellPadding={0} cellSpacing={0} border={0}>
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Created Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requested.map((user, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{formattedDateAndTime(user.createddatetime)}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary" id={idx} onClick={activateThis} >Activate</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}


            {!addMoneyTranaction || addMoneyTranaction.length === 0 ? (

                <div className='text-center mt-5 p-3 ' style={{ background: 'chocolate' }}>No Add money Request Found</div>
            ) : (
                <section className='AdminTablebg mt-5' style={{ background: 'linear-gradient(to right, #32423b, #657d7f)' }} >
                    <h1 className='p-4' >Money Adding Requests</h1>
                    <div className="tbl-header tbl-content">
                        <table cellPadding={0} cellSpacing={0} border={0}>
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Payment Date</th>
                                    <th colSpan={2} className='text-center' >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {addMoneyTranaction.map((transct, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{transct.name}</td>
                                        <td>{transct.email}</td>
                                        <td>{transct.adding_amount} &#8377;</td>
                                        <td>{transct.dateTime}</td>
                                        <td>
                                            <button type="button" name='Completed' className="btn btn-primary" id={transct.srNo} onClick={(e)=>{
                                                var action = e.target.name;
                                                approveTransactoin(action,transct)
                                            }} >Approve</button>
                                        </td>
                                        <td>
                                            <button type="button" name='Rejected' className="btn btn-primary" id={transct.srNo} onClick={(e)=>{
                                                var action = e.target.name;
                                                approveTransactoin(action,transct)
                                            }} >Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {!withdrawlTranaction || withdrawlTranaction.length === 0 ? (

                <div className='text-center mt-5 p-3 mb-5' style={{ background: 'chocolate' }}>No Withdraw money Request Found</div>
            ) : (
                <section className='AdminTablebg mt-5' style={{ background: 'linear-gradient(to right, #32423b, #657d7f)' }} >
                    <h1 className='p-4' >Withdraw Requests</h1>
                    <div className="tbl-header tbl-content">
                        <table cellPadding={0} cellSpacing={0} border={0}>
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>UPI</th>
                                    <th>Bank Name</th>
                                    <th>Account Number</th>
                                    <th>Requested Date</th>
                                    <th colSpan={2} className='text-center' >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawlTranaction.map((transct, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{transct.name}</td>
                                        <td>{transct.email}</td>
                                        <td>{transct.withdraw_amount} &#8377;</td>
                                        <td>{transct.Upi}</td>
                                        <td>{transct?.Bank?.accountNumber}</td>
                                        <td>{transct?.Bank?.IFSC}</td>
                                        <td>{transct.dateTime}</td>
                                        <td>
                                            <button type="button" name='Completed' className="btn btn-primary" id={transct.srNo} onClick={(e)=>{
                                                var action = e.target.name;
                                                approveTransactoin(action,transct)
                                            }} >Approve</button>
                                        </td>
                                        <td>
                                            <button type="button" name='Rejected' className="btn btn-primary" id={transct.srNo} onClick={(e)=>{
                                                var action = e.target.name;
                                                approveTransactoin(action,transct)
                                            }} >Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* <div style={{ margin: '2vh' }}>
                {allCoins ? (
                    <button>
                        Current Price: {allCoins[selectedCoin]?.todayPrice}
                    </button>
                ) : null}
                <select onChange={setCoins}>
                    <option value="CoinA">CoinA</option>
                    <option value="CoinB">CoinB</option>
                    <option value="CoinC">CoinC</option>
                </select>

                <input onChange={(e) => setNewPrice(e.target.value)} ></input>
                <button onClick={updateCoinPricefun} name={selectedCoin} id={selectedCoin} >Update Coin Price</button>
            </div> */}
            <div style={{ margin: '2vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              <div className='mt-2'>
              {allCoins ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
                            Current Price: {allCoins[selectedCoin]?.[allCoins[selectedCoin].length-1].todayPrice}
                        </button>
                    </div>
                ) : null}

                <select style={{ marginBottom: '1rem', padding: '10px', width: '200px', borderRadius: '5px' }} onChange={setCoins}>
                    <option value="CoinA"> SK Coin ₡</option>
                    <option value="CoinB"> FEC Coin ₠</option>
                    <option value="CoinC"> DCT Coin ₾</option>
                </select>

                <input
                    type="number"
                    placeholder="Enter new price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    style={{ marginBottom: '1rem', padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
                />

                <button
                    onClick={updateCoinPricefun}
                    name={selectedCoin}
                    id={selectedCoin}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28A745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Update Coin Price
                </button>               
                
              </div>



              <div className='mt-2'>
              {allCoins ? (
                    <div style={{ marginBottom: '1rem' }}>
                        <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
                            Available Stock : {allCoins ? allCoins[selectedStock]:' 0'}
                        </button>
                    </div>
                ) : null}

                <select style={{ marginBottom: '1rem', padding: '10px', width: '200px', borderRadius: '5px' }} onChange={setStocks}>
                    <option value="CoinA_Stock"> SK Coin ₡</option>
                    <option value="CoinB_Stock"> FEC Coin ₠</option>
                    <option value="CoinC_Stock"> DCT Coin ₾</option>
                </select>

                <input
                    type="number"
                    placeholder="New Stock"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    style={{ marginBottom: '1rem', padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
                />

                <button
                    onClick={updateStocks}
                    name={selectedStock}
                    id={selectedStock}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28A745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Update Stock Coin
                </button>                
                
              </div>
            </div>

            <div className='text-left'>
                <button type="button" class={`btn btn-secondary text-dark ${allUserDetails.length > 0 ? 'd-none':''}`} onClick={getAllUserDetails}>Show All User Details</button>
                <br />
                <div className={`${allUserDetails && allUserDetails.length > 0 ? 'mt-5' :'mt-5 d-none'}`}  >
                    <h3>Total Users: {allUserDetails.length}</h3>
                    <div style={{height:'30rem',overflow:'auto'}} className='remove-scrollbar shadow-lg'>
                    <table class="table">
                        <thead class="thead-light">
                            <tr style={{position:'sticky',top:'0'}} >
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Number</th>
                                <th scope="col">Password</th>
                                <th scope="col">SK Coins ₡</th>
                                <th scope="col">FEC Coins ₠</th>
                                <th scope="col">DCT Coins ₾</th>
                                <th scope="col">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUserDetails.map((user) => {
                                return (
                                    <tr key={user.email}>
                                        <th title='Name' scope="row" className='text-dark'>{user.name}</th>
                                        <td title='Email' className='text-dark' >{user.email}</td>
                                        <td title="Phone" className='text-dark' >{user.phone}</td>
                                        <td title='Password' className='text-dark'>{user.password}</td>
                                        <td title='Coin' className='text-dark'>{user.purchased_coinA}</td>
                                        <td title='Coin' className='text-dark'>{user.purchased_coinB}</td>
                                        <td title='Coin' className='text-dark'>{user.purchased_coinC}</td>
                                        <td title='Balance' className='text-dark'>{user.balance}</td>
                                    </tr>
                                )
                            })} 
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
