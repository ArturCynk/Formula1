import React, { useState, useEffect } from 'react';
import './imagesGallery.css'

const ImagesGallery = ({photos}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

    useEffect(() => {
        if (autoScrollEnabled) {
          const interval = setInterval(() => {
            nextImage();
          }, 5000);
        }
      }, [currentImageIndex, autoScrollEnabled]);
    
      const prevImage = () => {
        setCurrentImageIndex(prevIndex =>
          prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
        setAutoScrollEnabled(false);
      };
    
      const nextImage = () => {
        setCurrentImageIndex(prevIndex =>
          prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        );
        setAutoScrollEnabled(false);
      };
    
      const handleImageClick = () => {
        setAutoScrollEnabled(false);
      };
  return (
    <div className="gallery">
            <button onClick={prevImage} className='left'>Poprzednie</button>
            <img
              src={photos[currentImageIndex]}
              alt={`Zdjęcie ${currentImageIndex}`}
              onClick={handleImageClick}
            />
            <button onClick={nextImage} className='right'>Następne</button>
    </div>
  )
}

export default ImagesGallery;
