import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { flexColStyle } from "../utils/styles";
import { useSaintQuartz } from "../hooks/useSaintQuartz";
import { Package } from "../utils/types";

interface params {
  index: number;
  sqPackage: Package;
}

const boxStyle = {
  ...flexColStyle,
  height: 250,
  width: 200,
  border: "3px solid #34495E",
  borderRadius: 5,
  backgroundColor: "#ECF0F1",
  cursor: "pointer",
  color: "#34495E",
  "&:hover": {
    backgroundColor: "#2962FF",
    color: "white",
  },
};

const textStyle = {
  fontStyle: "italic",
  fontWeight: "bold",
  textAlign: "center",
};

function SQPackage({ index, sqPackage }: params) {
  const { buyPackage } = useSaintQuartz();
  const { amount, price } = sqPackage;

  return (
    <Box sx={boxStyle} onClick={() => buyPackage(index, price)}>
      <Image
        src="/images/saintquartz.png"
        width={100}
        height={100}
        alt="Saint Quartz"
      />
      <br />
      <Typography variant="h5" sx={textStyle}>
        {price} Gwei
      </Typography>
      <Typography variant="h6" sx={textStyle}>
      {amount} Saint Quartz
      </Typography>
    </Box>
  );
}

export default SQPackage;
