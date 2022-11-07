import { Box, Container } from "@mui/system";

const Settings = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 3,
      }}
    >
      <Box
        sx={{
          boxShadow: 4,
          display: "flex",
          borderRadius: 5,
          padding: 4,
        }}
      ></Box>
    </Container>
  );
};

export default Settings;
