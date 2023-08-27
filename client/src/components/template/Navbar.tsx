import { useState, useEffect } from "react";
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
import { useAccount } from "wagmi";
import { useSaintQuartz } from "../../hooks/useSaintQuartz";
import { bgColorStyle, flexRowStyle } from "../../utils/styles";

const sqDisplayStyle = {
  height: 40,
  backgroundColor: "white !important",
  color: "#34495E !important",
  fontSize: 20,
};

const typographyStyle = {
  mr: 2,
  fontWeight: 700,
  color: "inherit",
  textDecoration: "none",
};

const pages = [
  {
    label: "Saint Quartz",
    link: "/saintquartz",
  },
];

function Navbar() {
  const [sqAmount, setSqAmount] = useState(0); 
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );

  const { isConnected } = useAccount();
  const { fetchSqAmount } = useSaintQuartz();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const getSqAmount = async () => {
        const amount = await fetchSqAmount();
        setSqAmount(amount!);
  }

  useEffect(() => {
    if(isConnected) {
      getSqAmount();
    }
  }, [isConnected, sqAmount]);

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
              ...typographyStyle,
              display: { xs: "none", md: "flex" },
              fontFamily: "ubuntu",
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
              ...typographyStyle,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              letterSpacing: ".3rem",
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
                  &nbsp; {sqAmount}
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
