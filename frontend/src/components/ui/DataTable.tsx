/* eslint-disable no-case-declarations */
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
import { getFilesData, sendScanMessage } from "../../services/knowledgeService";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(
    new Set([".\\upload\\server\\listen.py"]),
  ); //  Key of columkKey ? fileNmae ?
  const [disabledKeys, setDisabledKeys] = useState(
    new Set([".\\upload\\server\\datapi\\datapi.py"]),
  );

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
        const handleIngestFile = () => {
          sendScanMessage(filedata.fileName, "file");
          console.log("Clicked:", filedata.fileName);
        };

        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Ingest File">
              <span
                onClick={handleIngestFile}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
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
        console.log("res.length", res.length);
        setFilesList(res);
        if (res.length > 0) {
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      } catch (err) {
        setFilesList([]);
        toast.error(err);
      } finally {
        setIsLoading(false);
        setDisabledKeys(new Set(["1"]));
      }
    };

    fetchData();
  }, []);

  return (
    <Table
      aria-label="Example static collection table"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      disabledKeys={disabledKeys}
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
      {isEmpty ? (
        <TableBody emptyContent="Database is Empty.">{[]}</TableBody>
      ) : !isLoading ? (
        <TableBody items={filesList}>
          {(item) => (
            <TableRow key={item.fileName}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody>
          {Array.from({ length: 4 }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <TableCell key={`${rowIndex}-${colIndex}`}>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-4 w-2/5 rounded-lg bg-default-300" />
                  </Skeleton>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}
