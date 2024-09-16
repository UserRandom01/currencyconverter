const apiUrl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropDowns = document.querySelectorAll(".select-container select");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

let msg = document.querySelector(".msg");
let btn = document.querySelector("form button");

for (select of dropDowns) {
  for (currencyCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currencyCode;
    option.value = currencyCode;

    select.append(option);

    if (select.name === "from" && currencyCode === "USD") {
      option.setAttribute("selected", "selected");
    } else if (select.name === "to" && currencyCode === "INR") {
      option.setAttribute("selected", "selected");
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  msg.style.borderColor = "#999";
  msg.style.margin = "2rem 0 0 0";

  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  const url = `${apiUrl}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(url);
  let data = await response.json();

  let lastUpdatedDate = data.date;

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  finalAmount = amtVal * rate;
  finalAmount = Math.round(finalAmount * 10000) / 10000;

  let fromCurrSymbol = countryCurrencies[fromCurr.value];
  let toCurrSymbol = countryCurrencies[toCurr.value];

  if (fromCurrSymbol === undefined) {
    fromCurrSymbol = fromCurr.value + " ";
  } else if (toCurrSymbol === undefined) {
    toCurrSymbol = toCurr.value + " ";
  }
  msg.innerHTML = ` ${fromCurrSymbol}${amtVal} = ${toCurrSymbol}${finalAmount} <div class='updateDateClass'>Last Updated : ${lastUpdatedDate}</div>`;
};
