import React, { useState, useEffect } from "react";
import { FileData } from "../../types/types";
import { getFilesData } from "../../services/knowledgeService";
// Assuming you have your FileData interface defined

interface TreeNode {
  name: string;
  children?: TreeNode[];
  files?: FileData[];
}

const parseFolderPath = (filePath: string): string[] => filePath.split("\\");

const generateTree = (fileData: FileData[]): TreeNode[] => {
  const tree: TreeNode[] = [];

  fileData.forEach((file) => {
    const folders = parseFolderPath(file.fileName);
    let currentNode = tree;

    if (folders[1] === "upload") {
      folders.slice(2).forEach((folder, index) => {
        const existingNode = currentNode.find((node) => node.name === folder);

        if (existingNode) {
          currentNode = existingNode.children || [];
        } else {
          const newNode: TreeNode = { name: folder };
          currentNode.push(newNode);
          currentNode = newNode.children = [];
        }

        if (index === folders.length - 2) {
          if (!currentNode) currentNode = [];
          currentNode.push({ name: file.fileName }); // No need to include files here
        }
      });
    }
  });

  return tree;
};

export function TreeC(): JSX.Element {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [filesList, setFilesList] = useState<FileData[]>([]);
  const handleFolderClick = (folderName: string) => {
    setExpandedFolders((prevExpandedFolders) =>
      prevExpandedFolders.includes(folderName)
        ? prevExpandedFolders.filter((folder) => folder !== folderName)
        : [...prevExpandedFolders, folderName],
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFilesData();
        console.log("res", res);
        console.log("res.length", res.length);
        setFilesList(res);
      } catch (err) {
        setFilesList([]);
      } finally {
      }
    };

    fetchData();
  }, []);
  const renderTree = (nodes: TreeNode[]) =>
    nodes.map((node) => (
      <div key={node.name}>
        <div onClick={() => handleFolderClick(node.name)}>{node.name}</div>
        {expandedFolders.includes(node.name) &&
          node.children &&
          renderTree(node.children)}
      </div>
    ));

  const treeData = generateTree(filesList);

  return <div>{renderTree(treeData)}</div>;
}
export default TreeC;
