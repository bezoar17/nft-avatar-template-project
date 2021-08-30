import { Text, Box, IconButton, Center } from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa'

export default function MintResult(props) {

  const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN

  return (
    <Center>
    <Box display={(props.txn_hash == null) ? "none" : "inline" } as="a" target="_blank" href={etherscan + 'tx/' + props.txn_hash} >
      <Text display="inline" fontSize={{base: "10px", md:"14px"}} fontWeight="extrabold">
        {
          props.minting ? 'View Pending Transaction' : 'View Transaction'
        }
      </Text>
      <IconButton aria-label="Etherscan" icon={<FaExternalLinkAlt fontSize="18px" />}
      _hover={{background: "base_back_blue"}} color="white" bg="base_back_blue"/>
    </Box>
    </Center>
  )
}

