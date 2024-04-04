import React, { useEffect, useState } from "react";
import { Checkbox } from "@nextui-org/react";
import FolderIcon from "../../assets/folder";
import FolderIconOpen from "../../assets/folderopen";
import { FileData } from "../../types/types";
import { getFilesData } from "../../services/knowledgeService";

interface Node {
  name: string;
  path: string;
  children: Node[];
  files: string[];
}

interface TreeNodeProps {
  node: Node;
}

// interface TreeViewProps {
//   paths: string[];
// }

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

// const buildTree = (paths: string[]): Node[] => {
//   const tree: Node[] = [];
//   paths.forEach((path) => {
//     const parts = path.split("/");
//     let currentNode = tree;
//     parts.forEach((part, index) => {
//       const existingNode = currentNode.find((node) => node.name === part);
//       if (existingNode) {
//         currentNode = existingNode.children;
//       } else {
//         const newNode: Node = {
//           name: part,
//           path: parts.slice(0, index + 1).join("/"),
//           children: [],
//         };
//         currentNode.push(newNode);
//         currentNode = newNode.children;
//       }
//     });
//   });
//   return tree;
// };

// function TreeView({ paths }: TreeViewProps) {
//   const treeData = buildTree(paths);

//   return (
//     <div>
//       {treeData.map((rootNode) => (
//         <TreeNode key={rootNode.path} node={rootNode} />
//       ))}
//     </div>
//   );
// }

function TreeC(): JSX.Element {
  const [tree, setTree] = useState<Node[]>([]);

  const buildTree = (data: FileData[]): Node[] => {
    // Implement logic to build tree structure from fetched data
    // You may need to parse the fetched data and organize it into a tree structure
    // This could be similar to your previous implementation in buildTree function

    // Example implementation:

    data.forEach((filedata) => {
      // Logic to parse path and build tree nodes
    });

    return tree;
  };
  useEffect(() => {
    // Fetch folders and files data from the server
    const fetchData = async () => {
      try {
        const data = await getFilesData(); // Implement your API call to fetch data
        setTree(buildTree(data)); // Build the tree structure based on fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderTreeNodes = (nodes: Node[]) =>
    nodes.map((node) => <TreeNode key={node.path} node={node} />);

  return <div>{renderTreeNodes(tree)}</div>;
}
export default TreeC;
