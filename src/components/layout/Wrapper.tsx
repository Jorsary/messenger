import React from "react";
import { Box, Container } from "@mui/system";
import { ImageTwoTone } from "@mui/icons-material";

interface PropsState {
  children: React.ReactNode
}

const Wrapper = ({children}: PropsState) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 1,
      }}
    >
      <Box
        sx={{
          boxShadow: { xs: 0, md: 4 },
          borderRadius: 5,
          display:'flex',
          padding: { xs: 0, md: 4 },
          height: { xs: "85vh", md: "90vh" },
          width: "100%",
        }}
      >
        
        {children}
      </Box>
    </Container>
  );
};

export default Wrapper;
