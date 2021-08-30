import { Text, Box, Heading, Center, SimpleGrid, Image} from '@chakra-ui/react';
import { Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel} from '@chakra-ui/react';

export default function Qna(props) {

  return (
    <AccordionItem borderStyle="none">
      <AccordionButton>
        <Box flex="1" textAlign="left" fontSize={{base: "18px", md:"24px"}} fontWeight="bold">
          {props.question}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel py={4} textAlign="left" fontWeight="300" fontSize={{base: "12px", md:"18px"}}>
        {props.answer}
      </AccordionPanel>
    </AccordionItem>
  )

}
