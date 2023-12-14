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
export default function CampaignDetails() {
    const selectedImgIndex = useRecoilValue(selectedImgIndexAtom)
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);
  const [organisation, setOrganisation] = useState(null);
  const { brandName } = useParams();
  const { campaign } = useParams();
  const { campaignId } = useParams();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [campaignDetail, setCampaignDetail] = useState(null)
  const [availablePrevCampaigns, setAvailablePrevCampaings] = useState(null)
  const [availableOngoingCampaigns, setAvailableOngoingCampaings] = useState(null)
  const [availableUpcomingCampaigns, setAvailableUpcomingCampaings] = useState(null)
  // get the page content from Builder
  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: "/campaign-details",
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
  }, []);
  useEffect(() => {
    fetch(`https://strapi.ayatana.world/api/organizationResponse/${brandName}?locale=undefined&draft=false&depth=2`)

      .then((resposne) => resposne.json())
      .then((data) => {
        console.log(data);
        setOrganisation(data);
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
    fetch(
      `https://strapi.ayatana.world/apps/api/organization/${brandName}/data?keyWord=campaigns&depth=3`
    )
      .then((res) => res.json())
      .then((apiData) =>
     { console.log(apiData)
        setSelectedCampaign(apiData.data.filter((ele) => ele.type === campaign))
        setCampaignDetail(apiData.data.filter((ele) => ele.type === campaign).find((element)=>element.id===campaignId))
       
    }
      )
      .catch((error) => console.log(error));
  }, []);
  // If no page is found, return
  // a 404 page from your code.
  // The following hypothetical
  // <FourOhFour> is placeholder.
  if (notFound && !isPreviewingInBuilder) {
    return <div>Page not found</div>;
  }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent
        model="page"
        data={{
          organisation: organisation,
          selectedCampaign: selectedCampaign,
          params: brandName,
          selectedIndex : 0,
          selectedImgIndex:selectedImgIndex,
          deals:campaignDetail,
        }}
        content={content}
      />
    </>
  );
}
