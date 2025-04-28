//Variables
let cityName = "Bahawalpur";
let main = document.getElementsByTagName('main')[0];
let wrapper = document.getElementsByClassName('wrapper')[0]
let searchBtn = document.getElementById('search-btn');
let inputBoxvValue = document.getElementById('input');
let footer = document.getElementsByTagName('footer')[0]
let messageBox = document.createElement('div');
let latitudeAndLongitude = "";
// --Wrapping code insie 'DOMContentLoaded' event
document.addEventListener('DOMContentLoaded',async () =>{    
//  --Getting input value/City name ---
const inputBoxFucntion = () => {
    cityName = inputBoxvValue.value;
    // if(/^[A-Za-z]+$/.test(cityName)){  // to check validity of alphabets
    //     asyncFuntionToGetDataInsideVariable(cityName)
    // }
    // else{
    //     console.log("Invalid input")
    // }
    asyncFuntionToGetDataInsideVariable(cityName)
    bottom.classList.remove('hidden')
}
//  --Getting input value/City name ---
let objOfData = {};
const apiDataFetchFunction = async(cityName) =>{
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=63ac639043574f3b95810852252003&q=${cityName}&days=10&aqi=yes&alerts=no`;  
    try {
        console.log("Fetching...");
        main.style.opacity = "0%";
        main.classList.remove('hidden');
        messageBox.remove();
        footer.classList.remove('fixed');
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        else{
        let data = await response.json();
        objOfData = {...data};
        // console.log(objOfData.forecast.forecastday)
        }
    } catch (error) {
        console.log("API request failed: " + error);
        funtionForErrorDisplay();
    }
}
const asyncFuntionToGetDataInsideVariable = async (cityName) =>{
    console.log("Loading...")
    try {
        await apiDataFetchFunction(cityName);     
    } catch (error) {
     console.log(error)
        
    }
    main.style.opacity = "100%";
    //This function Displays information in first section -------
    const currentTemperatureDisplay = () => {
        let dateRighTNow = new Date();
        currentTemperature.textContent = `${objOfData.current.temp_c}°C` ;
        searchedCityName.textContent = `${objOfData.location.name}` 
        searchedregioncountry.textContent = `${objOfData.location.region}, ${objOfData.location.country} `;
        currentDate.textContent = `${(dateRighTNow.toDateString())}` ;
        currentImg.setAttribute('src', `${objOfData.current.condition.icon}`);
        text.textContent = `${objOfData.current.condition.text}`;
        feelslike.textContent = `Feels like ${objOfData.current.feelslike_c}°C`;
        // console.log(objOfData)
        humidity.textContent = `${objOfData.current.humidity}%`;
        windspeed.textContent = `${objOfData.current.wind_mph}mph`;
        winddegree.textContent = `${objOfData.current.wind_degree}`;
        airquality.textContent=`${objOfData.current.air_quality['us-epa-index']}`;
        // console.log(objOfData.current.feelslike_c)
    }
    //This function Displays info inside 4 containers of grid -------
    const furtherInformation = () => {
        // console.log(objOfData.forecast.forecastday.day)
        highest.textContent = `${objOfData.forecast.forecastday[0].day.maxtemp_c}°C`;
        lowest.textContent = `${objOfData.forecast.forecastday[0].day.mintemp_c}°C`;
        avgtemp.textContent = `${objOfData.forecast.forecastday[0].day.avgtemp_c}°C`;
        sunrise.textContent = `${objOfData.forecast.forecastday[0].astro.sunrise}`;
        sunset.textContent = `${objOfData.forecast.forecastday[0].astro.sunset}`;
        moonrise.textContent = `${objOfData.forecast.forecastday[0].astro.moonrise}`;
        moonset.textContent = `${objOfData.forecast.forecastday[0].astro.moonset}`;
    }
    //This Funtion displays current day above hourlyforecast section
    const updateCurrentDate = () => {
        let dateRightNow = new Date();
        dateabovehours.textContent = dateRightNow.toDateString();
    }
    //This function Display Hourly forecast -------
    const hourlyForecast = () => {
        let hourArray = [...objOfData.forecast.forecastday[0].hour];
        for (let i = 0; i < hourArray.length; i++) {
            let imgLength = (hourArray[i].condition.icon).length;
            // console.log((hourArray[i].condition.icon).slice(`${imgLength-13}`,`${imgLength}`))
            if((hourArray[i].condition.icon).slice(`${imgLength-13}`,`${imgLength}`) === 'night/113.png')
            {
                hourDiv[i].classList.remove('justify-evenly')
                hourDiv[i].classList.add('justify-center')
                Himg[i].setAttribute('src',hourArray[i].condition.icon);
            }
            else{
                Himg[i].setAttribute('src',hourArray[i].condition.icon); 
            }
            Htemp[i].innerHTML = `${hourArray[i].temp_c}°C`;     
            conditiontext[i].innerHTML = `${hourArray[i].condition.text}`;
            // console.log(hourArray[i].condition.text) 
        }

    }
    //This function displays next ten days forecast ---------
    const displayingDaysForecast = () => {
        let daysArray = [...objOfData.forecast.forecastday];
        // console.log(dayIndex)
        let dayName = "";
        const dayNameSetter = (dayIndex) => {
            switch (dayIndex) {
                case 0:
                    dayName = "Sunday";
                    break;
                case 1:
                    dayName = "Monday";
                    break;
                case 2:
                    dayName = "Teusday";
                    break;
                case 3:
                    dayName = "Wednesday";
                    break;
                case 4:
                    dayName = "Thursday";
                    break;
                case 5:
                    dayName = "Friday";
                    break;
                case 6:
                    dayName = "Saturday";
                    break;
                default:
                    break;
            }
            return dayName;
        }
        for (let i = 0; i < daysArray.length; i++) {
            let dayIndex = new Date(daysArray[i].date);
            // console.log(daysArray[i].date)
            nextday[i].innerHTML = `${dayNameSetter((dayIndex.getDay()))}`;
            console.log(dayIndex.getDay())
            // nextday[i].innerHTML = `${(dayIndex.getDay())}`        
            nextimg[i].setAttribute('src',daysArray[i].day.condition.icon)    
            nexttemp[i].innerHTML = `${(daysArray[i].day.avgtemp_c)}°C`;
            nextconditiontext[i].innerHTML = `${(daysArray[i].day.condition.text)}`;            
        }    
    }

    //This would make 
    let boolCheck = true;

    const clickableDays = () => {
        let daysArray = ["buffer", ...objOfData.forecast.forecastday];
        let divs = document.querySelectorAll(".day"); 
        divs.forEach((div, index) => {
        div.addEventListener("click", () => {
            bottom.classList.add('hidden')
        // console.log(index)
        // console.log(divs[index])
        // console.log(divs)
                for (let i = 0; i < divs.length; i++) {
                    divs[i].style.backgroundColor = "#0e0e5f"                    
                }
                divs[index].style.backgroundColor = "red"   
        // console.log(daysArray)
        // console.log(divs)
        // daysArray[index].style.backgroundColor = "red"
        // div.style.backgroundColor = "red";
        console.log(daysArray[index]);    // daysArray[index] is object at particular index in similarity to that array of divs(days)
        let dateRighTNow = new Date(daysArray[index].date);    //Getting date of that day
        currentTemperature.textContent = `Avg ${daysArray[index].day.avgtemp_c}°C` ;
        searchedregioncountry.textContent = `${objOfData.location.region}, ${objOfData.location.country} `;
        currentDate.textContent = `${(dateRighTNow.toDateString())}` ;
        currentImg.setAttribute('src', `${daysArray[index].day.condition.icon}`);
        text.textContent = `${daysArray[index].day.condition.text}`;
        // feelslike.textContent = `Feels like ${objOfData.current.feelslike_c}°C`;
        humidity.textContent = `${objOfData.current.humidity}%`;
        windspeed.textContent = `${objOfData.current.wind_mph}mph`;
        winddegree.textContent = `${objOfData.current.wind_degree}`;
        airquality.textContent=`${objOfData.current.air_quality['us-epa-index']}`;
        highest.textContent = `${daysArray[index].day.maxtemp_c}°C`;
        lowest.textContent = `${daysArray[index].day.mintemp_c}°C`;
        avgtemp.textContent = `${daysArray[index].day.avgtemp_c}°C`;
        sunrise.textContent = `${daysArray[index].astro.sunrise}`;
        sunset.textContent = `${daysArray[index].astro.sunset}`;
        moonrise.textContent = `${daysArray[index].astro.moonrise}`;
        moonset.textContent = `${daysArray[index].astro.moonset}`;
    });
});
    }
    // ------------Copied Code ------------------
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else { 
          currentTemperature.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
      
      function success(position) {
        console.log("Latitude: " + position.coords.latitude +  " Longitude: " + position.coords.longitude);
        cityName = `${position.coords.latitude},${position.coords.longitude}`
        asyncFuntionToGetDataInsideVariable(cityName)
      }
      
      function error() {
        alert("Sorry, no position available.");
      }
    //   getLocation()
    // ------------Copied Code ------------------

    currentTemperatureDisplay();
    furtherInformation();
    updateCurrentDate();
    hourlyForecast();
    displayingDaysForecast();
    clickableDays();
    loactionbtn.addEventListener('click',getLocation);
}
const funtionForErrorDisplay = () =>{
    main.classList.add('hidden')
    messageBox.innerHTML =   `   
    <div class="errorMessage mt-[50px] font-medium text-center w-full text-[2rem] ">
          Unable to Load! Try again
     </div>`;
     wrapper.appendChild(messageBox);
     footer.classList.add('fixed');
     footer.classList.add('bottom-0')
     
}
asyncFuntionToGetDataInsideVariable(cityName) //Called with default value of cityName to set default display
searchBtn.addEventListener('click',inputBoxFucntion)
});