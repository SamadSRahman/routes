
import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { selectedImgIndexAtom } from "../recoil/store";


// Put your API key here
builder.init("403c31c8b557419fb4ad25e34c2b4df5");

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function Highlights() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const selectedImgIndex = useRecoilValue(selectedImgIndexAtom)
  const [highlights,setHighlights] = useState(null)
  // const [currentIndex, setCurrentIndex] = useState(0)
  const [data, setData] = useState(null)
  const {brandName} = useParams()
  useEffect(()=>{
    fetch(`https://strapi.ayatana.world/api/organizationResponse/${brandName}?locale=undefined&draft=false&depth=2`)
    .then((resposne)=>resposne.json())
    .then((data)=>setData(data))
    .catch((error)=>console.log(error))
},[])
useEffect(()=>{
  fetch(`https://strapi.ayatana.world/apps/api/organization/${brandName}/data?keyWord=highlights&depth=3`)
  .then((res)=>res.json())
.then((apiData)=>{
  console.log(apiData)
  setHighlights(apiData.data)})
.catch((error)=>console.log(error))
},[])
  // useEffect(()=>{
  //   console.log(data)
  //     setInterval(()=>{
       
  //       if(data){
  //         if(currentIndex<data.highlights[0].media_list.length-1)
  //         setCurrentIndex(currentIndex+1)
  //       }
  //       else{
  //         setCurrentIndex(0)
  //       }
  //     },5000)
  // },[])

  // get the page content from Builder
   useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: "/highlights"
        })
        .promise();
      setContent(content);
      setNotFound(!content);

      // if the page title is found, 
      // set the document title
      if (content?.data.title) {
       document.title = content.data.title
      }
    }
    fetchContent();
  }, [window.location.pathname]);
  
  // If no page is found, return 
  // a 404 page from your code.
  // The following hypothetical 
  // <FourOhFour> is placeholder.
  if (notFound && !isPreviewingInBuilder) {
    return <div>
        Page not found
    </div>  }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent model="page" data={{organisation:data,highlights:highlights,buttonText:"View More", style : "9.2rem", selectedImgIndex:selectedImgIndex, selectedHighlightIndex :0 }} content={content} />
  
    </>
  );
}