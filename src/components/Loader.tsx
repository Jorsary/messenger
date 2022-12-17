import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface propType {
  height?: string | number;
  width?: string | number;
  loaded?: boolean
}

const Loader = ({height,width,loaded}:propType) => {
  return (
    <Box
      sx={{
        display: loaded ? 'flex' : 'none',
        alignItems: "center",
        justifyContent: "center",
        height: height ? height : '100%',
        width: width
      }}
    >
      <CircularProgress sx={{color:'secondary.dark'}} />
    </Box>
  );
};

export default Loader;
