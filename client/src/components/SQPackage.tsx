import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { flexColStyle } from "../utils/styles";

interface params {
  sqAmount: string;
}

const boxStyle = {
  ...flexColStyle,
  height: 250,
  width: 200,
  border: "3px solid #34495E",
  borderRadius: 5,
  backgroundColor: "#ECF0F1",
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

function SQPackage({ sqAmount }: params) {
  return (
    <Box sx={boxStyle}>
      <Image
        src="/images/saintquartz.png"
        width={100}
        height={100}
        alt="Saint Quartz"
      />
      <br />
      <Typography variant="h4" sx={textStyle}>
        {sqAmount}
      </Typography>
      <Typography variant="h5" sx={textStyle}>
        Saint Quartz
      </Typography>
    </Box>
  );
}

export default SQPackage;
