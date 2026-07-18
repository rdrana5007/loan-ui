"use client";
import { Grid } from "antd";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

export const useResponsive = () => {
  const screens = useBreakpoint();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isXL, setIsXL] = useState<boolean>(false);
  const [is2XL, setIs2XL] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;

      setIsMobile(width < 768);
      // setIsTablet(width >= 768 && width < 1024);
      // setIsDesktop(width >= 1024);
      setIsXL(width >= 1280);
      setIs2XL(width >= 1536);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return {
    screens,
    // isMobile: !screens.md,
    isTablet: screens.md && !screens.lg,
    isDesktop: screens.lg,
    // isXL: screens.xl,
    isMobile,
    isXL,
    is2XL
  };
};