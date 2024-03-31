/* eslint-disable react/no-unknown-property */
/* eslint-disable no-console */
import React, { useState } from "react";
import { sendFilesToAPI, sendScanMessage } from "../services/knowledgeService";

function Database(): JSX.Element {
  const [inputValue, setInputValue] = useState("");
  // const [selectedFolder, setSelectedFolder] = useState("");
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function handleScan(): void {
    console.log("value", inputValue);
    sendScanMessage(inputValue);
  }
  function handleFolderChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    if (event.target.files) {
      const filelist = event.target.files;
      if (filelist.length > 0) {
        sendFilesToAPI(filelist);
      }
    }
  }

  // const handleFolderChange = (event) => {
  //   const folder = event.target.files[0];
  //   setSelectedFolder(folder);
  // };
  return (
    <div
      className="planner"
      style={{
        background: "black",
        padding: "1rem",
        height: "90%",
        margin: "1rem",
        borderRadius: "1rem",
      }}
    >
      <h1 className="font-bold text-lg">DataBase</h1>
      <div className="join w-full my-3">
        <input
          className="input input-bordered join-item w-full"
          placeholder="http://example.com/info.pdf"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="btn join-item rounded-r-full w-28"
          onClick={handleScan}
        >
          Scan
        </button>
      </div>
      <div className="">
        <button
          type="button"
          className="btn btn-outline btn-primary"
          onClick={() => document.getElementById("test")!.click()}
        >
          Pick Folder
        </button>
        <input
          type="file"
          directory=""
          webkitdirectory=""
          id="test"
          hidden
          onChange={handleFolderChange}
        />
      </div>
      {/* {selectedFolder && <p>Selected folder: {selectedFolder}</p>} */}
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
