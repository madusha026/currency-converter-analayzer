const express = require("express"); 
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());


//all currencies
app.get("/getAllCurrencies" ,async (req,res)=>{
    const nameUrl = "https://openexchangerates.org/api/currencies.json?app_id=1c81bd1140d34cdfa728ed7c84dcff80";
    
    try{
        const namesResponse = await axios.get(nameUrl)
        const nameData = namesResponse.data;

        return res.json(nameData)
    }
    catch(err){
        console.error(err)
    }
})

//get the target amount
app.get("/convert" , async (req,res)=>{
    const{ date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency } = req.query;
    try{
        const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=1c81bd1140d34cdfa728ed7c84dcff80`
        const dataResponse = await axios.get(dataUrl)
        const rates = dataResponse.data.rates;
 
        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        //final target val
        const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2))
    }
    catch(err){
        console.error(err)
    }
})



//listen to a port
app.listen( 5001, ()=>{
    console.log("server started")
});