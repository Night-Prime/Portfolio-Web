import React from "react";

// This would be my primary container which would be responsive on all screen and resuable

const PrimaryContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="min-h-auto min-w-screen">{children}</div>;
};

export default PrimaryContainer;
