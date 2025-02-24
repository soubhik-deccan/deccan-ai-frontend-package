import { TreeItem } from "@nosferatu500/react-sortable-tree";

export type TPNestedTreeProps = {
  value: TreeItem[];
  update: (treeData: TreeItem[]) => void;
};

// const initialTreeData = [
//   { title: "Chicken", children: [{ title: "Egg" }] },
//   { title: "Fish", children: [{ title: "Fingerlime" }] },
// ];
