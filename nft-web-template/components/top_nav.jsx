import { Text, Center, IconButton, Image, Icon, Box, HStack } from '@chakra-ui/react'
import { FaTwitter, FaDiscord } from 'react-icons/fa'
import CountdownTimer from "./countdown_timer";
import Banner from "../components/banner";


export const TopNav = (props) => (
  <Center width="100%" maxH="xs" {...props} bg="base_back_blue" position="fixed"  zIndex="banner">
    <HStack spacing={0} >
      {/* <Banner /> */}
      {/* <Box fontWeight="600" fontSize={{base:"12px", lg:"18px"}}>
        <CountdownTimer {...props}/>
      </Box> */}
      <Box my={0} py={0} display="inline"
        // fontFamily="Chee"
      >
        <Text as="a" href="/#faqs" mx="0.4em" fontSize={{base:"12px", md: "18px"}}> FAQs</Text>
        <Text as="a" href="/#roadmap" mx="0.4em" fontSize={{base:"12px", md: "18px"}}> Roadmap</Text>
        <Text as="a" href="/#team" mx="0.4em" fontSize={{base:"12px", md: "18px"}}> Team</Text>
        <IconButton as="a" href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_SLUG}`} background="none" target="_blank" aria-label="Twitter" icon={<FaTwitter fontSize="28px" />}
        _hover={{background: "none"}}/>
        <IconButton as="a" href={`${process.env.NEXT_PUBLIC_DISCORD_LINK}`} background="none" target="_blank" aria-label="Discord" icon={<FaDiscord fontSize="28px" />}
        _hover={{background: "none"}}/>
        <IconButton as="a" href={`https://opensea.io/collection/${process.env.NEXT_PUBLIC_OPENSEA_SLUG}`} background="none" target="_blank" aria-label="Discord" icon={<Image borderRadius="md" src="images/footer-opensea.svg" alt="Open Sea" boxSize="24px" />}
        _hover={{background: "none"}}/>
      </Box>
    </HStack>
  </Center>
)