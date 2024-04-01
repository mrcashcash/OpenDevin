/* eslint-disable no-console */
import React, { useCallback, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { toast } from "react-toastify";
import { sendFilesToAPI, sendScanMessage } from "../services/knowledgeService";
import { DataTable } from "./ui/DataTable";

function Database(): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [filesList, setFilesList] = useState<FileData[]>([]);
  // const { data, error, status } = useSelector(
  //   (state: RootState) => state.database,
  // );
  // const [selectedFolder, setSelectedFolder] = useState("");
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setInputValue(event.target.value);
    },
    [],
  );

  const handleScan = useCallback((): void => {
    console.log("value", inputValue);
    sendScanMessage(inputValue);
  }, [inputValue]);
  // console.log("status:", status);
  const handleFolderChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsLoading(true);
    if (event.target.files) {
      const filelist = event.target.files;
      if (filelist.length > 0) {
        try {
          const res = await sendFilesToAPI(filelist);
          setIsLoading(false);
          if (res.success) {
            console.log("Files sent successfully to the API:", res.files);
            if (res.files && res.files?.length > 0) {
              toast.info(JSON.stringify(res.files));
              // setFilesList(res.files);
            }
            // Display uploaded file names in the UI
          } else {
            console.log("No files were uploaded:", res.message);
            // Display an error message in the UI
            toast.error(res.message);
          }
        } catch (e: unknown) {
          toast.error(e);
        }
      }
    }
  };

  return (
    <div className="plah-full w-full bg-bg-workspacenner">
      <h1 className="font-bold text-lg">DataBase</h1>
      <DataTable />
      <div className="flex w-full my-3">
        <Input
          className=""
          radius="none"
          placeholder="http://example.com/info.pdf"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          type="button"
          className="rounded-r-full w-28"
          onClick={handleScan}
          color="primary"
          variant="bordered"
        >
          Scan
        </Button>
      </div>
      <div className="">
        <Button
          type="button"
          color="primary"
          variant="ghost"
          isLoading={isLoading}
          onClick={() => document.getElementById("test")!.click()}
        >
          Pick Folder
        </Button>
        <input
          type="file"
          // eslint-disable-next-line react/no-unknown-property
          directory=""
          webkitdirectory=""
          id="test"
          hidden
          onChange={handleFolderChange}
        />
      </div>
    </div>
  );
}

export default Database;
declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string; // remember to make these attributes optional....
    webkitdirectory?: string;
  }
}
