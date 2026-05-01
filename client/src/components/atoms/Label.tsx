import { Fragment } from "react/jsx-runtime";
import type { LabelProps } from "../../types/TypeUI";

export default function label(props: LabelProps) {
  const {
    htmlfor = "loading",
    className = "flex justify-center mx-auto my-4 p-4",
    Title,
  } = props;
    return (
    <Fragment>
        <div className={className}>
            <label htmlFor={htmlfor}>{Title}</label>
        </div>
    </Fragment>
    );
}