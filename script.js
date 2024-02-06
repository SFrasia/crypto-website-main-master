"use strict";

const loadData = async () => {
  const getData = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false"
  );
  const jsonData = await getData.json();
  showData(jsonData);

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
