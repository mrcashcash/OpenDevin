/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Chip,
  ChipProps,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { FileData } from "../../types/types";
import { getFilesData } from "../../services/knowledgeService";
import DeleteIcon from "../../assets/deleteicon";
import IconDatabaseArrowLeft from "../../assets/database-arrow-left";
import EyeIcon from "../../assets/eyeicon";

const columns = [
  { name: "NAME", uid: "fileName" },
  { name: "SIZE", uid: "size" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
const statusColorMap: Record<string, ChipProps["color"]> = {
  processed: "success",
  unprocessed: "danger",
  inprocess: "warning",
};

// type User = typeof users[0];

export function DataTable(): JSX.Element {
  const [filesList, setFilesList] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["2"]));

  const renderCell = useCallback((filedata: FileData, columnKey: React.Key) => {
    const cellValue = filedata[columnKey as keyof FileData];

    switch (columnKey) {
      case "fileName":
        return <p className="text-bold text-sm capitalize">{cellValue}</p>;
      case "size":
        return <p className="text-bold text-sm capitalize">{cellValue}</p>;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[filedata.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Ingest File">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <IconDatabaseArrowLeft />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete File">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await getFilesData();
        console.log("res", res);
        setFilesList(res);
      } catch (err) {
        setFilesList([]);
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Table
      aria-label="Example static collection table"
      selectionMode="multiple"
      // selectedKeys={selectedKeys}
      // disabledKeys={["3", "4"]}
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={filesList}>
        {(item) => (
          <TableRow key={item.fileName}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
// eslint-disable-next-line no-lone-blocks
{
  /* 
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>SIZE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>


<TableBody>
{Array.isArray(filesList) && filesList.length > 0 ? (
  filesList.map((filedata, index) => (
    <TableRow key={index}>
      <TableCell>{filedata.fileName}</TableCell>
      <TableCell>{filedata.size || index}</TableCell>
      <TableCell>{filedata.status || "Active"}</TableCell>
    </TableRow>
  ))
) : !isLoading ? (
  <TableRow>
    <TableCell>No data available</TableCell>
    <TableCell>No data available</TableCell>
    <TableCell>No data available</TableCell>
  </TableRow>
) : (
  <TableRow>
    <TableCell>
      {" "}
      <Skeleton className="w-2/5 rounded-lg">
        <div className="h-4 w-2/5 rounded-lg bg-default-300" />
      </Skeleton>
    </TableCell>
    <TableCell>
      <Skeleton className="w-2/5 rounded-lg">
        <div className="h-4 w-2/5 rounded-lg bg-default-300" />
      </Skeleton>
    </TableCell>
    <TableCell>
      <Skeleton className="w-2/5 rounded-lg">
        <div className="h-4 w-2/5 rounded-lg bg-default-300" />
      </Skeleton>
    </TableCell>
  </TableRow>
)}
</TableBody> */
}
