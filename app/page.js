"use client";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import Earth from "../public/Earth";

export default function Home() {
  const [data, setData] = useState([]);
  const api_url =
    "https://www.nrb.org.np/api/forex/v1/rates?page=1&from=2024-08-04&to=2024-08-04&per_page=100";

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
    <main className=" m-8 bg-black h-fill">
      <div className="grid grid-cols-2 grid-rows-1 gap-1   ">
        {console.log(data.rates)}
        <div className="h-32 pt-12 col-start-2">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white text-glow md:text-4xl lg:text-5xl">
            Nepali Foreign Exchange Converter
          </h1>
          <p className="mb-6 text-lg font-normal text-cyan-400">
            Accurate and up-to-date currency conversion at your fingertip
          </p>
          <div className="  text-white">
            <h2 className="text-white text-2xl my-4 uppercase">
              Nepal forex exchange Rate
            </h2>
            <p className="text-lime-500 my-3">Date: {data?.date}</p>

            <table className="bg-black text-white">
              <thead>
                <tr className="border  text-red-600">
                  <th className=" border py-2 px-4">Currency</th>
                  <th className="border py-2 px-4">Unit(Nrs)</th>
                  <th className="border py-2 px-4">Buy</th>
                  <th className="border py-2 px-4">Sell</th>
                </tr>
              </thead>
              <tbody>
                {data.rates?.map((rate, index) => (
                  <tr key={index} className="bg-neutral-700">
                    <td className="border px-4 py-2">{rate.currency.name}</td>
                    <td className="border px-4 py-2">{rate.currency.unit}</td>
                    <td className="border px-4 py-2">{rate.buy}</td>
                    <td className="border px-4 py-2">{rate.sell}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row-start-2 w-full h-96 lg:h-[500px]">
          <Canvas className="w-full h-full animate-spin ">
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />

              <Earth scale={[2, 2, 2]} position={[0, 0, 0]} />
            </Suspense>
            <Environment preset="sunset"></Environment>
            <ContactShadows
              opacity={1}
              scale={10}
              blur={1}
              far={10}
              resolution={256}
              color="red"
            />
          </Canvas>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-teal-300"
            >
              Price
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">Rs</span>
              </div>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="0.00"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>USD</option>
                  <option>CAD</option>
                  <option>EUR</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
