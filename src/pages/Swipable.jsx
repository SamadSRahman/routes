import { useState, useRef, useEffect } from 'react'
import {useRecoilState} from 'recoil'
import { Builder, withChildren  } from "@builder.io/react";
import { selectedImgIndexAtom } from '../recoil/store';

function Swipable(props) {
     const [selectedImgIndex, setSelectedImgIndex] = useRecoilState(selectedImgIndexAtom)
    // const [selectedImgIndex, setSelectedImgIndex] = useState(props.selectedImgIndex);
    console.log(props.selectedImgIndex)
let mediaType = props.mediaType?props.mediaType:"image"
console.log(mediaType)
//   const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current) return;

    const currentX = e.touches[0].clientX;
    const diffX = touchStartX.current - currentX;
    const sensitivity = 10; // Adjust this value for swipe sensitivity

    if (diffX > sensitivity) {
      // Swiped left
      nextImage();
    } else if (diffX < -sensitivity) {
      // Swiped right
      prevImage();
    }

    touchStartX.current = null;
  };
console.log(props.mediaType)
console.log(props.arraySize)
  const nextImage = () => {
    setSelectedImgIndex((prevIndex) => (prevIndex === props.arraySize-1  ? 0 : prevIndex + 1))
  };

  const prevImage = () => {
    setSelectedImgIndex((prevIndex) => (prevIndex === 0 ? props.arraySize-1  : prevIndex - 1));
  };

  useEffect(() => {
    const imageContainer = document.querySelector('.image-container');
    imageContainer.addEventListener('touchstart', handleTouchStart, false);
    imageContainer.addEventListener('touchmove', handleTouchMove, false);

    return () => {
      imageContainer.removeEventListener('touchstart', handleTouchStart);
      imageContainer.removeEventListener('touchmove', handleTouchMove);
    };
  }, []); // Ensure it runs only once on mount

  return (
    <div className="image-container" style={{width:props.width}}>
{mediaType.includes("image") &&
<img src={props.ImgSrc }alt={`Image ${selectedImgIndex}`} width={props.width} height={props.height} style={{objectFit:'contain'}}/>
}
{mediaType.includes("video") &&
<video src= {props.ImgSrc }  width={props.width} height={props.height} autoPlay controls  style={{objectFit:'contain'}}/>
      
}
   
    </div>
  );
}

export default Swipable;
export const SwipeableWithChildren = withChildren(Swipable)

Builder.registerComponent(SwipeableWithChildren, {
    //
    name: "Swipeable",
    defaultChildren: [
      { 
        '@type': '@builder.io/sdk:Element',
        component: { name: 'Button', options: { text: 'Hello!' } }
      }
    ],
    noWrap: true,
    inputs: [
        {name:'imgArray', allowedFileTypes:'array'},
      { name: "width", type: "text" },
      { name: "height", type: "text" },
      { name: "ImgSrc", type: "text" },
      {name:'arraySize', type: 'number'},
        {name:"selectedImgIndex", type:'number'},
        {name:"mediaType", type:"text"}
    ],
  });