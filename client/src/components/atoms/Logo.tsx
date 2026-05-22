import { Fragment } from "react";
import type { LogoProps } from "../../types/TypeUI";

export default function Logo(props: LogoProps) {
  const { logo, className = "w-64 h-64", loading, location } = props;
  return (
    <Fragment>
      <a href={location} target="_blank" className={loading}>
        <img src={logo} className={`${className} rounded-full `} alt="" />
      </a>
    </Fragment>
  );
}
