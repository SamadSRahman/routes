import { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import { useNavigate, useParams } from "react-router-dom";

// import ProductsPage from './ProductsPage'

// Put your API key here
builder.init("403c31c8b557419fb4ad25e34c2b4df5");

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export default function Events() {
  const navigate = useNavigate();
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const [brand, setBrand] = useState({});
  const [availablePrevCampaigns, setAvailablePrevCampaings] = useState(null);
  const [availableOngoingCampaigns, setAvailableOngoingCampaings] =
    useState(null);
  const [availableUpcomingCampaigns, setAvailableUpcomingCampaings] =
    useState(null);
  const { brandName } = useParams();
  const { eventId } = useParams();
  const [organisations, setOrganisations] = useState(null)
  // get the page content from Builder
  useEffect(() => {
    fetch(`https://strapi.ayatana.world/api/eventResponse/${eventId}?locale=undefined&draft=false&depth=3`)
     .then((res)=>res.json())
     .then((data)=>{
        setOrganisations(data)
     })
    fetch(
      `https://strapi.ayatana.world/api/organizationResponse/${brandName}?locale=undefined&draft=false&depth=2`
    )
      .then((resposne) => resposne.json())
      .then((data) => {
        console.log(data);
        setBrand(data);
        setAvailableOngoingCampaings(
          data.campaigns.filter((ele) => ele.type === "On going")
        );
        setAvailablePrevCampaings(
          data.campaigns.filter((ele) => ele.type === "Previous")
        );
        setAvailableUpcomingCampaings(
          data.campaigns.filter((ele) => ele.type === "Upcoming")
        );
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    console.log(brand);
  }, [brand]);
  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: "/events-page",
        })
        .promise();

      setContent(content);
      setNotFound(!content);

      // if the page title is found,
      // set the document title
      if (content?.data.title) {
        document.title = content.data.title;
      }
    }
    fetchContent();
  }, [window.location.pathname]);

  if (notFound && !isPreviewingInBuilder) {
    return <div>Page not found</div>;
  }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent
        model="page"
        context={{ navigate: () => navigate() }}
        data={{
        //   organisation: brand,
        //   category: brand.product_categories,
        //   selectedSubCat: 0,
        //   isPopupVisible: false,
        //   param: brandName,
        //   test: 0,
        //   availablePrevCampaigns:availablePrevCampaigns,
        //   availableOngoingCampaigns:availableOngoingCampaigns,
        //   availableUpcomingCampaigns:availableUpcomingCampaigns,
        event:organisations
        }}
        content={content}
      />
      {/* <ProductsPage/> */}
    </>
  );
}
//
