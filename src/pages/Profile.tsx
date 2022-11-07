import {
  Avatar, Typography
} from "@mui/material";
import { Box, Container } from "@mui/system";

const Profile = () => {
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
      >
        <Avatar
          sx={{
            width: 250,
            height: 250,
            mr: "2%",
          }}
        ></Avatar>
        <Box
          sx={{
            py: 12,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nickname
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Email@mail.ru
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
