import { Avatar, Popover, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Wrapper from "../components/layout/Wrapper";
import Modal from "../components/Modal";
import { useAppSelector } from "../hooks/redux-hooks";

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user);



  if(currentUser?.displayName){return (
    <Wrapper>
      <Box sx={{
        width:'100%',
        display:'flex',
        alignItems:'center',
        flexDirection:'column'
      }}>
        <Avatar
          sx={{
            maxWidth: 250,
            maxHeight: 250,
            background: "white",
            width: "50vw",
            height: "50vw",
          }}
          alt={`${currentUser?.displayName}`}
          src={`${currentUser?.photoURL}`}
        />
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
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
        </Box>
      </Box>
    </Wrapper>
  );}else{
    return <Navigate to="/settings" replace={true} />
  }
};

export default Profile;
