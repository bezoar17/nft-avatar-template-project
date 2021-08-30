import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  Text,
  useColorModeValue,
  Link,
  IconButton,
  Center
} from "@chakra-ui/react";

import { FaInstagram, FaTwitter } from 'react-icons/fa'

const TeamMember = (props) => {
  return (
    <Box>
    <Flex
      // bg="white"
      px={2} pt={2} alignItems="center" justifyContent="center"
      // bg={useColorModeValue("#F9FAFB", "gray.600")} px={5} pt={5} alignItems="center" justifyContent="center"
      // p={10}
      // w="full"
      // rounded="lg"
    >
      <Box
        w="xs" bg="white" overflow="hidden" mx="auto"
        // shadow="lg"
        rounded="lg"
      >
        <Image w="full" h={64} fit="cover" src={props.img_src} alt={props.name}/>
        <Box py={2} textAlign="center">
          <Text display="block" fontSize="2xl" color="black" fontWeight="600">
            {props.name}
          </Text>
          <chakra.span fontSize="md" color="gray.800" fontWeight="300">
            {props.role}
          </chakra.span>
        </Box>
      </Box>
    </Flex>
    <Center>
    {
      (!!props.insta) ?
      <IconButton color="white" fontSize="3xl" mx="0.5em" my="0.5em" as="a" href={props.insta} background="none" target="_blank" aria-label="Instagram" icon={<FaInstagram />}
      _hover={{background: "none"}}/>
       : <></>
    }
    {
      (!!props.twitter) ?
      <IconButton color="white" fontSize="3xl" mx="0.5em" my="0.5em" as="a" href={props.twitter} background="none" target="_blank" aria-label="Instagram" icon={<FaTwitter />}
      _hover={{background: "none"}}/>
       : <></>
    }
    </Center>
    </Box>
  );
};

export default TeamMember;