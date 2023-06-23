import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { APP_TITLE } from "../../utils/constants";
import { whiteFontStyle, bgColorStyle } from "../../utils/styles";

const footerStyle = {
  padding: '1rem 0',
  ...bgColorStyle
};

const footerContainerStyle = {
  maxWidth: '1500px !important',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "space-between",
};

function Footer() {
  return (
    <Box sx={footerStyle}>
      <Container sx={footerContainerStyle}>
        <Typography sx={whiteFontStyle}>
          <Link href="https://github.com/eskaine/fgo-grandmaster" sx={whiteFontStyle}>
          eskaine
          </Link>
          &nbsp;© {APP_TITLE} 2023
        </Typography>
        <Typography display="inline" sx={whiteFontStyle}>
          <Link href="https://www.fate-go.jp/" sx={whiteFontStyle}>
            Fate/Grand Order
          </Link>
           &nbsp;© TYPE-MOON
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer; //