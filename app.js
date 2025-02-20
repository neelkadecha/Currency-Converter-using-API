// 

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_Tr1h5bMU40XRq5gOiev3DLaTfJ4gnY2uaHG2RrNe";
const dropdowns = document.querySelectorAll("#dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from-section select");
const toCurr = document.querySelector(".to-section select");
const msgSection = document.getElementById('msg-section');

// Populate dropdowns
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

// Update flag when currency is selected
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

// Handle conversion on button click
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("#amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal <= 0) {
        amtVal = 1;
        amount.value = "1";
    }
    let fromCurrency = fromCurr.value;
    let toCurrency = toCurr.value;

    let URL = `${BASE_URL}&base_currency=${fromCurrency}`;
    
    // Fetch data from the API
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            let rate = data.data[toCurrency];
            let convertedAmount = (amtVal * rate).toFixed(2);

            msgSection.innerHTML = `<p>${amtVal} ${fromCurrency} = ${convertedAmount} ${toCurrency}</p>`;
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
            msgSection.innerHTML = `<p>Sorry, something went wrong. Please try again.</p>`;
        });
});
