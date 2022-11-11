import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Navigate } from "react-router-dom";
import Wrapper from "../components/layout/Wrapper";
import { useAppSelector } from "../hooks/redux-hooks";
import stringToColor from "../utlis/stringToColor";

const Profile = () => {
  const { displayName, photoURL } = useAppSelector((state) => state.user);

  if (displayName) {
    return (
      <Wrapper>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              maxWidth: 250,
              maxHeight: 250,
              background: "white",
              width: "50vw",
              height: "50vw",
              bgcolor: stringToColor(`${displayName}`),
            }}
            alt={`${displayName}`}
            src={`${photoURL}`}
          />
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {displayName}
          </Typography>
        </Box>
      </Wrapper>
    );
  } else {
    return <Navigate to="/settings" replace />;
  }
};

export default Profile;
