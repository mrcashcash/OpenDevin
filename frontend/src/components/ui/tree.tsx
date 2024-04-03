import React, { useState } from "react";
import { Checkbox } from "@nextui-org/react";
// import { FolderIcon, FileIcon } from "@heroicons/react/solid"; // Importing SVG icons
// import classNames from "classnames";
import FolderIcon from "../../assets/folder";
import FolderIconOpen from "../../assets/folderopen";
import FileIcon from "../../assets/file";

interface Node {
  name: string;
  path: string;
  children: Node[];
}

interface TreeNodeProps {
  node: Node;
}

function TreeNode({ node }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDir = node.children.length > 0;
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        onClick={toggleExpand}
        className="flex items-center text-gray-300 cursor-pointer my-1"
      >
        {!isDir && <Checkbox />}
        {isDir && isExpanded && <FolderIconOpen className="mr-2" />}
        {isDir && !isExpanded && <FolderIcon className="mr-2" />}
        {node.name}
      </div>
      {isExpanded && (
        <div className="flex flex-col justify-center ml-[20px]">
          {node.children.map((child) => (
            <TreeNode key={child.path} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

interface TreeViewProps {
  paths: string[];
}

const buildTree = (paths: string[]): Node[] => {
  const tree: Node[] = [];
  paths.forEach((path) => {
    const parts = path.split("/");
    let currentNode = tree;
    parts.forEach((part, index) => {
      const existingNode = currentNode.find((node) => node.name === part);
      if (existingNode) {
        currentNode = existingNode.children;
      } else {
        const newNode: Node = {
          name: part,
          path: parts.slice(0, index + 1).join("/"),
          children: [],
        };
        currentNode.push(newNode);
        currentNode = newNode.children;
      }
    });
  });
  return tree;
};

function TreeView({ paths }: TreeViewProps) {
  const treeData = buildTree(paths);

  return (
    <div>
      {treeData.map((rootNode) => (
        <TreeNode key={rootNode.path} node={rootNode} />
      ))}
    </div>
  );
}

// Example usage
const paths = [
  "folder1/file1.txt",
  "folder1/subfolder1/file2.txt",
  "folder2/file3.txt",
  "folder2/subfolder2/file4.txt",
];

function TreeC() {
  return (
    <div className="bg-gray-900 text-white p-4 rounded">
      <h1 className="text-2xl font-bold mb-4">Tree View Component</h1>
      <TreeView paths={paths} />
    </div>
  );
}

export default TreeC;
