import { Divider, Spacer, Center, Flex, Heading, VStack, StackDivider, Box, useToast} from '@chakra-ui/react';
import useMetamask  from "../use-metamask/useMetamask";
import Web3 from "web3";
import GalleryMetamaskConnection from "./gallery_metamask_connection";
import { useEffect, useState } from "react";
import {is_connected } from '../eth_helpers/helpers';

export default function GalleryMetamaskSection(props){
  const { connect, metaState, getChain, attachChainListener, getAccounts } = useMetamask();
  const [not_mainnet_flag, set_not_mainnet_flag] = useState(false);
  const init_launch = async () => {
    try {
        // dont initiate auto connect if user not on main network
        let chain = await getAccounts();
        chain = await getChain();

        // console.log("Initial call, ", chain.id)
        if (chain.id != process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_ID) {
          attachChainListener(); // still attach a network change listener here
          set_not_mainnet_flag(true)
        }
        else { await connect(Web3)};
      } catch (error) {
        console.log(error);
      }
  }

  // instead of calling it from useEffect, you can also call connect method from button click handler
  useEffect(() => {

    (async () => {
      if (window.ethereum !== undefined){
        attachChainListener();
      }
    })();

    let chain = null
    if (!metaState.isConnected) {
      init_launch()
    }
  }, []);

  useEffect(() => {
    let chain = metaState.chain
    if ( chain.id != null ) {
      set_not_mainnet_flag((chain.id != process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_ID))
    }
  }, [metaState.chain.id]);

  return(
    <Box {...props} w="auto" px={{base:5, md: 20}} pt={2} mx="auto">
      <GalleryMetamaskConnection not_mainnet_flag={not_mainnet_flag} />
    </Box>
  )
}