import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Summon from "../src/components/Summon";
import { pageBoxStyle } from "../src/utils/styles";

const summonContainerStyle = {
  width: 900,
  display: "flex",
  justifyContent: "space-around",
};

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={pageBoxStyle}>
        <Image src="/images/banner.png" width={900} height={300} alt="Banner" />
        <Box sx={summonContainerStyle}>
          <Summon sqAmount="3" summonCount="1" backgroundColor="#8E44AD" />
          <Summon sqAmount="30" summonCount="10" backgroundColor="#F1C40F" />
        </Box>
      </Box>
    </Container>
  );
}
