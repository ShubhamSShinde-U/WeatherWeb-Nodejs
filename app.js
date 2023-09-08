const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express();

app.set('view engine','ejs');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}))

const port = process.env.PORT || 3000;

app.get("/", function(req,res){
    res.render("login")
})
app.post("/login",async function(req,res){
    console.log(req.body)
    userName = req.body.username;
    password = req.body.password;
    if(userName==="demo" && password === "password"){

        const result = await axios.get("http://api.weatherapi.com/v1/forecast.json?key=db7a49be788f49c2941135515230809&q=london&days=7&hour=0&astro=0");
        
        res.render("show_data",{data: JSON.stringify(result.data)});
    }
    else{
        res.render("login_fail")
    }
})

app.post("/userChoice",async function(req,res){
    var cityName = req.body.userCity;
    var api = "http://api.weatherapi.com/v1/forecast.json?key=db7a49be788f49c2941135515230809&q="+cityName+"&days=7&hour=0&astro=0";
    const result = await axios.get(api);
    res.render("show_data", { data: JSON.stringify(result.data) });
})

app.post("/error",function(req,res){
    res.redirect("login")
})
app.listen(port, ()=>{
    console.log("Listening on port 3000");
})
