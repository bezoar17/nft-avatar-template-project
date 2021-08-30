import { Text, Box, Heading, Center, SimpleGrid, Image} from '@chakra-ui/react';
import TeamMember from "../components/team_member";

export default function Team(props) {

  return (
    <Box {...props} id="team">
      <Center><Heading as="h2" fontSize={{base: "60px", md:"100px"}} fontWeight="bold" mb={12} color="base_highlight_yellow">Team</Heading></Center>
      <Center>
        <SimpleGrid columns={{base: 1, md:2, lg: 4}} spacing="20px">
          <TeamMember img_src="images/<PLACEHOLDER>.png" name="<PLACEHOLDER>" role="Design" insta="<PLACEHOLDER>" twitter = "<PLACEHOLDER>"/>
          <TeamMember img_src="images/<PLACEHOLDER>.png" name="<PLACEHOLDER>" role="Dev" twitter = "<PLACEHOLDER>"/>
          <TeamMember img_src="images/<PLACEHOLDER>.png" name="<PLACEHOLDER>" role="Community"/>
          <TeamMember img_src="images/<PLACEHOLDER>.png" name="<PLACEHOLDER>" role="QA/Dev"/>
        </SimpleGrid>
      </Center>
    </Box>
  )
}