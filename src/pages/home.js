import React, { useState, useEffect } from 'react';


const images = [
    { src: 'https://via.placeholder.com/300x300', alt: 'Image 1' },
    { src: 'https://via.placeholder.com/300x300', alt: 'Image 2' },
    { src: 'https://via.placeholder.com/300x300', alt: 'Image 3' },
    { src: 'https://via.placeholder.com/300x300', alt: 'Image 4' },
    { src: 'https://via.placeholder.com/300x300', alt: 'Image 5' },
    { src: 'https://via.placeholder.com/300x300', alt: 'Image 6' },
  ];

  export default function Home () {
    const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const newScrollTop = scrollTop + 900
        const headerHeight = document.querySelector('.App-header').clientHeight;
        setIsHeaderShrunk(newScrollTop > headerHeight);
        console.log(newScrollTop)
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const headerStyle = isHeaderShrunk ? { height: '100px', position: 'sticky', transition:'3s'} : { height: '1000px' };
  
    return (
      <div className="App">
        <header className="App-header" style={headerStyle}>
          <h1>James Geovanny</h1>
        </header>
        <div className="image-grid">
          {images.map((image) => (
            <img key={image.alt} src={image.src} alt={image.alt} className='img-individual' />
          ))}
        </div>
      </div>
    );
  }

  