import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import bat from "../img/BatGif.gif"
import batStill from "../img/BatStill.png"

import sun from "../img/SunGif.gif"
import sunStill from "../img/SunStill.png"

import rome from "../img/RomeGif.gif"
import romeStill from "../img/RomeStill.png"

import moon from "../img/MoonGif.gif"
import moonStill from "../img/MoonStill.png"

import mario from "../img/MarioGif.gif"
import marioStill from "../img/MarioStill.png"

import logo from "../img/logo.png"
import whiteInside from "../img/WhiteInsidestill.png"

import blackInside from "../img/BlackInsideStill.png"
import brownInside from "../img/InsideStillBrown.png"

import tv from "../img/TV.png"
import AI from "../img/AI.png"

import batHat from "../img/bathat.png"
import store from "../products/store.json"

const wallets = [
  { 
    src: rome, 
    srcSecond: 
    romeStill, 
    srcThird: brownInside, 
    alt: 'ROME', name: store[2].name, 
    description: store[2].description 
  },

  { 
    src: sun, 
    srcSecond: sunStill, 
    srcThird: whiteInside, 
    alt: 'SUN', 
    name: store[4].name, 
    description: store[4].description 
  },

  { 
    src: bat, 
    srcSecond: batStill, 
    srcThird: blackInside, 
    alt: 'BAT', 
    name: store[3].name, 
    description: store[3].description
},
  { 
    src: moon, 
    srcSecond: moonStill, 
    srcThird: whiteInside, 
    alt: 'MOON', 
    name: store[5].name, 
    description: store[5].description 
},

  { 
    src: mario, 
    srcSecond: marioStill, 
    srcThird: whiteInside, 
    alt: 'MARIO', 
    name: store[6].name, 
    description: store[6].description 
},
];

const hats = [
  { 
    src: batHat, 
    alt: 'BAT CAP', 
    name: store[7].name, 
    description: store[7].description 
},
];

const shirts = [
  { 
    src: tv, 
    alt: 'TV', 
    name: store[0].name, 
    description: store[0].description 
},

  { 
    src: AI, 
    alt: 'AI', 
    name: store[1].name, 
    description: store[1].description 
},
];

const bgImages = [
  'https://i.pinimg.com/originals/53/bd/f3/53bdf3c62c768c92df672bb06d97df90.gif',
  'https://media4.giphy.com/media/3o7aCZFOhEO4b23Cfu/giphy.gif',

  'https://media.tenor.com/oXvT_cWqiqcAAAAC/vandalism-graffitibanksy.gif',
  "https://64.media.tumblr.com/09df1ce9f5e9d190ed38d69ec62927fe/43491dbbd5b89ec0-e8/s500x750/5a4d5bda47834af7f94d80113b73575f0f76a7e0.gifv",

  "https://media2.giphy.com/media/rmtb3GnVZAwWA/giphy.gif"
];

export default function Home() {
  
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const newScrollTop = scrollTop + 950;

      const headerHeight = document.querySelector('.App-header').clientHeight;
      setIsHeaderShrunk(newScrollTop > headerHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgIndex(prevIndex => (prevIndex + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  
  const headerStyle = {
    ...isHeaderShrunk ? { height: '180px', position: 'sticky', transition: '3s' } : { height: '1000px' },
    backgroundImage: `url(${bgImages[bgIndex]})`,
  };

  return (
    <div className="App">

      <header className="App-header" style={headerStyle}>
        <img src={logo}/>
      </header>

    <div>
    </div>

      <div>

        <div>
        {wallets.map((wallet) => (
          <Link to={{ pathname: "/JG/product", state: { data: wallet }}} key={wallet.alt}>
            <img key={wallet.alt} src={wallet.src} alt={wallet.alt} className="img-individual"/>
          </Link>
        ))}
        </div>

        </div>

        <div>
        {hats.map((hat) => (
          <Link to={{ pathname: "/JG/product", state: { data: hat }}} key={hat.alt}>
            <img key={hat.alt} src={hat.src} alt={hat.alt} className="img-individual-hats" />
          </Link>
        ))}
        </div>

        <div>
        {shirts.map((shirt) => (
          <Link to={{ pathname: "/JG/product", state: { data: shirt }}} key={shirt.alt}>
            <img key={shirt.alt} src={shirt.src} alt={shirt.alt} className="img-individual-shirts" />
          </Link>
        ))}
        </div>

      </div>
  );
}

