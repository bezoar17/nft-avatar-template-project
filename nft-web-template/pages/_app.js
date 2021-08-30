import { ChakraProvider } from "@chakra-ui/react";
import { baseTheme } from "../styles/theme";
import { MetamaskStateProvider } from "../use-metamask/store";

// import "@fontsource/nunito/700.css"
// import "@fontsource/nunito/400.css"
// import "@fontsource/nunito/800.css"
// import "@fontsource/nunito/600.css"
// import "@fontsource/nunito/300.css"
// import "@fontsource/nunito/200.css"
// import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={baseTheme}>
      <MetamaskStateProvider>
        <Component {...pageProps} />
      </MetamaskStateProvider>
    </ChakraProvider>
  )
}

export default MyApp
