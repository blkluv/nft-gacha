import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SQPackage from "../src/components/SQPackage";
import { pageBoxStyle } from "../src/utils/styles";

const pageTitleStyle = {
  fontWeight: "bold",
  fontStyle: "italic",
  color: "#2962FF",
};

const packageBoxStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 5,
};

export default function SaintQuartz() {
  return (
    <Container maxWidth="lg">
      <Box sx={pageBoxStyle}>
        <Typography variant="h3" component="h1" sx={pageTitleStyle}>
          Saint Quartz Packages
        </Typography>
        <Box maxWidth="lg" sx={packageBoxStyle}>
          <SQPackage sqAmount="1" />
          <SQPackage sqAmount="10" />
          <SQPackage sqAmount="40" />
          <SQPackage sqAmount="90" />
          <SQPackage sqAmount="120" />
          <SQPackage sqAmount="150" />
        </Box>
      </Box>
    </Container>
  );
}
