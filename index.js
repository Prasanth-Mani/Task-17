const container = document.querySelector(".container");

fetch("https://restcountries.com/v3.1/all")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(countries => {
        countries.forEach((country, index) => {
            const div = document.createElement("div");
            div.classList.add("card", "col-lg-3");
            div.innerHTML = `
                <div class="card">
                    <h1 id="title" class="text-center">${country.name.common}</h1>
                    <img src="${country.flags.png}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-text">Capital: ${country.capital}</p>
                        <p class="card-text">Region: ${country.region}</p>
                        <p class="card-text">Country code: ${country.subregion}</p>
                    </div>
                    <button type="button" id="btn${index}" class="btn btn-primary" onclick="getWeather('${country.capital}', '${index}')">
                        Click for weather
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function getWeather(capital, index) {
    let key = "b21f5e99aec3818c2acfeb2034051e9a";
    console.log(capital, index);
    let cap = capital;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cap}&appid=${key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(weatherData => {
            document.getElementById(`btn${index}`).innerText = weatherData.weather[0].main
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
