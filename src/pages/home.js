import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import bat from "../img/bat.gif"
import logo from "../img/logo.png"

const images = [
  { src: bat, alt: 'Image 1' },
  { src: bat, alt: 'Image 2' },
  { src: bat, alt: 'Image 3' },
  { src: bat, alt: 'Image 4' },
  { src: bat, alt: 'Image 5' },
];

const bgImages = [
  'https://i.pinimg.com/originals/53/bd/f3/53bdf3c62c768c92df672bb06d97df90.gif',
  'https://media4.giphy.com/media/3o7aCZFOhEO4b23Cfu/giphy.gif',
  'https://media.tenor.com/oXvT_cWqiqcAAAAC/vandalism-graffitibanksy.gif',
  "https://64.media.tumblr.com/09df1ce9f5e9d190ed38d69ec62927fe/43491dbbd5b89ec0-e8/s500x750/5a4d5bda47834af7f94d80113b73575f0f76a7e0.gifv",
  "https://media2.giphy.com/media/rmtb3GnVZAwWA/giphy.gif"
];

export default function Home() {
  const relocate = () => {
    console.log('clicked');
    window.location.href = '/product';
  };

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
    ...isHeaderShrunk ? { height: '150px', position: 'sticky', transition: '3s' } : { height: '1000px' },
    backgroundImage: `url(${bgImages[bgIndex]})`,
  };

  return (
    <div className="App">
      <header className="App-header" style={headerStyle}>
        <img src={logo} style={{ width: '40vmin', height: 'auto' }} />
      </header>
      <div className="image-grid">
        {images.map((image) => (
          <Link to="/product" onClick={relocate} key={image.alt}>
            <img key={image.alt} src={image.src} alt={image.alt} className="img-individual" />
          </Link>
        ))}
      </div>
    </div>
  );
}
