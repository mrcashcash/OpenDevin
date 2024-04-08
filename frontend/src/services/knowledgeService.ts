import { FileData, ServerResponse } from "../types/types";
import socket from "./socket";

const { VITE_URL } = import.meta.env;
const ALLOWED_EXT = ["js", "txt", "csv", "json", "py"];

export function sendScanMessage(message: string, type: string): void {
  // store.dispatch(appendUserMessage(message));
  const event = { action: "scan", args: { task: message, type } };
  const eventString = JSON.stringify(event);
  socket.send(eventString);
}

export async function sendFilesToAPI(
  filelist: FileList,
): Promise<ServerResponse> {
  // Create FormData object to send files
  const formData = new FormData();

  // Filter files based on allowed extensionsv
  const allowedFiles = Array.from(filelist).filter((file) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    return fileExtension && ALLOWED_EXT.includes(fileExtension);
  });

  // Append each allowed file to the FormData object
  allowedFiles.forEach((file) => formData.append("files", file));

  if (allowedFiles.length === 0) {
    console.log("No files with allowed extensions were found.");
    return Promise.resolve({
      success: false,
      message: "No files with allowed extensions were found.",
    });
  }
  try {
    const response = await fetch(`${VITE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to send files to API");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending files to API:", error);
    // Display an error message in the UI
    return Promise.reject(error);
  }
}

// get filedata from api
export async function getFilesData(): Promise<FileData[]> {
  try {
    const response = await fetch(`${VITE_URL}/upload`);
    if (!response.ok) {
      throw new Error("Failed to send files to API");
    }

    const data = (await response.json()) as FileData[];
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
