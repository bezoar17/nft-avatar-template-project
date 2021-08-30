import { Text, Box, Heading, Center, Flex, Link, OrderedList, ListItem, Spacer} from '@chakra-ui/react';
import Milestones from "../components/milestones";

export default function Roadmap(props) {

  const percent_25 = [
    <Text key="percent_25_text"><strong>$7,500</strong> donation to a charity of the community’s choice</Text>,
    "10 handcrafted <PLACEHOLDER> airdropped to random owners",
  ]

  const percent_50 = [
    <Text key="percent_50_text"><strong>$15,000</strong> donation to a charity of the community’s choice</Text>,
    "ETH raffles and NFT giveaways"
  ]

  const percent_75 = [
   <Text key="percent_75_text"><strong>$30,000</strong> donation to <strong>2</strong> charities of the community’s choice</Text>,
    "Community Wallet with 15 ETH",
    "ETH raffles and NFT giveaways"
  ]

  const percent_100 = [
    <Text key="percent_100_text"><strong>$75,000</strong> donation to <strong>2</strong> charities of the community’s choice</Text>,
    "Community Wallet with 25 ETH",
    "ETH raffles and NFT giveaways",
  ]

  return (
    <Box {...props} id="roadmap" >
      <Center bg={props.backgroundColor} color="base_highlight_yellow" py={12}><Heading as="h2" fontSize={{base: "50px", md:"100px"}} fontWeight="bold">Roadmap</Heading></Center>
      <Flex direction="row" wrap="wrap">
        <Box>
          <Text fontSize={{ base: "xl", md: "20px" }} >
            <i>
              Some random stuff here
            </i>
          </Text>
        </Box>
        <br /><br />
        <OrderedList spacing={6} fontSize={{ base: "md", md: "lg" }}>
          <ListItem> <Text fontSize={{base: "lg", md: "xl"}}> <strong>PRICE DROP</strong></Text> Reduced mint price from 0.03 ETH to 0.02 ETH (COMPLETED)</ListItem>
          <ListItem> <Text fontSize={{base: "lg", md: "xl"}}> <strong>CHARITY</strong></Text> $15,000 donation to a charity voted on by the community (COMING SOON)</ListItem>
          <ListItem> <Text fontSize={{base: "lg", md: "xl"}}> <strong>OPENSEA ROYALTIES</strong></Text> 100% of all OpenSea royalties for the first 3 months to be paid back as a reward to holders of {`<PLACEHOLDER>`} and 50% of OpenSea royalties thereafter (FIRST HOLDER SNAPSHOT ON AUG 31).</ListItem>
        </OrderedList>

        {/* <Milestones bg={props.backgroundColor} color="white" heading="Sell out 25%" img_src="images/ms25.png" bullets = {percent_25}/>
        <Milestones bg={props.backgroundColor} color="white" heading="Sell out 50%" img_src="images/ms50.png" bullets = {percent_50}/>
        <Milestones bg={props.backgroundColor} color="white" heading="Sell out 75%" img_src="images/ms75.png" bullets = {percent_75}/>
        <Milestones bg={props.backgroundColor} color="white" heading="Sell out 100%" img_src="images/ms100.png" bullets = {percent_100}/> */}
      </Flex>
    </Box>
  )

}