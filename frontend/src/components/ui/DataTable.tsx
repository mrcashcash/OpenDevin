/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { FileData } from "../../types/types";
import { getFilesData } from "../../services/knowledgeService";

export function DataTable(): JSX.Element {
  const [filesList, setFilesList] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await getFilesData();
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
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>SIZE</TableColumn>
        <TableColumn>STATUS</TableColumn>
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
      </TableBody>
    </Table>
  );
}
