import { Text, Box, Center, VStack, Tooltip } from '@chakra-ui/react';

export default function ItemMintCount(props) {
  return (
    <Center>
      <Box mb="5px" mx={"2px"} display={props.total_items_minted !=-1 ? "inline" : "none"}>
        {/* <Tooltip color="black" hasArrow label={`Some tooltip`} bg="base_highlight_yellow"> */}
        <Text fontSize={{base: "12px", md:"18px"}} fontWeight="800">{`${(10000 - props.total_items_minted).toLocaleString()}/10,000`} {'<PLACEHOLDER>'} left</Text>
        {/* </Tooltip> */}
      </Box>
    </Center>
  )
}

