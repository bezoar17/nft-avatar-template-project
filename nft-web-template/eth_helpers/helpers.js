import {Contract, Infura} from '../eth_helpers/infura';
import { Web3 } from "web3";

const error_toast_options = {
  status: "error",
  position: "top",
  duration: 2000,
  isClosable: true,
}

function show_toast(toast_helper, id, title, status="error", duration=2000){
  !toast_helper.isActive(id) && toast_helper({...error_toast_options, title: title, id: id, status: status, duration: duration})
}

// connect_to_mainnet, mintion and connect buttons
async function connected_to_mainnet(ms, toast){
  // install metamask
  if (!ms.isAvailable) {
    show_toast(toast, "install_metamask", "Please install Metamask")
    return false
  }

  let connect_val = is_connected(ms)

  // not on mainnet, change network, and reload
  if (ms.chain.id != process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_ID) {
    show_toast(toast, "not_on_mainnet" ,"Not on mainnet, please switch network to Mainnet")
    return false
  }

  // connect to metamask
  if (connect_val == 0) {
    show_toast(toast, "please_connect_metamask", "Please connect to Metamask")
    return false
  }

  return true
}

function pre_connect_check(ms, toast) {
  // install metamask
  if (!ms.isAvailable) {
    show_toast(toast, "install_metamask", "Please install Metamask")
    return false
  }

  let connect_val = is_connected(ms)

  // not on mainnet, change network, and reload
  // if (ms.chain.id != process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_ID) {
  //   show_toast(toast, "not_on_mainnet" ,"Not on mainnet, please switch network to Mainnet")
  //   return false
  // }

  // alrady connected to metamask
  if (connect_val == 1) {
    return false
  }
  return true
}

function is_connected(ms){
  if (!ms.isConnected) { return 0 }
  if (ms.chain.id != process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_ID) { return -1 }
  return 1
}

async function minted_item_count_for_user(ms){
  if(!ms.account[0]) {return 0}
  return Contract(ms.web3 ?? Infura).methods.walletOfOwner(ms.account[0]).call()
}

async function userBalance(ms) {
  if (!is_connected(ms)) { return 0 }
  const e = await ms.web3.eth.getBalance(ms.account[0]);
  return ms.web3.utils.fromWei(e, "ether")
}

async function estimateGas(ms, mint_attempt_count, price) {
  if (!is_connected(ms)) { return 0 }
  return Contract(ms.web3).methods.mint(ms.account[0], mint_attempt_count).estimateGas({
    value: price,
    from: ms.account[0]
  });
}

async function totalItemsMinted(ms) {
  let w3 = ms.web3 ?? Infura
  return Contract(w3).methods.totalSupply().call();
}

async function itemPrice(ms) {
  let w3 = (ms.web3 ?? Infura)
  return Contract(w3).methods.getPrice().call();
}

async function revealImages(transfer_obj){
  let ids = [transfer_obj].flat().map(item => item.returnValues.tokenId).join(',')
  let url = new URL(process.env.NEXT_PUBLIC_APP_DOMAIN + '/api/reveal_image')
  url.search = new URLSearchParams({ ids: ids })
  return await fetch(url);
}

async function updateDiscord(receipt, items_left){
  let transfer_obj = receipt.events.Transfer
  let ids = [transfer_obj].flat().map(item => item.returnValues.tokenId)

  let embeds = {
    embeds: [{
        title: ":tada: <PLACEHOLDER>",
        description: "Someone just minted " + ids.length + " <PLACEHOLDER>" + (ids.length > 1 ? "s":""),
        color: 16637957,
        // color: <PLACEHOLDER>,
        image: {
            url: process.env.NEXT_PUBLIC_APP_DOMAIN + "images/preview.gif"
        },
        fields: [{
            name: "<PLACEHOLDER> left",
            value: items_left+ `/${process.env.NEXT_PUBLIC_MAX_SUPPLY.toLocaleString()}`,
            inline: false
        }, {
            name: "Txn Hash",
            value: `${process.env.NEXT_PUBLIC_ETHERSCAN}tx/${receipt.transactionHash}`
        },
        {
            name: "View on OpenSea",
            value: `https://opensea.io/${receipt.from}/${process.env.NEXT_PUBLIC_OPENSEA_SLUG}?search[sortBy]=LISTING_DATE`
        }
      ]
    }]
  }
  return await fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(embeds)
  });
}

