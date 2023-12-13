
import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { useParams } from "react-router-dom";

// import ProductsPage from './ProductsPage'

// Put your API key here
builder.init("403c31c8b557419fb4ad25e34c2b4df5");

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function Home() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const [brand, setBrand] = useState({})
    const {brandName} = useParams()
  // get the page content from Builder
  useEffect(()=>{
    fetch(`https://strapi.ayatana.world/api/organizationResponse/${brandName}?locale=undefined&draft=false&depth=2`)
    .then((resposne)=>resposne.json())
    .then((data)=>{
      console.log(data)
      setBrand(data)
      // setBrand(data.organization.find((brand)=>brand.id===brandName))
   
    })
    .catch((error)=>console.log(error))
},[])
useEffect(()=>{
    
    console.log(brand)
},[brand])
   useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: "/home"
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
      <BuilderComponent model="page" data={{ organisation: brand,category:brand.product_categories, selectedSubCat:0, isPopupVisible:false, param:brandName, test:0}} content={content} />
      {/* <ProductsPage/> */}

    </>
  );
}
//