import { Text, Box, Heading, Center, SimpleGrid, Image, Link} from '@chakra-ui/react';
import { Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel} from '@chakra-ui/react';
import Qna from "../components/qna";


export default function Faq(props) {

  return (
    <Box {...props} id="faqs">
      <Center><Heading as="h2" fontSize={{base: "60px", md:"100px"}} fontWeight="bold" color="base_highlight_yellow">FAQs</Heading></Center>
      <Accordion defaultIndex={[0,1,2,3,4,5,6]} allowToggle allowMultiple >
        <Qna
          question="How much does a <PLACEHOLDER> cost to mint?"
          answer="It only costs 0.02 ETH to mint one <PLACEHOLDER>."
        />
        <Qna
          question="How many <PLACEHOLDER> can I mint during initial sale?"
          answer="A maximum of 20 <PLACEHOLDER> can be minted per transaction."
        />
        <Qna
          question="When did <PLACEHOLDER> launch?"
          answer={<Text>The initial sale launched on <strong>Wednesday July 28 at 3:30 PM ET.</strong></Text>}
        />
        <Qna
          question="Do you charge an OpenSea commission?"
          answer={<Text>We charge a 2.5% commission on OpenSea. And OpenSea charges a 2.5% commission on all sales that go to them. So, it adds up to a 5% commission in total.
            Please see <Link href="#roadmap"><strong>our roadmap</strong></Link> below for more details</Text>}
        />
        <Qna
          question="When will my <PLACEHOLDER> be revealed?"
          answer="Your items will be instantly revealed when minting during the initial sale."
        />
        <Qna
          question="What if I have a question that hasn’t been answered here?"
          answer={<Text>Hop on over to <Link href="<PLACEHOLDER>" target="_blank"><strong>our Discord</strong></Link>. We have an active community and we’d be happy to answer any question you may have</Text>}
        />
      </Accordion>
    </Box>
  )

}




