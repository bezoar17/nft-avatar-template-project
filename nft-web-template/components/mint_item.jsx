import { Box, Button, ButtonGroup, Select, Text, HStack, VStack, Stack, useToast, Flex, Icon, IconButton, Center} from '@chakra-ui/react';
import { BeatLoader } from "react-spinners"
import useMetamask from "../use-metamask/useMetamask";
import {startMint} from '../eth_helpers/helpers';
import { useState, useEffect } from 'react';
import { FaIgloo, FaEthereum } from 'react-icons/fa'

import useSound from 'use-sound';
import { totalItemsMinted } from '../eth_helpers/helpers';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react"

export default function MintItem(props) {
  const max_mint = 10000 // last 140 are reserved

  const { metaState } = useMetamask()
  const [mint_value, setValue] = useState(20)
  const updateMintValue = (mint_value) => setValue(mint_value)

  const toast_helper = useToast()

  // const [sound_helper] = useSound('/sounds/sounds.mp3', { volume: 1,
  //   sprite: { mint_success: [0, 5e3], abandoned: [6e3, 7e3]}
  // });

  const mint_it = event => {
    event.preventDefault();

    if(!props.launched) { return }

    try{
      // startMint(metaState, mint_value, props.set_minting_flag, props.set_txn_hash, toast_helper, sound_helper)
      startMint(metaState, mint_value, props.set_minting_flag, props.set_txn_hash, toast_helper, null)
    }
    catch(error){
      props.set_minting_flag(v=> false)
      console.log("Error in minting, caught in mint_it", error);
    }
  }

  return (
  <Center py={4} my={3} color="base_back_blue" >
    <form onSubmit={mint_it} >
      <Stack direction={{base:"column", md:"row"}} spacing="24px" width={{base:"auto", md:"lg"}}>
      <Slider alignSelf="start" flex="1" focusThumbOnChange={false} value={mint_value} onChange={updateMintValue} min={1} max={20} step={1} >
        <SliderTrack bg="white" minH={3} rounded="xl">
          <SliderFilledTrack bg="base_highlight_yellow" minH={3} rounded="xl"/>
        </SliderTrack>
        <SliderThumb boxSize={10} bg="base_highlight_yellow">
          <IconButton bg="none" _hover={{bg: "none"}} _active={{bg: "none"}} icon={<FaEthereum fontSize="32px" />} />
        </SliderThumb>
      </Slider>
      <Box flex="1">
      <Button
        mx={{base:0, md:2}} px={2} py={2}
        isFullWidth={true}
        variant="solid"
        bg="base_highlight_yellow"
        _hover={{background: "base_highlight_yellow" }}
        borderRadius="xl"
        _active={{transform: "scale(0.95)"}}
        isLoading={props.minting}
        isDisabled={props.total_items_minted >= max_mint}
        type = "submit"
        spinner={<BeatLoader size={8} color="white" />}
        loadingText="Minting"
        rightIcon={<FaIgloo/>}
        >
        {
          props.total_items_minted >= max_mint ? <Text fontWeight="600" fontSize={{base: "12px", md: "16px"}} >SOLD OUT !!!</Text> :
          (
            <>
              {
                props.launched ?
                <Text fontWeight="600" fontSize={{base: "12px", md: "16px"}} >
                  Mint {mint_value}/{process.env.NEXT_PUBLIC_MAX_MINT_PER_TXN} {'<PLACEHOLDER>'} {mint_value == 1 ? '':'s'} <br/>
                </Text>
                : <Text fontWeight="600" fontSize={{base: "12px", md: "16px"}} > Minting Coming Soon </Text>
              }
              <Text fontWeight="400" fontSize={{base: "8px", md: "14px"}}>({ (mint_value * 2)/100 } ETH)</Text>
            </>
          )
        }
      </Button>
      </Box>
      </Stack>
    </form>
  </Center>
  )
}

