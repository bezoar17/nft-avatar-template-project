import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  Text,
  Skeleton
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

const GalleryCard = (props) => {
  const assets_link = `https://opensea.io/assets/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/`
  const [img_loaded, setImageLoaded] = useState(false);
  const handle_img_load = () => {
    setImageLoaded(true)
  }

  return (
    <Box>
    <Flex px={2} pt={2} alignItems="center" justifyContent="center">
      <Box w="xs" bg="white" overflow="hidden" mx="auto" rounded="lg" as="a" href={`${assets_link}${props.item_id}`}
        target="_blank">
          {
            <>
            <Image w="full" h={64} fit="cover"
            src={`${process.env.NEXT_PUBLIC_IMG_CDN_URL}/${props.item_id}.png`} alt={`<PLACEHOLDER> #${props.item_id}`}
            fallbackSrc="/images/preview.gif"
            onLoad={handle_img_load}
            fallback={<Skeleton />}
            loading="lazy"
            // crossOrigin
            />
            </>
          }
        {/* { !img_loaded ? <Skeleton /> : <></> } */}
        <Box py={2} textAlign="center">
          <Text display="block" fontSize="md" color="gray.800" fontWeight="300">
            {`<PLACEHOLDER> #${props.item_id}`}
          </Text>
        </Box>
      </Box>
    </Flex>
    </Box>
  );
};

export default GalleryCard;