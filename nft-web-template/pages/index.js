import { Box, HStack, Image } from '@chakra-ui/react';
import { Footer } from "../components/footer";
import { TopNav } from "../components/top_nav";
import Faq from "../components/faq";
import Roadmap from "../components/roadmap";
import Team from "../components/team";
import Intro from "../components/intro_v";
import Banner from "../components/banner";
import { useState } from "react";

const deadline = '28 Jul 2021 19:30:00 GMT';
const is_launched = (Date.now() > Date.parse(deadline))

export default function Index() {
  const [launched, setLaunched] = useState(is_launched);

  return (
    <Box backgroundColor="base_back_blue">
      <TopNav color="white" pt={0} setLaunched={setLaunched} />
      <Intro pt={{base:14, lg: 14}} backgroundColor="base_back_blue" color="white" launched={launched} />
      <Box px={50}>
        <Faq backgroundColor="base_back_blue" color="white" maxW="800px" mx="auto"  pb={12} pt={16}/>
        <Roadmap backgroundColor="base_back_blue" color="white"  maxW="900px" mx="auto" py={24} />
        <Team backgroundColor="base_back_blue" color="white" mx="auto"  pb={12} pt={16}/>
        <Footer color="white" pt={4} pb={24}/>
      </Box>
    </Box>
  )
}
