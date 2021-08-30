import { Box, Button, Center, Tooltip, Text, IconButton, Image, Flex, Link, VStack, Container} from '@chakra-ui/react';
import useMetamask from "../use-metamask/useMetamask";
import { useState, useEffect } from "react";
import { FaEthereum, FaExternalLinkAlt } from 'react-icons/fa'
import { VscDebugDisconnect } from 'react-icons/vsc'
import Web3 from "web3";
import {is_connected, minted_item_count_for_user, pre_connect_check} from '../eth_helpers/helpers';
import { useToast } from "@chakra-ui/react"

export default function MetamaskConnection(props) {
  const { connect, metaState } = useMetamask()

  const [item_count, setItemCount] = useState(0);
  const toast_helper = useToast()

  const item_collection_link = `https://opensea.io/${metaState.account}/${process.env.NEXT_PUBLIC_OPENSEA_SLUG}?search[sortBy]=LISTING_DATE`

  useEffect(()=>{
    if (is_connected(metaState) == 1) {
      try {
        minted_item_count_for_user(metaState).then(v => {setItemCount(v.length)})
      } catch (error) {
        console.log(error);
      }
    }
  },[metaState, props.minting])

  return (
    <Center px={1} mx={1}>
      <VStack>
        <Box>
          <Tooltip hasArrow label="Not on mainnet" bg="red.600" isDisabled={ !metaState.isAvailable || !props.not_mainnet_flag}>
          <Button
            bg={(is_connected(metaState) == 1) ? "base_highlight_yellow" : "base_back_blue"}
            color={(is_connected(metaState) == 1) ? "base_back_blue" : "white"}
            variant={(is_connected(metaState) == 1) ? "ghost" : "outline"}
            leftIcon={(is_connected(metaState) == 1) ? <FaEthereum /> :  <VscDebugDisconnect />}
            borderRadius="xl"
            borderColor={(is_connected(metaState) == 1) ? "white" : "base_highlight_yellow"}
            isFullWidth={true}
            as={(!metaState.isAvailable ? "a": "button")}
            href="https://metamask.io/download" target="_blank"
            _active={{ transform: "scale(0.95)"}}
            _hover={{background: (is_connected(metaState) == 1) ? "base_highlight_yellow" : "base_back_blue"}}
            onClick={ (e) => {
              (async ()=>{
                try {
                  if (pre_connect_check(metaState, toast_helper)) {
                    await connect(Web3);
                  }
                }
                catch(error){ console.log(error);}
              })();
            }}
            >
            {
              (!metaState.isAvailable ? <Link target="_blank">Install Metamask</Link> : ((is_connected(metaState) == 1) ? 'Connected to Metamask' : 'Connect Metamask'))
            }
          </Button>
          </Tooltip>
        </Box>
        <Box display={(is_connected(metaState) == 1) ? "inline" : "none" } fontSize={{base:"md", md:"lg"}}>
          <Text fontWeight="bold">
          {
            ((is_connected(metaState) == 1) && item_count > 0) ? `You have ${item_count} <PLACEHOLDER> !!` : "You don't have any <PLACEHOLDER>"
          }
          </Text>
          <Box as="a" target="_blank" href={item_collection_link} fontSize="18px" display={(item_count > 0) ? "inline" : "none" }>
            <Link>View them on OpenSea</Link>
            <Image display="inline" ml="0.3em" borderRadius="md" src="images/footer-opensea.svg" alt="Opensea" boxSize={{base:"10px", md:"18px"}}></Image>
          </Box>
          <Box><Link target="_blank" href="/gallery">View them in gallery</Link></Box>
        </Box>
      </VStack>
    </Center>
  )
}

