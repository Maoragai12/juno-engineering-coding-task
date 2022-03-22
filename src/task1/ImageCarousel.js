import React, { useEffect, useState } from 'react';
import { fetchImageUrls, fetchImage } from "../api/index";

const ImageCarousel = () => {

    const [imagesUrls, setImagesUrls] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
          (async function fetchImages() {
            const images = await fetchImageUrls();
            setImagesUrls(images);
            const image = await fetchImage(imageIndex);
            setImage(image);
          })();
    }, [imageIndex]);

    async function handleOnClickPrev(){
        setIsLoading(true);
        const prevIndex = imageIndex - 1;
        if(prevIndex === -1) 
            setImageIndex(imagesUrls.length - 1);
        else 
            setImageIndex(prevIndex);
        const image = await fetchImage(imageIndex);
        setIsLoading(false);
        setImage(image);
    }

    async function handleOnClickNext(){
        setIsLoading(true);
        const nextIndex = imageIndex + 1;
        if(nextIndex === imagesUrls.length) 
            setImageIndex(0);
        else 
            setImageIndex(nextIndex);
        const image = await fetchImage(imageIndex);
        setIsLoading(false);
        setImage(image);
    }

    return (
        <div>
            <button onClick={handleOnClickPrev}>PREV</button>
            <div>
                <img src={image} alt="slide" 
                style={{display: "inline-flex", 'justify-content': "center", 'align-items': "center", height: "300px", width: '50%'}}/>
            </div>
            <button onClick={handleOnClickNext}>NEXT</button>
        </div>
    );
};
export default ImageCarousel;
