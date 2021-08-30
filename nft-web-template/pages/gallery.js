import { Box, HStack, Image } from '@chakra-ui/react';
import { Footer } from "../components/footer";
import { TopNav } from "../components/top_nav";
import Team from "../components/team";
import GalleryIntro from "../components/gallery_intro";

import dynamic from "next/dynamic";
const GalleryMetamaskSection = dynamic(() => import("../components/gallery_metamask_section"), { ssr: false});

export default function Gallery() {
  return (
    <Box backgroundColor="base_back_blue" height="100vh">
      <TopNav color="white" pt={1}/>
      <GalleryIntro pt={{base:20, lg: 20}} backgroundColor="base_back_blue" color="white" />
      <GalleryMetamaskSection backgroundColor="base_back_blue" color="white"/>
      <Footer color="white" pt={12} pb={24}/>
    </Box>
  )
}
