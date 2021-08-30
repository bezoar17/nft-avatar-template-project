import React from "react";

import {
  chakra,
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  GridItem,
  Image
} from "@chakra-ui/react";

export default function Milestones(props) {
  const Feature = (props) => {
    return (
      <Flex>
        <Flex shrink={0}>
          <Icon boxSize={5} mt={1} mr={2} color={props.color} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            ></path>
          </Icon>
        </Flex>
        <Box ml={4}>
          <chakra.dt fontSize="lg" fontWeight="300" lineHeight="6" color={props.color}> {props.title} </chakra.dt>
          <chakra.dd mt={2} color={props.color}> {props.children} </chakra.dd>
        </Box>
      </Flex>
    );
  };

  return (
    <Flex w="auto" justifyContent="center" alignItems="center">
      <Box shadow="xl" bg={props.bg} px={8} py={12} mx="auto">
        <SimpleGrid alignItems="center" columns={{ base: 1, lg: 3 }} spacingY={{ base: 10, lg: 32 }} spacingX={{ base: 10, lg: 24 }}>
          <Box alignSelf="start">
            <Image src={props.img_src} alt={props.heading}></Image>
          </Box>
          <GridItem colSpan={2}>
            <Stack spacing={{ base: 10, md: 0 }} display={{ md: "grid" }} gridTemplateColumns={{ md: "repeat(2,1fr)" }} gridColumnGap={{ md: 8 }} gridRowGap={{ md: 5 }}>
              { props.bullets.map((bullet) => { return <Feature key={`${bullet}${props.heading}`} color={props.color} title={bullet} /> }) }
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}