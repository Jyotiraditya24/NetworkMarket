import React, { useEffect, useState } from 'react'
import './Wallet.css'
import { toast } from 'react-toastify';
import { localhost } from '../constant';
import handleSpinner from '../spinner';

function WalletPage({ networks, userDetail, setUserDetail }) {

    const [upiFlag, setUpiFlag] = useState(false)
    const [upi, setUpi] = useState()
    const [bank, setBank] = useState({
        accountNumber: '',
        bankName: '',
        IFSC: '',
    });
    const [paymentMethod, setPaymentMethod] = useState(true)
    const [transaction, setTransaction] = useState();
    const [currentUserTrans, setCurrentUserTrans] = useState();
    const [grandTotal, setGrandTotal] = useState();

    useEffect(() => {
        const getLatestUser = new URL(`${localhost}/getOneUser`);
        getLatestUser.searchParams.append("email", userDetail.email);
        findUser(getLatestUser);
        gettransaction(userDetail)
    }, [])

    async function findUser(url) {
        try {
            const response = await fetch(url, { method: 'GET', redirect: "follow" });
            const result = await response.json();
            setUserDetail(result.data)
            return result;
        } catch (error) {
            throw error;
        }
    }

    const withDrawBtnClick = () => {
        if (parseFloat(userDetail.balance) < 500) {
            toast.error('Minimum withdraw amount 500')
            return;
        }
        setUpiFlag(true)
    }

    const addMoneySubmit = async () => {
        toast.dismiss()
        let amt = document.getElementById('addMoneyInput').value
        if (!parseFloat(amt)) {
            toast.error('Invalid amount')
            return null
        }
        if (amt == null || amt === undefined || amt.length == 0) {
            toast.error('Please enter amount')
            document.getElementById('addMoneyInput').style.border = '1px solid red'
            return;
        }
        if (parseInt(amt) < 100) {
            toast.error('Minimum deposite amount 100')
            return;
        }
        handleSpinner(true)

        
        const url = new URL(`${localhost}/getAllTransaction`);
        let res1 = await findDetails(url);
        let li = []
        res1.message !== 'No users found' ? li = res1?.data : li = [];
        var addTransac = { name: userDetail.name, adding_amount: parseFloat(amt), withdraw_amount: 0, email: userDetail.email, client_Id: userDetail.client_Id, dateTime: getCurrentDateTime(), status: 'Requested', admin_response: 'Pending', srNo: li.length + 1, type: 'AddMoney', };
        li.push(addTransac)
        try {
            const uri = new URL(`${localhost}/addTranscations`);
            var res_ = await fetch(uri, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(addTransac) });
            var result_ = await res_.json();
            document.getElementById('addMoneyInput').value = ''
            gettransaction(userDetail);
            setTimeout(() => {
                handleSpinner(false)
                result_.message === 'Success' ? toast.success('Successfully Requested') : toast.dismiss()
            }, 1000);
        } catch (error) {

        }
    }

    const withdrawMoney = async () => {
        toast.dismiss()
        let wdamount = parseFloat(document.getElementById('withdrawamountInput').value)
        if (!wdamount) {
            toast.error('Invalid amount')
            return null
        }
        if (wdamount == null || wdamount === undefined || wdamount.length == 0) {
            toast.error('Please enter amount')
            return;
        }
        // if (parseInt(wdamount) < 500) {
        //     toast.error('Minimum Withdraw amount 500')
        //     return ;
        // }
        // if (parseFloat(wdamount) > 10000) {
        //     toast.error('Maximum Withdraw amount 10000')
        //     return ;
        // }
        if (parseFloat(wdamount) > parseFloat(userDetail?.balance)) {
            toast.error('Please add money for withdraw')
            return;
        }
        if (parseInt(wdamount) > parseInt(userDetail?.balance)) {
            toast.error('Please add money for withdraw')
            return;
        }
        if (paymentMethod && !upi) {
            toast.error('Enter Upi Credentials')
            return null
        }
        if (!paymentMethod && (!bank || !bank.accountNumber.length || !bank.IFSC.length || !bank.bankName.length)) {
            toast.error('Enter Bank Credentials')
            return null
        }
        handleSpinner(true)
        const url = new URL(`${localhost}/getAllTransaction`);
        let res1 = await findDetails(url);
        let li = []
        res1.message !== 'No users found' ? li = res1?.data : li = [];

        let method = paymentMethod ? 'UPI' : 'BANK'
        var addTransac = { name: userDetail.name, adding_amount: 0, withdraw_amount: wdamount, email: userDetail.email, client_Id: userDetail.client_Id, dateTime: getCurrentDateTime(), status: 'Requested', admin_response: 'Pending', srNo: li.length + 1, type: 'Withdraw', method: method, Upi: upi, Bank: bank };
        li.push(addTransac)
        const updTrac = new URL(`${localhost}/addTranscations`);
        const response = await fetch(updTrac, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(addTransac), });
        let result = await response.json();
        const url2 = new URL(`${localhost}/updateData`);
        url2.searchParams.append('email', userDetail.email)
        url2.searchParams.append('client_Id', userDetail.client_Id);
        let user = userDetail
        user.balance = parseFloat(user.balance) - parseFloat(wdamount)
        const resp = await fetch(url2, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user), });
        const result2 = await resp.json();
        result2.message === 'Success' ? toast.success('Successfully Requested') : toast.dismiss()
        gettransaction(userDetail);
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

    async function findDetails(url) {
        try {
            const response = await fetch(url, { method: 'GET', redirect: "follow" });
            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
    }



    const addRequest = async (url, data) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(data),
                redirect: "follow",
            };
            const response = await fetch(url, requestOptions);
            return await response.json();
        } catch (error) {
            throw error;
        }
    };

    async function getOldtransaction(userDetail) {
        console.clear()
        const url = new URL(`${localhost}/getAllTransaction`);
        let res = await findDetails(url);
        let transactionStore = [];
        let totalDeposite = 0;
        let totalWithdraw = 0;
        let tempStore = []
        res.message !== 'No users found' ? transactionStore = res?.data[0]?.transactions : transactionStore = [];
        if (transactionStore) {
            transactionStore.forEach(element => {
                if (element.client_Id === userDetail.client_Id && element.email === userDetail.email) {
                    tempStore.push(element)
                    if (element.adding_amount !== 0 && element.adding_amount && element.status === "Completed") {
                        totalDeposite += parseFloat(element.adding_amount);
                    } else {
                        if (element.status === "Completed") {
                            totalWithdraw += parseFloat(element.withdraw_amount);
                        }
                    }
                }

            });
            return tempStore;
            // setCurrentUserTrans(tempStore.reverse())
            // let obj = { totalDeposite, totalWithdraw };
            // setGrandTotal(obj);
        }
    }
    async function gettransaction(userDetail) {
        console.clear()
        var oldTransct = await getOldtransaction(userDetail);
        console.log(oldTransct)
        console.log('Old Transct is Here')
        const url = new URL(`${localhost}/getAllTransaction`);
        let res = await findDetails(url);
        let transactionStore = [];
        let totalDeposite = 0;
        let totalWithdraw = 0;
        res.message !== 'No users found' ? transactionStore = res?.data : transactionStore = [];
        if (transactionStore) {
            let tempStore = oldTransct;
            transactionStore.forEach(element => {
                if (element.client_Id === userDetail.client_Id && element.email === userDetail.email) {
                    tempStore.push(element)
                    if (element.adding_amount !== 0 && element.adding_amount && element.status === "Completed") {
                        totalDeposite += parseFloat(element.adding_amount);
                    } else {
                        if (element.status === "Completed") {
                            totalWithdraw += parseFloat(element.withdraw_amount);
                        }
                    }
                }

            });
            setCurrentUserTrans(tempStore.reverse())
            let obj = { totalDeposite, totalWithdraw };
            setGrandTotal(obj);
        }
    }


    return (
        <div style={{ width: '100%' }}>
            <div className="wrappper">
                <ul className="tab-wrap">
                    <li>
                        <input type="radio" id="tab-1" name="tab" defaultChecked="true" />
                        <label htmlFor="tab-1">Available Balance</label>
                        <div className="tab-content">

                            <br />
                            <div>
                                <h2 style={{ float: 'left', padding: '1vh' }} > Balance : {userDetail.balance && userDetail?.balance >= 0 ? userDetail.balance : '0.00'} &#8377;&nbsp;&nbsp; <i className="mdi mdi-information menu-icon p-3" title="Minimum withdraw 100" style={{ fontSize: '1.5rem' }} ></i></h2>
                                <div style={{ width: '100%', textAlign: 'right', padding: '1vh' }}>
                                    <button className="animated-button" style={{ letterSpacing: '2px' }} onClick={withDrawBtnClick} >
                                        <span>Withdraw</span>
                                        <span />
                                    </button>
                                </div>
                            </div>
                            <br />
                            <h3 style={{ padding: '1vh', paddingBottom: '0' }} > Total deposite : {grandTotal?.totalDeposite <= 0 ? '0' : grandTotal?.totalDeposite || 0} ₹</h3><br />
                            <h3 style={{ padding: '1vh', paddingTop: '0' }} > Total withdraw : {grandTotal?.totalWithdraw <= 0 ? '0' : grandTotal?.totalWithdraw || 0} ₹</h3>
                            {upiFlag ?
                                <div style={{ padding: '1vh' }} >
                                    <div className='row'>
                                        {paymentMethod ?
                                            <div className='col-md-12' >
                                                <h5 >UPI Id</h5>
                                                <input type='text' className='bg-transparent border border-white rounded-3 px-3 text-white' placeholder='Enter upi id' style={{ color: 'white', padding: '2px' }} onChange={(e) => setUpi(e.target.value)}></input>
                                            </div>
                                            :
                                            <div className='col-md-12 row' >

                                                <div className='col-md-4'>
                                                    <h5 className='pt-3'>Account Number</h5>
                                                    <input type='text' className='bg-transparent border border-white rounded-3 px-3 text-white' placeholder='Enter upi id' style={{ color: 'white', padding: '2px' }} onChange={(e) => {
                                                        let b = bank;
                                                        b.accountNumber = e.target.value;
                                                        setBank(b)
                                                    }}></input>
                                                </div>

                                                <div className='col-md-4' >
                                                    <h5 className='pt-3' >Bank Name</h5>
                                                    <input type='text' className='bg-transparent border border-white rounded-3 px-3 text-white' placeholder='Enter upi id' style={{ color: 'white', padding: '2px' }} onChange={(e) => { let b = bank; b.bankName = e.target.value; setBank(b) }} ></input>
                                                </div>

                                                <div className='col-md-4' >
                                                    <h5 className='pt-3' >IFSC Code</h5>
                                                    <input type='text' className='bg-transparent border border-white rounded-3 px-3 text-white' placeholder='Enter upi id' style={{ color: 'white', padding: '2px' }} onChange={(e) => { let b = bank; b.IFSC = e.target.value; setBank(b) }}></input>
                                                </div>
                                            </div>
                                        }


                                        <div className='col-md-12 mt-3' >
                                            <input type='text' className='bg-transparent border border-white rounded-3 px-3 text-white' placeholder='Enter amount' style={{ color: 'white', padding: '2px' }} id='withdrawamountInput'></input>
                                            <select className='m-1' style={{ padding: '0.6vh' }} onChange={e => {
                                                e.target.value === 'upi' ? setPaymentMethod(true) : setPaymentMethod(false)
                                            }} >
                                                <option value={'upi'}>UPI</option>
                                                <option value={'Bank'}>Bank</option>
                                            </select>
                                        </div>
                                        <div className='col-md-12 mt-3' >
                                            <button type="button" class="btn btn-secondary" onClick={withdrawMoney}>Withdrawl Request</button>
                                        </div>
                                    </div>
                                </div>
                                : ''}
                        </div>
                    </li>
                    <li>
                        <input type="radio" id="tab-2" name="tab" />
                        <label htmlFor="tab-2">Referral Earning</label>
                        <div className="tab-content">
                            <h2>Earning : {userDetail.network_earn ? userDetail.network_earn : '0.00'} &#8377;</h2>
                            <p>
                                {networks ?
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Sr.No</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Account type</th>
                                                <th scope="col">Created Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {networks.map((user, idx) => {
                                                return (
                                                    user.accountstatus === 'Activated' ?
                                                        <tr key={idx}>
                                                            <th scope="row">{idx + 1}</th>
                                                            <td>{user.name}</td>
                                                            <td>{user.accounttype}</td>
                                                            <td>{user.createddatetime}</td>
                                                        </tr> : <></>
                                                )
                                            })}
                                        </tbody>
                                    </table> : <div className='text-center'>No Referrals found</div>
                                }
                            </p>
                        </div>
                    </li>
                    <li>
                        <input type="radio" id="tab-3" name="tab" />
                        <label htmlFor="tab-3">Add Money</label>
                        <div className="tab-content">
                            <h3 className='text-center' >Enter your amount :  <input className='mx-4' type='number' style={{ maxWidth: '15vh', borderRadius: '4px', fontSize: '1.2rem', textAlign: 'right' }} onChange={(e) => e.target.style.border = '1px solid transparent'} id='addMoneyInput' placeholder='1000.00' /></h3>
                            <div style={{ placeContent: 'center', display: 'flex' }} className='mt-3 pt-4' >
                                <img src='../../assets/images/QR_Code.png' style={{ boxShadow: '0 0 10px white;' }} />
                            </div>
                            <p style={{ textAlign: 'center' }} className='pt-4' >Pay money on this QR code and submit </p>
                            <div className='text-center'>
                                <button type="button" class="btn btn-success" onClick={addMoneySubmit} >Add Money</button>
                            </div>
                            <div>
                                {currentUserTrans && currentUserTrans.length > 0 ?
                                    <div style={{ maxHeight: '50vh', overflow: 'auto' }} className='mt-5' >
                                        <table className='mt-3' >
                                            <tr>
                                                <th className='p-2' >Sr.No.</th>
                                                <th className='p-2' >Amount</th>
                                                <th className='p-2' >Date and Time</th>
                                                <th className='p-2' >Action</th>
                                                <th className='p-2' >Status</th>
                                            </tr>
                                            {currentUserTrans.map((req, idx) => {
                                                return (
                                                    <tr  >
                                                        <td>{idx + 1}</td>
                                                        <td>{req.type === 'Withdraw' ? req.withdraw_amount : req.adding_amount} &#8377;</td>
                                                        <td>{req.dateTime}</td>
                                                        <td>{req?.type}</td>
                                                        <td>{req.status === 'Completed' ? <span style={{ color: 'limegreen' }}>{req.status}</span> : req.status === 'Requested' ? <span style={{ color: 'yellow' }} >{req.status}</span> : <span style={{ color: 'red' }} >{req.status}</span>}</td>
                                                    </tr>
                                                )
                                            })}
                                        </table>
                                    </div> :
                                    <div></div>}
                            </div>
                        </div>

                    </li>
                </ul>
            </div>

        </div>
    )
}

export default WalletPage