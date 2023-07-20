"use client";

import { BounceLoader } from "react-spinners";

import Box from "@/components/Box";

const Loading = () => {
  return ( 
    <Box classname="h-full flex items-center justify-center">
      <BounceLoader color="#1976D2" size={40} />
    </Box>
  );
}
 
export default Loading;