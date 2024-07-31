import React from "react";
import {
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <footer style={{ backgroundColor: "#272727", padding: "20px 0" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} align={isMobile && "center"}>
            <Typography variant="body2" color="common.white">
              © 2024 Mental Bloom. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} align={isMobile ? "center" : "right"}>
            <Typography variant="body2" color="common.white">
              <Link href="#" underline="hover" color="primary">
                About Us
              </Link>
              <Link href="#" underline="hover" color="primary" sx={{ ml: 2 }}>
                Contact
              </Link>
              <Link
                href="/moderator"
                underline="hover"
                color="primary"
                sx={{ ml: 2 }}
              >
                Join us
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="middle" sx={{ mt: 2, mb: 1 }} />
        <Typography variant="body2" color="common.white" align="center">
          Made with 💚 by Mental Bloom.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
