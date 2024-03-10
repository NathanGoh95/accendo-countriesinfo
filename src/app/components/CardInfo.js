"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://restcountries.com/v3.1/all";

const CardInfo = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const extractedCountries = res.data.map((country) => ({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital,
          currency: country.currencies
            ? Object.keys(country.currencies).map((currencyKey) => ({
                key: currencyKey,
                symbol: country.currencies[currencyKey].symbol,
              }))
            : [],
        }));
        setCountries(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {countries.map((country, index) => (
        <div key={index}>
          <h2>{country.name.common}</h2>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
          {/* {country.currencies &&
            country.currencies.map((currency, idx) => (
              <p key={idx}>
                {currency.symbol}
                {currency.key}
              </p>
            ))} */}
        </div>
      ))}
    </div>
  );
};

export default CardInfo;
