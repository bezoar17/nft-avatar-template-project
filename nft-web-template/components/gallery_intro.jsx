import React from "react";
import {
  chakra,
  Box,
} from "@chakra-ui/react";

import dynamic from "next/dynamic";
const GalleryMetamaskSection = dynamic(() => import("../components/gallery_metamask_section"), { ssr: false});

const GalleryIntro = (props) => {
  return (
    <Box px={8} pt={18} mx="auto" {...props}>
      <Box w={{ base: "full", md: 11 / 12, xl: 9 / 12 }} mx="auto" textAlign={{ base: "left", md: "center" }} mt={4}>
         <chakra.h1 mb={6} fontSize={{ base: "3xl", md: "60px", lg: "60px" }} fontWeight="semibold" lineHeight="normal" letterSpacing={{ base: "normal", md: "10px" }} color="base_highlight_yellow"
        //  fontFamily="Chee"
         >
          {'<PLACEHOLDER>'} Gallery
        </chakra.h1>
      </Box>
    </Box>
  );
};

export default GalleryIntro;