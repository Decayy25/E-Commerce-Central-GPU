import { Fragment } from "react/jsx-runtime";
import Label from "../atoms/Label";
import Layout from "../molecules/Layout";

interface CategoryProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Category({
  selectedCategory,
  onSelectCategory,
}: CategoryProps) {
  return (
    <Fragment>
      <Layout className="none">
        <Label
          className={"font-medium text-gray-700"}
          htmlfor="category-select"
        />

        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
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
