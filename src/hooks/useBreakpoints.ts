import { useState, useEffect } from "react";
const breakpoints = {
  md: 768,
  lg: 992,
  xl: 1200,
};
const useBreakpoints = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    isMdUp: width >= breakpoints.md,
    isLgUp: width >= breakpoints.lg,
    isXlUp: width >= breakpoints.xl,
    isMdDown: width < breakpoints.md,
    isLgDown: width < breakpoints.lg,
    isXlDown: width < breakpoints.xl,
  };
};
export default useBreakpoints;