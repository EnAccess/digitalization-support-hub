import React from "react";
import { Button as AntButton } from "antd";

interface ToolMapButtonProps {
  onClick: () => void;
}

const ToolMapButton: React.FC<ToolMapButtonProps> = ({ onClick }) => (
  <AntButton 
    onClick={onClick}
    size="large"
    className="bg-[#2D6A4F] text-white hover:bg-[#1B4332] transition-colors"
  >
    Open Tool Finder
  </AntButton>
);

export default ToolMapButton;