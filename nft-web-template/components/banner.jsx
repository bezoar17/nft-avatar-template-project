import { FaBell } from 'react-icons/fa'
import { Box, HStack, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import BannerLink from './banner_link'

export default function Banner(props) { return(
  <Box as="section" zIndex="banner">
    <Stack
      direction={{ base: 'column', sm: 'row' }}
      justifyContent="center"
      alignItems="center"
      py="1"
      px={{ base: '3', md: '6', lg: '8' }}
      color="white"
      bg={useColorModeValue('orange.500', 'orange.500')}
    >
      <HStack spacing="3">
        <Icon as={FaBell} fontSize="2xl" h="10" />
        <Text fontWeight="bold" marginEnd="2">
        Announcing some random thing {'<PLACEHOLDER>'}
        </Text>
      </HStack>
      <BannerLink w={{ base: 'full', sm: 'auto' }} flexShrink={0}>
        Click here to read more {'<PLACEHOLDER>'}
      </BannerLink>
    </Stack>
  </Box>
)}