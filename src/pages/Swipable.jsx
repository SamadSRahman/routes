import { useState, useRef, useEffect } from 'react'
import {useRecoilState} from 'recoil'
import { Builder, withChildren  } from "@builder.io/react";
import { selectedImgIndexAtom } from '../recoil/store';

function Swipable(props) {
    const [selectedImgIndex, setSelectedImgIndex] = useRecoilState(selectedImgIndexAtom)
  const images = [
    "https://images.pexels.com/photos/18528278/pexels-photo-18528278/free-photo-of-model-posing-on-street-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/19227786/pexels-photo-19227786/free-photo-of-pedestrian.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/19329216/pexels-photo-19329216/free-photo-of-a-dog-sitting-on-a-table-with-food-and-a-beer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  ];

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

  const nextImage = () => {
    setSelectedImgIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setSelectedImgIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
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
      <img src={props.ImgSrc }alt={`Image ${selectedImgIndex}`} width={props.width} height={props.height}/>
   
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
        {name:"selectedImgIndex", type:'number'}
    ],
  });