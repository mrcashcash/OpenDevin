/* eslint-disable no-console */
import React, { useState } from "react";
import { sendScanMessage } from "../services/knowledgeService";

function Database(): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function handleScan(): void {
    console.log("value", inputValue);
    sendScanMessage(inputValue);
  }

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
    </div>
  );
}

export default Database;
