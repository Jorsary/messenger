import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface propType {
  isLoad: boolean;
}

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loader;