async function startMint(ms, mint_attempt_count, set_minting_flag, set_txn_hash, toast, play_sound) {
  try {
  set_minting_flag(true)

  let res = await connected_to_mainnet(ms, toast)
  if (!res) {
    set_minting_flag(false)
    return
  }

  let connect_val = is_connected(ms)
  let items_left = null
  let total_items_price = null
  let user_balance = null
  let estimate = null
  let gas = null
  let user_account = null

  // connected to mainnet
  if (connect_val == 1){

    // min, max_limit
    if (!(mint_attempt_count>= 1 && mint_attempt_count<=process.env.NEXT_PUBLIC_MAX_MINT_PER_TXN)) {
      show_toast(toast, "wrong_mint_count", `Can mint a max of ${process.env.NEXT_PUBLIC_MAX_MINT_PER_TXN} <PLACEHOLDER>, min of 1`);
      set_minting_flag(false)
      return false }

    // check if items are left
    const reserved_items = 0
    items_left = process.env.NEXT_PUBLIC_MAX_SUPPLY - parseInt(await totalItemsMinted(ms)) - (reserved_items)
    if (items_left < mint_attempt_count){
      show_toast(toast, "items_over", `Only ${items_left} <PLACEHOLDER> left`);
      set_minting_flag(false)
      return false
    }

    // check total item price
    let item_price = await itemPrice(ms)
    total_items_price =  mint_attempt_count * item_price

    user_account = ms.account[0]

    // userBalance
    user_balance = await userBalance(ms)

    let eth_total_items_price = ms.web3.utils.fromWei(total_items_price.toString(), "ether")
    if (user_balance <= eth_total_items_price) {
      show_toast(toast, "not_enough_ether", `Not enough ether in your account, you need atleast ${eth_total_items_price} + gas`, "error", 6000);
      // play_sound({id: "abandoned"})
      set_minting_flag(false)
      return false
    }

    // estimateGas
    estimate = await estimateGas(ms, mint_attempt_count, total_items_price)

    gas = await ms.web3.eth.getGasPrice()

    // send transaction
    const params = {
      gas: parseInt(estimate),
      gasPrice: parseInt(1.13 * gas),
      from: user_account,
      value: total_items_price
    }

    let res = !0;

    res = await Contract(ms.web3).methods.mint(user_account, mint_attempt_count).send(params)
                .on("receipt", function (receipt) {
                  (async () => { await revealImages(receipt.events.Transfer); })();

                  (async () => { await updateDiscord(receipt, items_left); })();
                  // # update link for images
                  set_minting_flag(false)
                  show_toast(toast, "minting_info", "Congrats! <PLACEHOLDER>", "success", 5000)
                  // play_sound({id: "mint_success"})
                }).on("transactionHash", (function(txn_hash) {
                  set_txn_hash(txn_hash)
                  show_toast(toast, "minting_info", "Minting ...", "info")
                  })).on("error", function (error) {
                  set_minting_flag(false)
                  if (error.code == 4001) {
                    {
                      // play_sound({id: "abandoned"})
                      show_toast(toast, "minting_info", "Awww, <PLACEHOLDER>", "error", 6000)
                    }
                  }
                  else{
                    // play crash !!
                    // play_sound({id: "abandoned"})
                    show_toast(toast, "minting_info", "Awww, <PLACEHOLDER>", "error", 6000)
                  }
                })
    set_minting_flag(false)
    return res
    }
  }
  catch (error) {
    set_minting_flag(false)
    throw error
  }
}

export {
is_connected,
minted_item_count_for_user,
startMint,
userBalance,
estimateGas,
totalItemsMinted,
itemPrice,
pre_connect_check,
connected_to_mainnet
};
