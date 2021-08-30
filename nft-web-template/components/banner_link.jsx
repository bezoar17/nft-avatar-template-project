import { chakra } from '@chakra-ui/react'

export default function BannerLink(props) { return (
  <chakra.a
    {...props}
    href="<PLACEHOLDER>"
    px="4"
    py="1.5"
    textAlign="center"
    borderWidth="1px"
    borderColor="whiteAlpha.400"
    fontWeight="medium"
    rounded="base"
    target="_blank"
    _hover={{ bg: 'whiteAlpha.200' }}
  />
)}