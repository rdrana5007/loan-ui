"use client";
import { Grid } from "antd";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

export const useResponsive = () => {
  const screens = useBreakpoint();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return {
    screens,
    // isMobile: !screens.md,
    isTablet: screens.md && !screens.lg,
    isDesktop: screens.lg,
    isXL: screens.xl,
    isMobile
  };
};