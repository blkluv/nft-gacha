import * as React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { APP_TITLE } from "../../utils/constants";
import { bgColorStyle, flexRowStyle } from "../../utils/styles";

import { useAccount } from "wagmi";

const sqDisplayStyle = {
  height: 40,
  backgroundColor: "white !important",
  color: "#34495E !important",
  fontSize: 20,
};

const pages = [
  {
    label: "Saint Quartz",
    link: "/saintquartz",
  },
];

function Navbar() {
  const { isConnected } = useAccount();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={bgColorStyle}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "ubuntu",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {APP_TITLE}
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Container sx={flexRowStyle}>
            <Box>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  href={page.link}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            {isConnected && (
              <Box>
                <Button sx={sqDisplayStyle} variant="contained" disabled>
                  <Image
                    src="/images/saintquartz.png"
                    width={35}
                    height={35}
                    alt="Saint Quartz"
                  />{" "}
                  &nbsp; 20
                </Button>
              </Box>
            )}

            <Box>
              <ConnectButton />
            </Box>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
