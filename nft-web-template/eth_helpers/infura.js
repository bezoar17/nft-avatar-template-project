import Web3 from "web3";
import init_data from "./data";

export const Infura = new Web3(new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_INFURA_HTTP))

export function Contract (w) { return new w.eth.Contract(init_data.abi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) }