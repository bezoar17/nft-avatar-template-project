import { useContext, useEffect, useState, useRef }  from "react";
import { MetaStateContext, MetaDispatchContext }    from "./store";


const chains = (chainId) => {
  if (!!Number(chainId) && chainId.length > 9) {
    return "local";
  }
  switch (chainId) {
    case "1" : return "mainnet";
    case "3" : return "ropsten";
    case "4" : return "rinkeby";
    case "5" : return "goerli";
    case "42": return "kovan";
    default  : return `unknown`;
  }
};

const useMetamask = () => {
  const state            = useContext(MetaStateContext);
  const dispatch         = useContext(MetaDispatchContext);
  const _isMounted       = useRef(true);
  const _isConnectCalled = useRef(false);
  const [ provider ]     = useState(window.ethereum);
  useEffect(() => {
    return () => {
      _isMounted.current = false;
    }
  }, []);

  const connect = async (Web3Interface, settings = {}) => {
    if (!provider)                throw Error("Metamask is not available");
    if (!Web3Interface)
      throw Error("Web3 Provider is required. You can use either ethers.js or web3.js");
    if (!_isMounted.current)      throw Error("Component is not mounted");
    if (_isConnectCalled.current) throw Error("Connect method already called");
    // _isConnectCalled.current = true; // Allow connecting if user has rejected once or twice

    const _web3 = new Web3Interface(
      ...(Object.keys(settings).length
        ? [provider, settings]
        : [provider])
    );
    dispatch({ type: "SET_WEB3", payload: _web3 });

    // prioritize network change subscriptions over account connection
    await getChain();
    attachChainListener();

    await getAccounts();
    window.ethereum.on("accountsChanged", (accounts) => {
      if (!accounts.length) dispatch({ type: "SET_CONNECTED", payload: false });
      dispatch({ type: "SET_ACCOUNT", payload: accounts });
    });

    _isConnectCalled.current = false;
  };

  const getAccounts = async () => {
    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
        params: []
      });
      if (accounts.length) {
        dispatch({ type: "SET_CONNECTED", payload: true });
        dispatch({ type: "SET_ACCOUNT", payload: accounts });
      }
      return accounts;
    } catch (error) {
      throw Error(error);
    }
  }

  const getChain = async () => {
    try {
      const chainId = await provider.request({
        method: "net_version",
        params: []
      });
      const _chainInfo = { id: chainId, name: chains(chainId) };
      dispatch({
        type: "SET_CHAIN",
        payload: _chainInfo
      });
      return _chainInfo;
    } catch (error) {
      throw Error(error);
    }
  }

  const attachChainListener = () => {
    window.ethereum.on("chainChanged", (chainId) => {
      const _chainId   = parseInt(chainId, 16).toString();
      const _chainInfo = { id: _chainId, name: chains(_chainId) };
      dispatch({ type: "SET_CHAIN", payload: _chainInfo });
    });
  }

  return {
    connect,
    getAccounts,
    getChain,
    attachChainListener,
    metaState: { ...state, isAvailable: !!provider },
  };
}

export default useMetamask;