    let cityName = "Multan";
    let latlong =  "24.936448,67.0236672";
    // const URL = `https://api.weatherapi.com/v1/forecast.json?key=63ac639043574f3b95810852252003&q=${latlong}&days=10&aqi=yes&alerts=no`;  
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=63ac639043574f3b95810852252003&q=${cityName}&days=10&aqi=yes&alerts=no`;  
    let objOfData = {};
    const apiDataFetchFunction = async() =>{
        try {
            console.log("Fetching...")
            let response = await fetch(URL);
            let data = await response.json();
            // console.log(data);
            objOfData = {...data};
            // console.log(data.forecast);
            // console.log('Day')
            // console.log(data.forecast.forecastday[1].day);
            // console.log('astro')
            // console.log(data.forecast.forecastday[1].astro);
            // console.log('hour')
            // console.log(data.forecast.forecastday[0].hour);
            // console.log(data);
            // console.log(objOfData)
        } catch (error) {
            console.log(error)
        }
    }
    const asyncFuntionToGetDataInsideVariable = async () =>{
        console.log("Loading...")
        await apiDataFetchFunction();
        let arrOfForcastDays = objOfData.forecast.forecastday;
        // console.log(objOfData.forecast.forecastday)
        // console.log(objOfData.forecast.forecastday)
        console.log(objOfData.forecast)
        // console.log((objOfData.forecast.forecastday[0].hour[0].time))
    }
    asyncFuntionToGetDataInsideVariable();
