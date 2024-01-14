const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  // We have added the URL of the api which would fetch the new rated of the changed currency.

const dropdowns = document.querySelectorAll(".dropdown select");
// Created a variable for selecting the option from dropdowns.
const btn = document.querySelector("form button");
// Created an button for selecting the form button
const fromCurr = document.querySelector(".from select");
// these two variables from select and to select are used to select an option from dropdowns
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// this variable is created to control the message


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal === "" || amtVal< 1){
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data= await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalAmt= amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`; 
};

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
  }sc 

 select.addEventListener("change", (evt) =>{
    updateFlag(evt.target);
 });
}
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();  
    updateExchangeRate(); 
});

window.addEventListener("load", ()=>{
    updateExchangeRate();
});

