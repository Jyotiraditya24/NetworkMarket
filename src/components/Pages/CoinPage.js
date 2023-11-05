import React, { useEffect, useState } from 'react'
import './CoinPage.css'
import { localhost } from '../constant';
import { toast } from 'react-toastify';
import handleSpinner from '../spinner';
import { Chart } from "react-google-charts";

function CoinPage({ userDetail }) {
    const [allCoins, setAllCoins] = useState();
    const [selectedCoin, setSelectedCoin] = useState('CoinA')
    const [selectedStock, setSelectedStock] = useState('CoinA_Stock')
    const [onBuyOrSell, setOnBuyOrSell] = useState(0);
    const [graph, setGraph] = useState({ Date: [], Price: [] });
    const [congratulationModal,setCongratulationModal] = useState(false);
    const [congratulationFor,setCongratulationFor] = useState('')
    const [referenceText,setRefenceText] = useState('');

    useEffect(() => {
        getCoinsPrice();
    }, [])


    const buy = async e => {
        
        toast.dismiss()
        var coinName = e.target.id
        var value = document.getElementById('CoinIputForBuyOrSell').value
        
        if (parseFloat(userDetail.balance) < parseFloat(allCoins[coinName]?.[allCoins[coinName].length - 1].todayPrice) * parseFloat(value)) {
            toast.error('Please add more money to buy ' + value + ' coin')
            return null;
        }
        if (!parseFloat(value)) {
            toast.error('Something went wrong')
            return null
        }
        if (parseFloat(value) <= 0) {
            toast.error('Invalid coins input')
            return null
        }
        let coin = ''
        if (coinName === 'CoinA') {
            coin = 'purchased_coinA'
        } else if (coinName === 'CoinB') {
            coin = 'purchased_coinB'
        } else if (coinName === 'CoinC') {
            coin = 'purchased_coinC'
        }
        
        if( parseFloat(allCoins[selectedStock]) < parseFloat(value)) {
            toast.error('Out of Stock Coins ')
            return null;
        }
      
        let oldPurchaed = userDetail[coin]
        let user = userDetail;
        if (oldPurchaed) {
            user[coin] = parseFloat(user[coin]) + parseFloat(value)
        } else {
            user[coin] = parseFloat(value)
        }
        user.balance = parseFloat(user.balance) - parseFloat(allCoins[coinName]?.[allCoins[coinName].length - 1].todayPrice) * parseFloat(value)
        if (user.balance < 0) {
            toast.error('Something went wrong contact us')
            return null
        }
        
        var coinHistory = user?.CoinHistory || [];
            coinHistory.push({id:generateRandomString(10), name:referenceText,coinQuantity:value , price: parseFloat(allCoins[coinName]?.[allCoins[coinName].length - 1].todayPrice),coin:coinName , time: new Date(), type: 'Buy' })
        user['CoinHistory'] = coinHistory;
        handleSpinner(true)
        const url2 = new URL(`${localhost}/updateData`);
        url2.searchParams.append('email', user.email)
        url2.searchParams.append('client_Id', user.client_Id);

        const resp = await fetch(url2, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user), });
        const result = await resp.json();
        result.message === 'Success' ? toast.success('Coin purchased successfully') : toast.error('Something went wrong')
        if (result.message === 'Success') {
            setCongratulationFor('purchased');
            setCongratulationModal(true);
        }
        document.getElementById('CoinIputForBuyOrSell').value = 0;
        setOnBuyOrSell(0)
        handleSpinner(false)

        handleSpinner(true)
        let updateCoinUrl = new URL(`${localhost}/updateCoin`);
            updateCoinUrl.searchParams.append('_id', '64b7f0e78145e109939337bf');        
        var convertIntoObj = { [selectedStock]: parseFloat(allCoins[selectedStock]) - parseFloat(value) };
        const response = await fetch(updateCoinUrl, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(convertIntoObj) });
        const data = await response.json();
        setAllCoins(data.data)
        handleSpinner(false)

    }

    const sell = async e => {
        toast.dismiss()
        var coinName = e.target.id
        var value = document.getElementById('CoinIputForBuyOrSell').value
        if (parseFloat(value) <= 0) {
            toast.error('Invalid coin enter for sell')
            return null
        }
        if (!parseFloat(value)) {
            toast.error('Something went wrong')
            return null
        }
        let coin = ''
        if (coinName === 'CoinA') {
            coin = 'purchased_coinA'
        } else if (coinName === 'CoinB') {
            coin = 'purchased_coinB'
        } else if (coinName === 'CoinC') {
            coin = 'purchased_coinC'
        }
        let price = userDetail ? userDetail[coin] : '0' ;
        price = price === null || price === undefined || price === NaN || price === 'NaN' ? 0 : price;
        if (parseFloat(value) > parseFloat(price)) {
            toast.error('You can\'t have ' + value + ' coins to sell')
            return null;
        }
        let user = userDetail;
        user.balance = parseFloat(user.balance) + parseFloat(value) * parseFloat(allCoins[coinName]?.[allCoins[coinName].length - 1].todayPrice)
        user[coin] = parseFloat(user[coin]) - parseFloat(value);
        var coinHistory = user?.CoinHistory || [];
            coinHistory.push({id:generateRandomString(10), name:referenceText,coinQuantity:value , price: parseFloat(allCoins[coinName]?.[allCoins[coinName].length - 1].todayPrice),coin:coinName , time: new Date(), type: 'Sell' })
        user['CoinHistory'] = coinHistory;
        handleSpinner(true)
        const url2 = new URL(`${localhost}/updateData`);
        url2.searchParams.append('email', user.email)
        url2.searchParams.append('client_Id', user.client_Id);

        const resp = await fetch(url2, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user), });
        const result = await resp.json();
        result.message === 'Success' ?  toast.success('Coin Selled successfully') : toast.error('Something went wrong')
        if (result.message === 'Success') {
            setCongratulationFor('Selled');
            setCongratulationModal(true);
        }
        document.getElementById('CoinIputForBuyOrSell').value = 0;
        handleSpinner(false)
        handleSpinner(true)
        
        let updateCoinUrl = new URL(`${localhost}/updateCoin`);
            updateCoinUrl.searchParams.append('_id', '64b7f0e78145e109939337bf');        
        var convertIntoObj = { [selectedStock]: parseFloat(allCoins[selectedStock]) + parseFloat(value) };
        const response = await fetch(updateCoinUrl, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(convertIntoObj) });
        const data = await response.json();
        setAllCoins(data.data)
        handleSpinner(false)
    }

    const getCoinsPrice = async () => {
        const url = new URL(`${localhost}/getOneCoin`);
        url.searchParams.append('_id', '64b7f0e78145e109939337bf')
        const response = await fetch(url, { method: 'GET', redirect: 'follow' });
        const result = await response.json();
        if (result.message === 'Success') {
            setAllCoins(result.data)
            createGraph(result.data['CoinA'])
        }
    }

    const bargenCoin = (e) => {
        let walletValue = userDetail.balance
        let type = e.target.name;
        let value = e.target.value
        let coinName = selectedCoin

        if (type === 'buy') {
            let onB = parseFloat(allCoins[coinName]?.[allCoins[coinName].length - 1].todayPrice) * parseFloat(value)
            setOnBuyOrSell(onB)
        } else if (type === 'sell') {
            let onS = parseFloat(allCoins[coinName]?.[allCoins[coinName].length - 1].todayPrice) * parseFloat(value)
            setOnBuyOrSell(onS)
        }
    }

    const createGraph = (coinList) => {
        let dateList = [];
        let priceList = [];

        // coinList.reverse();
        const limitedItems = coinList.slice(0, coinList.length); // Extract the first 10 items

        limitedItems.forEach((item) => {
            dateList.push(item.Date.slice(0, 10));
            priceList.push(item.todayPrice);
        });

        let obj = { Date: dateList, Price: priceList };
        setGraph(obj);
    };

    const coinOnChange = (coin) => {
        setSelectedCoin(coin)
        createGraph(allCoins[coin])
    }

    const dataWithColor = graph.Date.map((date, index) => {
        const price = graph.Price[index];
        const prevPrice = graph.Price[index - 1];
        if (index === 0) {
            return [date, price, 'green']; // Assuming the first data point is always green
        } else if (price > prevPrice) {
            return [date, price, 'green'];
        } else if (price < prevPrice) {
            return [date, price, 'red'];
        } else {
            return [date, price, 'gray']; // If the price is the same as the previous one, use gray
        }
    });

    function formattedDateAndTime(dateStr) {
        const dateTime = new Date(dateStr);
        const formattedDateTimeSTR = dateTime.toLocaleString();
        return formattedDateTimeSTR;
    }
 
      
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        return result;
      }
      
      

    return (
        <div style={{ width: '100%' }}>
            <style>
                {` 
               .coinTable{
               }
               .coinTable th{
                padding:1vh;    
                font-size:1.2rem;      
                width:2vh;
                color:white;
                border-radius:5px;
                margin:1vh;
               }
               .coinTable td{
                 background-color:white;
               }
               .coinTable td:hover{
                background-color:whitesmoke;
              }
              .coinInput {
                border-radius: 3px;
                padding: 1vh;
               }
            
              .coinInput:onfocus {
                border-radius: 3px;
                padding: 1vh;
                border: 1px solid black;
                background:alicblue;
               }
              `}
            </style>
            {allCoins ?


                <div className="tabs">
                    <input type="radio" name="tabs" id="tabone" defaultChecked="checked" onChange={() => {coinOnChange('CoinA');setSelectedStock('CoinA_Stock')}} />
                    <label htmlFor="tabone"> SK Coin ₡</label>
                    <div className="tab text-left">
                        <h4 style={{ color: 'black', borderBottom: '1px solid black' }} className='p-2'>Today's Price :  {allCoins ? allCoins['CoinA']?.[allCoins['CoinA'].length - 1].todayPrice : ''} ₡</h4>
                        <h4 style={{ color: 'black', borderBottom: '1px solid black' }} className='p-2'>Yesterday's Price :  {allCoins ? allCoins['CoinA']?.[allCoins['CoinA'].length - 1].yesterdayPrice : ''} ₡</h4>
                        <p className='px-2' >Available Coins ( Stock ) : {allCoins ? allCoins?.CoinA_Stock: ' 0 '} ₡ &nbsp;||&nbsp;{userDetail && userDetail.purchased_coinA ? ' Owned CoinSpectra : ' + userDetail.purchased_coinA : ' Owned CoinSpectra : 0'}  ₡</p>
                    </div>
                    <input type="radio" name="tabs" id="tabtwo" onChange={() => {coinOnChange('CoinB');setSelectedStock('CoinB_Stock')}} />
                    <label htmlFor="tabtwo"> FEC Coin ₠</label>
                    <div className="tab text-left">
                        <h4 style={{ color: 'black', borderBottom: '1px solid black' }} className='p-2'>Today's Price :  {allCoins ? allCoins['CoinB']?.[allCoins['CoinB'].length - 1].todayPrice : ''} ₠</h4>
                        <h4 style={{ color: 'black', borderBottom: '1px solid black' }} className='p-2'>Yesterday's Price :  {allCoins ? allCoins['CoinB']?.[allCoins['CoinB'].length - 1].yesterdayPrice : ''} ₠</h4>
                        <p className='px-2' >Available Coins ( Stock ) : {allCoins ? allCoins?.CoinB_Stock: ' 0 '} ₠ &nbsp;||&nbsp;{userDetail && userDetail.purchased_coinB ? ' Owned CoinSpectra : ' + userDetail.purchased_coinB : ' Owned CoinSpectra : 0'}  ₠</p>
                        {/* <p className='px-2' >{userDetail && userDetail.purchased_coinB ? ' Owned CoinCove : ' + userDetail.purchased_coinB : ' Owned CoinCove : 0'} ₠</p> */}
                    </div>
                    <input type="radio" name="tabs" id="tabthree" onChange={() => {coinOnChange('CoinC');setSelectedStock('CoinC_Stock')}} />
                    <label htmlFor="tabthree"> DCT Coin ₾</label>
                    <div className="tab text-left">
                        <h4 style={{ color: 'black', borderBottom: '1px solid black' }} className='p-2'>Today's Price :  {allCoins ? allCoins['CoinC']?.[allCoins['CoinC'].length - 1].todayPrice : ''} ₾</h4>
                        <h4 style={{ color: 'black', borderBottom: '1px solid black' }} className='p-2'>Yesterday's Price :  {allCoins ? allCoins['CoinC']?.[allCoins['CoinC'].length - 1].yesterdayPrice : ''} ₾</h4>
                        <p className='px-2' >Available Coins ( Stock ) : {allCoins ? allCoins?.CoinC_Stock: ' 0 '} ₾ &nbsp;||&nbsp;{userDetail && userDetail.purchased_coinC ? ' Owned CoinSpectra : ' + userDetail.purchased_coinC : ' Owned CoinSpectra : 0'}  ₾</p>
                        {/* <p className='px-2' >{userDetail && userDetail.purchased_coinC ? ' Owned CoinMosaic : ' + userDetail.purchased_coinC : ' Owned CoinMosaic : 0'} ₾</p> */}

                    </div>
                </div>
                : <></>}
            <div className='text-left px-3 py-1' >
                Available Balance = {userDetail.balance} &#8377;
            </div>

            {graph ?
                <>
                    <Chart
                        chartType="AreaChart" // Change 'ScatterChart' to 'AreaChart'
                        data={[['Date', 'Price'], ...graph.Date.map((date, index) => [date, graph.Price[index]])]}
                        width="100%"
                        height="400px"
                        legendToggle
                    />
                    <Chart
                        chartType="AreaChart" // Use 'AreaChart' to show the area fill (shadow)
                        data={[['Date', 'Price', { role: 'style' }], ...dataWithColor]}
                        width="100%"
                        height="400px"
                        legendToggle
                        options={{
                            curveType: 'function', // Add this option for smooth curves
                            hAxis: {
                                slantedText: false, // Prevent the x-axis labels from being slanted
                                maxAlternation: 1, // To have space between x-axis labels
                            },
                            colors: ['green', 'red', 'gray'], // Set the colors directly to override defaults
                            areaOpacity: 0.2, // Set the area fill opacity (0 to 1)
                            lineWidth: 2, // Set the width of the line
                        }}
                    />
                </>
                : <></>}

            <div className='text-left'>
                <div className='p-2'  >
                    <button type="button" class="btn btn-secondary text-dark my-3" disabled>Calcuted Amount from Today Price : {onBuyOrSell} &#8377; &nbsp;&nbsp;</button> <br />
                    <input className='coinInput text-left border-1 rounded-3' type='text' placeholder='Enter Reference ( Optional )' style={{ marginRight:'0.7rem' ,width:'330px',textAlign:'left',marginBottom:'1vh' }}  onChange={(e)=>setRefenceText(e.target.value)} /> <br/>
                    <input className='coinInput text-right border-1  rounded-3' type='number' placeholder='Enter Coin Quantity' style={{ fontFamily: 'monospace',marginRight:'0.7rem' }} name='buy' id='CoinIputForBuyOrSell' onChange={bargenCoin} ></input>
                    <button type="button" class="btn btn-success" id={selectedCoin} onClick={buy}  >Buy</button>
                    <button type="button" class="btn btn-danger m-2" id={selectedCoin} onClick={sell} >Sell</button>
                </div>
                <i className="mdi mdi-information menu-icon p-3" title="Information: This is some important information." style={{ fontSize: '1rem' }} >Please refresh page before buy or sell to get updated coin price</i>
            </div>7
            {/* <button onClick={()=>{setCongratulationModal(!congratulationModal)}} >Show Congratulations Page</button> */}
             
    
            <div className='text-center mt-5'>
                {userDetail?.CoinHistory?.length > 0 ? 'Reference Coins' : 'No Reference Coin Avaliable'}
                <table class="table table-striped" style={{display:userDetail?.CoinHistory?.length > 0 ? '':'none'}}>
                    <thead>
                        <tr>
                            <th scope="col">Reference</th>
                            <th scope="col">Coin</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetail?.CoinHistory?.length > 0 && userDetail?.CoinHistory.map((ref,idx)=>{
                            return (
                                <tr>
                            <th scope="row">{ref?.name}</th>
                            <td className='text-dark'>{ref?.coin === 'CoinA' ? 'SK Coin ₡': ref?.coin === 'CoinB' ? 'FEC Coin ₠' : 'DCT Coin ₾'}</td>
                            <td className='text-dark'>{ref?.coinQuantity}</td>
                            <td className='text-dark'>{ref?.price}</td>
                            <td className={ref.type === 'Sell' ? 'text-danger':'text-success'}><b>{ref?.type}</b></td>
                            <td className='text-dark'>{formattedDateAndTime(ref?.time)}</td>
                        </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>


            <div className={`position-fixed   ${congratulationModal ? '' : 'd-none'}`} style={{ zIndex: '9999', top: '0', bottom: '0', left: '0', right: '0',backgroundColor:'#00000042',display:'flex',justifyContent:'center' }} >
                <div class="card" style={{width: '28rem',maxHeight:'20rem',marginTop:'8rem',borderRadius:'1vh',boxShadow:'4px 4px 2px white',backgroundImage:`url(https://www.pngplay.com/wp-content/uploads/12/Congratulations-Gifs-Transparent-Image.gif)`,backgroundSize:'cover'}}>
                   <div className='text-right pr-3 pt-2 font-weight-bold ' style={{cursor:'pointer'}} > </div>
                   <div className='text-center'>
                     <img class="card-img-top zoominoutInfinite mt-4" src="https://thumbs.dreamstime.com/b/congratulations-label-isolated-seal-sticker-sign-retro-194925270.jpg" alt="Card image cap" style={{borderRadius:'1vh',marginBottom:'2vh',height:'13vh',width:'18vh'}} />
                     <h2 className='text-success pt-3'>Coin {congratulationFor} successfully</h2>
                     <h5 className='pt-3'  onClick={()=>setCongratulationModal(false)} style={{cursor:'pointer'}}>Click here to continue</h5>
                    </div>   
                </div>
            </div>

        </div>
    )
}

export default CoinPage