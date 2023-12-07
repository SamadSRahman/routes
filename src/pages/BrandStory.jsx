
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
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const [data, setData] = useState(null)
  const [logo, setLogo] = useState(null)
let targetObject = null
  // get the page content from Builder
  useEffect(()=>{
    fetch("https://ayathanapayload.payloadcms.app/api/organizationResponse/6569d21b1291e7e3871d9764?locale=undefined&draft=false&depth=8")
    .then((resposne)=>resposne.json())
    .then((data)=>{
      setLogo(data.logo.url)
    targetObject = data.brand_story.find(brandStory => brandStory.tabTitle === story);
    setData(targetObject)
    })
    .catch((error)=>console.log(error))
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
      <BuilderComponent model="page" data={{data:data, logo:logo, buttonText:"View More", style : "9.2rem"}} content={content} />
  
    </>
  );
}