import { chakra, Divider, Spacer, Center, Flex, Heading, VStack, StackDivider, Box, useToast} from '@chakra-ui/react';
import useMetamask  from "../use-metamask/useMetamask";
import Web3 from "web3";
import MetamaskConnection from "./metamask_connection";
import { useEffect, useState } from "react";
import MintItem from './mint_item';
import ItemMintCount from './item_mint_count';
import {is_connected, totalItemsMinted } from '../eth_helpers/helpers';
import MintResult from './mint_result';

export default function MetamaskSection(props){
  const { connect, metaState, getChain, attachChainListener, getAccounts } = useMetamask();

  const [not_mainnet_flag, set_not_mainnet_flag] = useState(false);
  const [minting, set_minting_flag] = useState(false);
  const [txn_hash, set_txn_hash] = useState(null);

  const total_items_minted_init = process.env.NEXT_PUBLIC_MAX_SUPPLY
  const reserved_items = 0
  const [ total_items_minted, set_total_items_minted ] = useState(total_items_minted_init)
  useEffect(() => {
    const interval = setInterval(() => {
      totalItemsMinted(metaState).then(v=> {console.log('setting mint val');
      set_total_items_minted(parseInt(v)+reserved_items)
    })
    }, process.env.NEXT_PUBLIC_MINTED_COUNT_FETCH_DURATION);
    return () => clearInterval(interval)
  }, [total_items_minted]);

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
    // let chain = null
    // if (!metaState.isConnected) {
    //   (async () => {
    //     try {
    //       // dont initiate auto connect if user not on main network
    //       chain = await getAccounts();
    //       chain = await getChain();

    //       console.log("Initial call, ", chain.id)
    //       if (chain.id != process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_ID) {
    //         attachChainListener(); // still attach a network change listener here
    //         set_not_mainnet_flag(true)
    //       }
    //       else { await connect(Web3)};
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   })();
    // }
  }, []);

  useEffect(() => {
    let chain = metaState.chain
    // console.log("section effect called, ",chain.id)
    if ( chain.id != null ) {
      set_not_mainnet_flag((chain.id != process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_ID))
    }
    else{
      // attachChainListener();
    }
  }, [metaState.chain.id]);

  return(
    <Box {...props}
      maxW="700px"
      w="auto"
      px={{base:5, md: 20}}
      pt={2}
      mx="auto"
      borderWidth={(is_connected(metaState) == 1) ? "medium" : "none"}
      borderRadius="xl"
      borderColor={"base_highlight_yellow"}
      // id="mint"
      >
      <Flex direction="column"  wrap="wrap" >
        <MetamaskConnection not_mainnet_flag={not_mainnet_flag} minting={minting}/>

        <MintItem {...props} not_mainnet_flag={not_mainnet_flag} minting={minting} set_minting_flag={set_minting_flag} set_txn_hash={set_txn_hash} total_items_minted={total_items_minted}/>
        <MintResult {...props} txn_hash={txn_hash} minting={minting}/>
        <ItemMintCount {...props} total_items_minted={total_items_minted}/>
      </Flex>
    </Box>
  )
}