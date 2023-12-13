
import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { useParams } from "react-router-dom";
import { SwipeableWithChildren } from "./Swipable";
import { useRecoilValue } from "recoil";
import { selectedImgIndexAtom } from "../recoil/store";



// Put your API key here
builder.init("403c31c8b557419fb4ad25e34c2b4df5");

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function BrandStory() {
  const selectedImgIndex = useRecoilValue(selectedImgIndexAtom)
  const {story} = useParams()
  const {brandName} = useParams()
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const [organisation, setOrganisation] = useState(null)
  const [data, setData] = useState(null)
  const [logo, setLogo] = useState(null)
 
let targetObject = null
  // get the page content from Builder
  useEffect(()=>{
    fetch(`https://strapi.ayatana.world/api/organizationResponse/${brandName}?locale=undefined&draft=false&depth=2`)
    .then((resposne)=>resposne.json())
    .then((data)=>{
      console.log(data)
      setOrganisation(data)
    })
    .catch((error)=>console.log(error))
},[])
// useEffect(()=>{
//   console.log(data)
//     setInterval(()=>{
     
//       if(data){
//         if(selectedImgIndex<data)
//         setSelectedImgIndex(selectedImgIndex+1)
//       }
//       else{
//         setSelectedImgIndex(0)
//       }
//     },5000)
// },[])
useEffect(()=>{
  fetch(`https://strapi.ayatana.world/apps/api/organization/${brandName}/data?keyWord=brand_story&depth=3`)
  .then((res)=>res.json())
  .then((apiData)=>{
    console.log(apiData)
    setData(apiData.data.find((Bstory)=>Bstory.Title===story))})
},[])
   useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: "/brand-story"
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
      <BuilderComponent model="page" data={{selectedImgIndex:selectedImgIndex,organisation:organisation, selectedStory:data, story:story, buttonText:"View More", style : "9.2rem",params:brandName}} content={content} />
  
    </>
  );
}