import { Text, Center, IconButton, Image, Icon, VStack, Box, HStack } from '@chakra-ui/react'
import { FaTwitter, FaDiscord } from 'react-icons/fa'

export const Footer = (props) => (
  <Center as="footer" maxH="xs" {...props}>
    <VStack spacing={8}>
      <Box display="inline">
        <HStack spacing={4}>
          <Text as="a" href={`${process.env.NEXT_PUBLIC_ETHERSCAN}address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}#code`}
                target="_blank" mr="0.5em" fontSize={{base:"14px", md: "18px"}}> Verified Smart Contract</Text>
        <IconButton mx="0.5em" as="a" href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_SLUG}`} background="none" target="_blank" aria-label="Twitter" icon={<FaTwitter fontSize="30px" />}
        _hover={{background: "none"}}/>
        <IconButton ml="0.5em" mr="1em" as="a" href={`${process.env.NEXT_PUBLIC_DISCORD_LINK}`} background="none" target="_blank" aria-label="Discord" icon={<FaDiscord fontSize="30px" />}
        _hover={{background: "none"}}/>
        <IconButton ml="0.5em" mr="1em" as="a" href={`https://opensea.io/collection/${process.env.NEXT_PUBLIC_OPENSEA_SLUG}`} background="none" target="_blank" aria-label="OpenSea" icon={<Image borderRadius="md" src="images/footer-opensea.svg" alt="Open Sea" boxSize="32px"></Image>}
        _hover={{background: "none"}}/>
        </HStack>
      </Box>
     </VStack>
  </Center>
)