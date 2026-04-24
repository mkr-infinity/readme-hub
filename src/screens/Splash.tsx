import React, { useEffect } from "react";

const Splash: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    onComplete?.();
  }, [onComplete]);
  return null;
};

export default Splash;
