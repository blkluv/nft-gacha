import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SQPackage from "../src/components/SQPackage";
import { pageBoxStyle } from "../src/utils/styles";
import { useSaintQuartz } from "../src/hooks/useSaintQuartz";

interface Package {
  amount: number;
  price: number;
}

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
  const { fetchSqPackages } = useSaintQuartz();

  const [packages, setPackages] = useState([] as Package[]);

  async function fetchPackages() {
    try {
      const data = await fetchSqPackages();

      if (data) {
        const parsedData = data.map((d) => ({
          amount: Number(d[1]),
          price: Number(d[0]),
        }));

        setPackages(parsedData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={pageBoxStyle}>
        <Typography variant="h3" component="h1" sx={pageTitleStyle}>
          Saint Quartz Packages
        </Typography>
        <Box maxWidth="lg" sx={packageBoxStyle}>
          {packages.map(sqPackage => <SQPackage sqAmount={sqPackage.amount} />)}
        </Box>
      </Box>
    </Container>
  );
}
