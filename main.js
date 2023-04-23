let weather={
    apiKey:"your api token",
    fetchWeather:function(city){
    let location="https://api.openweathermap.org/data/2.5/weather?q="+
    city+
    "&units=metric&appid=" +
    this.apiKey;
    
    fetch(location)
    .then((response)=>{
        const spanMessage=document.querySelector(".message");
        if(!response.ok){
          spanMessage.classList.add("show");
        }        
        else{ 
          spanMessage.classList.remove("show");
         return response.json();}
    }
        
    )
    .then((data)=>this.displayWeather( data))
    .catch(err=>console.log(err)); 
},
displayWeather:(data)=>{
    const {name}= data;
    const {lon,lat}=data.coord;
    const {speed}=data.wind;
    const {humidity,temp}=data.main;
    const {description,icon}=data.weather[0];
    // console.log(name,humidity,main,description,icon,lat,lon,speed,deg); 
    document.querySelector(".tem").innerText=temp + "°C"
    document.querySelector(".city").innerText="Weather of " + name;
    document.querySelector(".images").src= "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".weather").classList.remove("loading"); 
    document.querySelector(".humidity").innerText= "Humidity " + humidity +"%";
    document.querySelector(".description").innerText=description;
    document.querySelector(".wind").innerText="Wind-speed " + speed + " km/h";
    document.querySelector(".geolocation").innerText="Geolocation of "+ name +".";
    document.querySelector(".lati").innerText=`Latitude ${lat}°`;
    document.querySelector(".long").innerText=`Longitude ${lon}°`;
   
},
search:function(){
    this.fetchWeather(document.querySelector("#search_bar").value);
},
};
document.querySelector(".search button").addEventListener("click",()=> { 
        weather.search();    
  });
  
document.querySelector("#search_bar").addEventListener("keyup",(event)=>{
   if(event.key=="Enter"){
    weather.search();
   }
   
})

weather.fetchWeather("phidim")
