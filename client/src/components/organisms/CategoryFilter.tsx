import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Label from "../atoms/Label";
import Layout from "../molecules/Layout";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <Fragment>
      <Layout className="none">
        <Label
          className={"font-medium text-gray-700"}
          Title={"Category:"}
          htmlFor="none"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        >
          <option value="All">All</option>
          <option value="GPU">GPU</option>
          <option value="CPU">CPU</option>
          <option value="RAM">RAM</option>
          <option value="Motherboard">Motherboard</option>
        </select>
      </Layout>
    </Fragment>
  );
}
