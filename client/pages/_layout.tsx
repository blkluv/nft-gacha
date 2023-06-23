
import { PropsWithChildren } from "react";
import Box from '@mui/material/Box';
import Navbar from '../src/components/template/Navbar';
import Footer from '../src/components/template/Footer';

const flexStyle = {
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: "space-between",
};

function Layout({ children }: PropsWithChildren) {
  return (
    <Box sx={flexStyle}>
      <Navbar />
        {children}
      <Footer />
    </Box>
  );
}

export default Layout;
