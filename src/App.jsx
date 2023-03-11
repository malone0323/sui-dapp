import React, { Suspense, useLayoutEffect, useState } from 'react'
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from 'react';
import DefaultLayout from './Layouts/DefaultLayout';
import TradingView from './Pages/TradingView';
import { io } from "socket.io-client";
import { BACKEND_URL } from './config';
import { toast } from 'react-hot-toast';
import { getPrice } from './Lib/web2';
import { useGlobalContext } from './Hook/GlobalProvider';
import Staking from './Pages/Staking';

const Homepage = React.lazy(() => import('./Pages/Homepage'));

// const socket = io("http://localhost:7000");
const socket = io("https://api.brainsol.ai", {
    path: "/pump/socket.io/socket.io/", // Set the custom path
    transports: ['websocket'], // Optional: specify transport
});


const App = () => {
  let location = useLocation();
  const { newMeme, setNewMeme, newTrade, setNewTrade } = useGlobalContext();
  useEffect(() => {
    socket.off("new_meme");
    socket.off("new_trade");
    // Listen for meme notifications
    socket.on("new_meme", (data) => {
      console.log("New meme notification:", data);
      toast.success(`Detected new ${JSON.parse(data.data.token).name} coin`, {duration: 5000});
      setNewMeme(data.data);
    });
    socket.on("new_trade", (data) => {
      console.log("New trade notification:", data);
      setNewTrade(data.data);
    });
  }, []);

  useEffect(() => {
    getPrice().then(data => {
      console.log("getPrice ", data)
    }).catch(err => {

    })
  }, [])

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [, windowHeight] = useWindowSize();

  useEffect(() => {
    const style = document.documentElement.style;
    style.setProperty("--height", `${windowHeight}px`);
  }, [windowHeight]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path="trading-view/:address" element={<TradingView />} />
          <Route path="staking" element={<Staking />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
