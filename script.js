"use strict";

const searchBtn = document.getElementById("search");
const table = document.querySelector(".crypto-table");
const tbody = table.getElementsByTagName("tbody")[0];

const loadData = async () => {
  tbody.innerHTML = "";
  const getData = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false"
  );
  const jsonData = await getData.json();
  const splittedData = jsonData.slice(0, 10);
  showData(splittedData);

  searchBtn.addEventListener("click", (e) => {
    const searchVal = searchInput.value;
    if (searchVal === "") {
      alert("plese write something");
      return false;
    } else {
      searchFun(searchVal, jsonData);
    }
  });
};

function showData(data) {
  let html = "";
  data.forEach((coin) => {
    const {
      name,
      current_price,
      market_cap_change_percentage_24h,
      price_change_percentage_24h,
    } = coin;
    html = html += `
        <tr>
        <td>${name}</td>
        <td>${current_price}</td>
        <td>${market_cap_change_percentage_24h}</td>
        <td>${price_change_percentage_24h}</td>
        <td><button class="buy">Buy</button></td>
        </tr>
        `;
  });
  tbody.insertAdjacentHTML("afterend", html);
}

loadData();
