// import { CollectionConfig } from "payload/types";

// const ProductVariantResponseAttributes: CollectionConfig = {
//   slug: "productVariantResponse",
//   admin: {
//     useAsTitle: "title",
//   },
//   access: {
//     read: () => true,
//   },
//   fields: [
//     {
//       name: "title",
//       type: "text",
//       required: true,
//     },
//     {
//       name: "description",
//       type: "text",
//       required: true,
//     },
//     {
//       name: "size",
//       type: "array",
//       fields:[
//         {
//           name:'Features',
//           type:'text'
//         }
//       ],
//     },
//     {
//       name: "keyFeatures",
//       type: "array",
//       fields:[
//         {
//           name:'Features',
//           type:'text'
//         }

//       ],
//     },
//     {
//       name: "thumbnail",
//       type: "upload",
//       required: true,
//       relationTo: "media", // Adjust the relationTo value based on your data model
//     },
//     {
//       name: "productmedia_list",
//       type: "relationship",
//       relationTo: "media",
//       hasMany: true,
//        // Adjust the relationTo value based on your data model
//     },
//     {
//       name: "colour_palette_list",
//       type: "relationship",
//       relationTo: "colourPaletteResponse",
//       hasMany: true, // Adjust the relationTo value based on your data model
//     },
//     {
//       name: "hotspot_images",
//       type: "relationship",
//       relationTo: "hotspotImagesResponse", // Adjust the relationTo value based on your data model
//     },
//     {
//       name: "product_exterior_images",
//       type: "relationship",
//       relationTo: "productExteriorResponse",
//       hasMany: true, // Adjust the relationTo value based on your data model
//     },
//     {
//       name: "experience_3_ds",
//       type: "relationship",
//       relationTo: "productARResponse", // Adjust the relationTo value based on your data model
//     },
//     {
//       name: "price",
//       type: "text",
//     },
//     {
//       name: "original_price",
//       type: "text",
//     },
//     {
//       name: "additional_info",
//       type: "text",
//     },
//     {
//       name: "qrcode",
//       type: "relationship",
//       relationTo: "qrcodeResponse",
//     },
//   ],
// };

// export default ProductVariantResponseAttributes;