import React,{useEffect,useState} from 'react'
import axios from "axios";

export default function Mainpage() {
  //states for form fields
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([])
  const [loading, setLoading] = useState(true)

  //handleSubmit method
  const handleSubmit = async(e)=> {
    e.preventDefault();
    try{
      const response = await axios.get("http://localhost:5001/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency
        },
      });
      setAmountInTargetCurrency (response.data)
      setLoading(false);
    }
   

    catch(err){
      console.error(err)
    }
  }

  //get all currency names
  useEffect(()=>{
    const getCurrencyNames = async() =>{
      try{
        const response = await axios.get("http://localhost:5001/getAllCurrencies");
        setCurrencyNames(response.data)
      }
      catch(err){
        console.error(err);
      }
    }
    getCurrencyNames()
  },[])
  
  return (
    <div>
    <h1 className=' lg:mx-32 text-5xl font-bold text-blue-500'>Convert Your Currencies Today</h1>
    <p className=' lg:mx-32 opacity-50 py-7'>Looking to exchange your hard-earned cash for travel adventures or international transactions? 
    Our user-friendly currency converter helps you stay informed about exchange rates. 
    Simply enter the amount and choose the currency you have, then select the currency you want to convert to. 
    With a click, you'll see the current exchange rate and the equivalent amount in your desired currency. 
    No more guesswork – make informed decisions about your finances with our convenient currency converter tool.</p>

    <div className='mt-5 flex items-center justify-center flex-col'>
      <section className='w-full lg:w-1/2'>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input 
              onChange={(e)=>setDate(e.target.value)}
              type="date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-4">
            <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>
            <select 
            onChange={(e)=>setSourceCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400" name={sourceCurrency} id={sourceCurrency} value={sourceCurrency} >
              <option value="">Select Source Currency</option>
              {Object.keys(currencyNames).map((currency)=>(
                <option className=" p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
            <select 
            onChange={(e)=>setTargetCurrency(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400" id={targetCurrency} name={targetCurrency} value={targetCurrency} >
              <option value="">Select Target Currency</option>
              {Object.keys(currencyNames).map((currency)=>(
                <option className=" p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor={amountInSourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency
            </label>
            <input 
            onChange={(e)=>setAmountInSourceCurrency(e.target.value)}
            type="text" id={amountInSourceCurrency} name={amountInSourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-400 dark:focus:border-blue-400" placeholder="Amount in source currency" required />
          </div>
          <button className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md'>Get the target currency</button>
        </form>
      </section>
    </div>
    {! loading ? (<section className=" lg:mx-60 text-2xl mt-10">
    {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to {""}
    <span className=" text-blue-500 font-bold ">{amountInTargetCurrency}</span> in {currencyNames[targetCurrency]}
    </section> 
    ) : (
    null
    )}
    
    </div>
  )
}
