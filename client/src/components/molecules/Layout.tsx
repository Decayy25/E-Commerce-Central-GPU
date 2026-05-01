import { Fragment } from "react/jsx-runtime";
import type { LayoutProps } from "../../types/TypeUI";

export default function Layout(props: LayoutProps) {
  const { children ,className = "min-h-screen bg-gray-50 mt-20" } = props;
  return (
    <Fragment>
      <div className={className}>
        {children}
      </div>
    </Fragment>
  );
}
