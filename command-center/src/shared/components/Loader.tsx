import React from "react";
import Lottie from "react-lottie";
import animation from "../../assets/loader.json";

const Loader: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  } as const;

  return (
    <div style={overlayStyle}>
      <div>
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
    </div>
  );
};

export default Loader;
