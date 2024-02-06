"use strict";

const searchBtn = document.getElementById("search");
const table = document.querySelector(".crypto-table");
const tbody = table.getElementsByTagName("tbody")[0];
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
const form = document.querySelector("form");
const searchInput = document.querySelector("#search_input");

async function fetchCrypto() {
  const getData = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false"
  );
  const jsonData = await getData.json();
  return jsonData;
}

const loadData = async () => {
  const jsonData = await fetchCrypto();
  const splittedData = jsonData.slice(0, 10);
  showData(splittedData);
};

function showData(data) {
  tbody.innerHTML = "";
  let html = "";
  if (data.constructor === Array) {
    data.forEach((coin) => {
      const {
        name,
        current_price,
        market_cap_change_percentage_24h: market_cap,
        price_change_percentage_24h: price_cap,
      } = coin;
      html = html += `
            <tr>
            <td>${name}</td>
            <td>$${current_price}</td>
            <td class= "${
              +market_cap > 0 ? "success" : "danger"
            }">${market_cap.toFixed(2)}</td>
            <td class = "${
              +price_cap > 0 ? "success" : "danger"
            }">${price_cap.toFixed(2)}</td>
            <td><button class="buy show-modal">Buy</button></td>
            </tr>
            `;
    });
  } else {
    const {
      name,
      current_price,
      market_cap_change_percentage_24h: market_cap,
      price_change_percentage_24h: price_cap,
    } = data;
    html = html += `
            <tr>
            <td>${name}</td>
            <td>$${current_price}</td>
            <td class= "${
              +market_cap > 0 ? "success" : "danger"
            }">${market_cap.toFixed(2)}</td>
            <td class = "${
              +price_cap > 0 ? "success" : "danger"
            }">${price_cap.toFixed(2)}</td>
            <td><button class="buy show-modal">Buy</button></td>
            </tr>
            `;
  }

  tbody.insertAdjacentHTML("afterend", html);
}

loadData();

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("show-modal")) {
    openModal();
  }
});

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchVal = searchInput.value;
  if (searchVal === "") {
    alert("please write something");
    return false;
  }
  const jsonData = await fetchCrypto();
  const coin = jsonData.find(
    (cn) => cn.name.toLowerCase() === searchVal.toLowerCase()
  );
  showData(coin);
});
