/* eslint-disable no-unused-vars */

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
export default function ProductDetails() {
  const selectedImgIndex = useRecoilValue(selectedImgIndexAtom)
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const [data, setData] = useState({})
  const { productId } = useParams();

  const {cat} = useParams();
  const {subcat} = useParams() 
  const [product,setProduct] = useState(null)
const [selectedProdut, setSelectedProduct] = useState(null)
const [organisation, setOrganisation] = useState(null)
  // get the page content from Builder
const {brandName} = useParams();
  let targetObject = null
  let targetSubCat = null
  let targetProduct = null
  useEffect(()=>{
    fetch(`https://strapi.ayatana.world/api/organizationResponse/${brandName}?locale=undefined&draft=false&depth=6`)
    .then((resposne)=>resposne.json())
    .then((data)=>{
      setOrganisation(data)
      targetObject = data.product_categories.find(category => category.title === cat);
      targetSubCat = targetObject.products.find(product=>product.title===subcat)
       console.log(targetSubCat)
      targetProduct = targetSubCat.product_variants.find(product=>product.id===productId)
     setProduct(targetProduct)
console.log(targetProduct)
     let selectedTargetProduct ={}
if(targetProduct)
{      selectedTargetProduct = {
      title: targetProduct.title,
      description: targetProduct.description,
      thumbnail:targetProduct.thumbnail.url
     }}
    //  console.log(targetProduct)
      setSelectedProduct(selectedTargetProduct)
    })
    .catch((error)=>console.log(error))

  },[])
   useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: "/product-detail"
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
      <BuilderComponent model="page" data={{organisation:organisation, product:product, selectedProduct:selectedProdut, currentImgIndex :selectedImgIndex}}  content={content} />
  
    </>
  );
}