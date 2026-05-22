import { Fragment } from "react/jsx-runtime";
import Logo from "../atoms/Logo";
import Img from "../../assets/Logo.png";
import Label from "../atoms/Label";

export default function LoadingScreen() {
  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center gap-6 h-screen">
        <div className="inline-block p-1 rounded-full hex-border">
          <Logo className="w-40 h-40 flex flex-col justify-center" logo={Img} />
        </div>

        <div className="flex justify-center">
          <Label
            Title="Loading ..."
            className="font-bold text-3xl text-[var(--Nvidia--)]"
          />
        </div>
      </div>
    </Fragment>
  );
}
