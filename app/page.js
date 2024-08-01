"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const api_url =
    "https://www.nrb.org.np/api/forex/v1/rates?page=1&from=2024-08-01&to=2024-08-01&per_page=100";

  function callApi() {
    axios.get(api_url).then((response) => {
      const responseFromNRB = response.data;
      setData(responseFromNRB.data.payload[0]);
    });
  }

  useEffect(() => {
    callApi();
  }, []);

  return (
    <main className="m-8 bg-black">
      <div className="grid pl-32 pt-28 grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 rounded-lg lg:col-span-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white text-glow md:text-4xl lg:text-5xl">
            Nepali Foreign <br /> Exchange Converter
          </h1>
          <p className="mb-6 text-lg font-normal text-cyan-400">
            Accurate and up-to-date currency conversion at your fingertip
          </p>
        </div>
        <div className="h-32 rounded-lg">
          <p className="mb-6 text-lg font-normal text-cyan-400">Price Converter</p>
        </div>
      </div>

      <div className="p-10 text-white">
        <h2 className="text-white">Nepal forex exchange</h2>
        <p>Date: {data?.date}</p>
        <table className=" bg-black text-white">
          <thead>
            <tr>
              <th className="py-2 px-4">Currency</th>
              <th className="py-2 px-4">Unit</th>
              <th className="py-2 px-4">Buy</th>
              <th className="py-2 px-4">Sell</th>
            </tr>
          </thead>
          <tbody>
            {data.rates?.map((rate, index) => (
              <tr key={index} className="bg-neutral-900">
                <td className="border px-4 py-2">{rate.currency.name}</td>
                <td className="border px-4 py-2">{rate.currency.unit}</td>
                <td className="border px-4 py-2">{rate.buy}</td>
                <td className="border px-4 py-2">{rate.sell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
