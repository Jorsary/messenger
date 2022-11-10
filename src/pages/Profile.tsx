import { Avatar, Typography, Popover, Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import Modal from "../components/Modal";
import { useAppSelector } from "../hooks/redux-hooks";
import CreateIcon from '@mui/icons-material/Create';

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
          flexDirection:'column',
          borderRadius: 5,
          padding: 4,
          alignItems:'center',
          textAlign:'center'
        }}
      >
        <Avatar
          aria-describedby={id}
          onClick={(e) => handleClick(e)}
          sx={{
            maxWidth: 250,
            maxHeight: 250,
            background:'white',
            width:'50vw',
            height:'50vw'
          }}
          alt={`${currentUser?.displayName}`}
          src={`${currentUser?.photoURL}`}
        >
        </Avatar>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Modal />
        </Popover>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt:1
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {currentUser?.displayName}
          </Typography>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {currentUser?.email}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
