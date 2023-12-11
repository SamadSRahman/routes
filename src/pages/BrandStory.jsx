
import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { useParams } from "react-router-dom";


// Put your API key here
builder.init("403c31c8b557419fb4ad25e34c2b4df5");

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function BrandStory() {
  const {story} = useParams()
  const {brandName} = useParams()
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const [organisation, setOrganisation] = useState(null)
  const [data, setData] = useState(null)
  const [logo, setLogo] = useState(null)
  const [selectedImgIndex, setSelectedImgIndex] = useState(0)
let targetObject = null
  // get the page content from Builder
  useEffect(()=>{
    fetch("https://ayathanapayload.payloadcms.app/api/eventResponse/657198981ec3417c48e421bb?locale=undefined&draft=false&depth=8")
    .then((resposne)=>resposne.json())
    .then((data)=>{
      console.log(data)
      setOrganisation(data.organization.find((brand)=>brand.name===brandName))
    targetObject = data.organization.find((brand)=>brand.name===brandName).brand_story.find((bStory)=>bStory.tabTitle===story);
    setData(targetObject)
    })
    .catch((error)=>console.log(error))
},[])
useEffect(()=>{
  console.log(data)
    setInterval(()=>{
     
      if(data){
        if(selectedImgIndex<data)
        setSelectedImgIndex(selectedImgIndex+1)
      }
      else{
        setSelectedImgIndex(0)
      }
    },5000)
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
      <BuilderComponent model="page" data={{ story:story, buttonText:"View More", style : "9.2rem",params:brandName}} content={content} />
  
    </>
  );
}