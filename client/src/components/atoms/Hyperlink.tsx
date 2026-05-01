import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import type { Hyperlink } from "../../types/TypeUI";

export default function Hyperlink(props: Hyperlink) {
  const {
    toLink,
    Title,
    className = "text-gray-800 hover:text-[#589c00]",
  } = props;
  return (
    <Fragment>
      <Link to={toLink} className={className}>
        {Title}
      </Link>
    </Fragment>
  );
}
