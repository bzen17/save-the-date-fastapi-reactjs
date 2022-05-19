import React from "react";
import { Portrait, Desktop,Default,Mobile } from "../config/responsive";
import LogoPortrait from "./LogoPortrait";
import LogoLandscape from "./LogoLandscape";
const Logo = ({padding,scale,navbar}) => {
  return (
    <>
      <Mobile>
        <LogoPortrait padding={padding} scale={scale} navbar={navbar}/>
      </Mobile>
      <Default>
        <LogoLandscape padding={padding} scale={scale}/>
      </Default>
    </>
  );
};

export default Logo;