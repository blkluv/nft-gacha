import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import { flexColStyle } from "../utils/styles";

interface params {
  sqAmount: string;
  summonCount: string;
  backgroundColor: string;
}

const boxStyle = {
  ...flexColStyle,
  color: "#34495E",
};

const textStyle = {
  display: "flex",
  alignItems: "center",
  fontStyle: "italic",
  fontWeight: "bold",
  textAlign: "center",
};

const summonButtonStyle = {
  height: 100,
  width: 360,
  fontSize: 40,
  textTransform: "none"
};

function Summon({ sqAmount, summonCount, backgroundColor }: params) {
  return (
    <Box sx={boxStyle}>
      <Button sx={{...summonButtonStyle, backgroundColor }} variant="contained" size="large">
        {summonCount}x Summon
      </Button>
      <br />
      <span>
        <Typography variant="h5" sx={textStyle}>
          <Image
            src="/images/saintquartz.png"
            width={50}
            height={50}
            alt="Saint Quartz"
          />
          {sqAmount} Saint Quartz
        </Typography>
      </span>
    </Box>
  );
}

export default Summon;
