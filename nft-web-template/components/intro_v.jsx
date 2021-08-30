import React from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Button,
  Stack,
  Image,
  Text,
  Icon,
  Center,
} from "@chakra-ui/react";

import dynamic from "next/dynamic";
const MetamaskSection = dynamic(() => import("../components/metamask_section"), { ssr: false});

const Intro = (props) => {
  return (
    <Box px={8} py={12} mx="auto" pt ={props.pt} color={props.color} backgroundColor={props.backgroundColor} >
      <Box
        w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        textAlign={{ base: "left", md: "center" }}
      >
         <chakra.h1
          mb={6} fontSize={{ base: "3xl", md: "90px", lg: "120px" }} fontWeight="semibold" lineHeight="normal" letterSpacing={{ base: "normal", md: "10px" }} color="base_highlight_yellow"
          // fontFamily="Chee"
          >
          {'<PLACEHOLDER>'}
        </chakra.h1>
        <chakra.p id="mint" px={{ base: 0, lg: 12 }} mt={6} mb={2} fontSize={{ base: "md", md: "xl" }} fontWeight="medium" color={props.color}>
          {`Short description <PLACEHOLDER>`}
          {`<PLACEHOLDER>`} is an NFT collection of {`<PLACEHOLDER>`} unique and {`flippin'`} cool {`<PLACEHOLDER>`}
        </chakra.p>
        <MetamaskSection {...props} zIndex="docked" bg="base_back_blue"/>
        <Box mt={4} py={4} rounded={3}>
          <chakra.p
            mb={6} fontSize={{ base: "xl", md: "24px" }} fontWeight="semibold" lineHeight="normal" >
            {`The initial sale has sold out. To get your <PLACEHOLDER>, visit our official collection on OpenSea`}
          </chakra.p>
          <Center>
            <Button px={12} size="lg" rounded="full" as="a" href={`https://opensea.io/collection/${process.env.NEXT_PUBLIC_OPENSEA_SLUG}`}  mx="0.4em" fontSize={{base:"12px", md: "18px"}} target="_blank" bg="base_highlight_yellow" color="black"
            _hover={{background: "base_highlight_yellow" }} _active={{transform: "scale(0.95)"}}
            >
              {`BUY A <PLACEHOLDER> ON OPENSEA`}
            </Button>
          </Center>
        </Box>

        <Box w={{ base: "full", md: 5 / 12 }} mx="auto" my={12} textAlign="center" bg="white" p={4} rounded="md">
          <Image w="full" fit="cover" src="/images/preview.gif" alt="<PLACEHOLDER>"/>
          {/* <video
          alt="<PLACEHOLDER>"
          className='VideoTag' autoPlay loop muted>
                <source src='images/slideshow.mp4' type='video/mp4'/>
          </video> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Intro;