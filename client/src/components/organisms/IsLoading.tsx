import { Fragment } from "react/jsx-runtime";
import Logo from "../atoms/Logo";

export default function LoadinScreen() {
  return (
    <Fragment>
      <div className="mx-auto my-auto flex justify-center p-10">
        <Logo className="" loading="none" />

        <div>
          <span>Loading...</span>
        </div>
      </div>
    </Fragment>
  );
}
