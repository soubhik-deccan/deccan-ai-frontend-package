import SortableTree, {
  removeNodeAtPath,
  TreeItem,
} from "@nosferatu500/react-sortable-tree";
import "@nosferatu500/react-sortable-tree/style.css";
import { FC, useCallback } from "react";
import { PiTrashLight } from "react-icons/pi";
import PButton from "../PButton";
import { TPNestedTreeProps } from "./type";

const PNestedTree: FC<TPNestedTreeProps> = ({ value = [], update }) => {
  const getNodeKey = ({ treeIndex }: { treeIndex: number }) => treeIndex;

  const deleteNode = useCallback(
    (path: number[]) => {
      if (path.length === 0) {
        return;
      }

      const updatedTreeData = removeNodeAtPath({
        treeData: value,
        path,
        getNodeKey,
      });

      update(updatedTreeData);
    },
    [value, update]
  );

  return (
    <div className="p-nested-tree">
      <SortableTree
        treeData={value}
        onChange={(newTreeData: TreeItem[]) => update(newTreeData)}
        generateNodeProps={({ node, path }: any) => ({
          buttons: [
            <PButton
              key="delete"
              isOnlyIcon={true}
              onClick={() => deleteNode(path)}
              icon={<PiTrashLight size={18} color="red" />}
              variant="text"
            />,
          ],
        })}
      />
    </div>
  );
};

export default PNestedTree;
