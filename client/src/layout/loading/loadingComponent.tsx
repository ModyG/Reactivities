import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

interface Props {
  content: string;
}

const LoadingCompo = ({ content }: Props) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
      <h4> {content} </h4>
    </Box>
  )
}

export default LoadingCompo;