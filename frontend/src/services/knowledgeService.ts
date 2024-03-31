import socket from "../socket/socket";

const { VITE_URL } = import.meta.env;

export function sendScanMessage(message: string): void {
  // store.dispatch(appendUserMessage(message));
  const event = { action: "scan", args: { task: message } };
  const eventString = JSON.stringify(event);
  socket.send(eventString);
}

// export function sendFilesOverWebSocket(filelist: FileList): void {
//   if (!socket) {
//     // WebSocket connection not established
//     return;
//   }

//   // Convert FileList to an array of Files
//   // Loop through each file in the FileList
//   for (let i = 0; i < filelist.length; i += 1) {
//     const file = filelist[i];

//     // Convert the file to a format suitable for sending over WebSocket
//     const fileData = {
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       data: file,
//     };

//     // Create an event object for each file
//     const event = { action: "scan", args: { task: fileData } };
//     const eventString = JSON.stringify(event);

//     // Send the file data over WebSocket
//     socket.send(eventString);
//   }
// }
// export const sendFilesOverWebSocket = (files: FileList) => {
//   if (!socket) {
//     // WebSocket connection not established
//     return;
//   }

//   // Convert FileList to an array of Files
//   const fileArray = Array.from(files);

//   // Send each file sequentially
//   fileArray.forEach((file) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (reader.result instanceof ArrayBuffer) {
//         // const buffer = Buffer.from(reader.result); // Convert ArrayBuffer to Buffer
//         console.log("buffer", reader.result);
//         // socket.send(buffer);
//       } else {
//         throw new Error("Invalid Buffer");
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   });
// };
// export const sendFilesOverWebSocket = (fileList: FileList) => {
//   const reader = new FileReader();
//   const fileBuffers: Uint8Array[] = [];
//   const errors: Error[] = [];

//   Array.from(fileList).forEach((file, index) => {
//     reader.readAsArrayBuffer(file);
//     reader.onload = () => {
//       fileBuffers.push(new Uint8Array(reader.result as ArrayBuffer));
//       if (fileBuffers.length === fileList.length - errors.length) {
//         if (errors.length === 0) {
//           const combinedBuffer = new Uint8Array(
//             fileBuffers.reduce((total, buffer) => total + buffer.byteLength, 0),
//           );
//           let position = 0;
//           fileBuffers.forEach((buffer) => {
//             combinedBuffer.set(buffer, position);
//             position += buffer.byteLength;
//           });
//           socket.send(combinedBuffer.buffer);
//         } else {
//           console.error("Errors occurred while reading files:", errors);
//         }
//       }
//     };
//     reader.onerror = (event: ProgressEvent<FileReader>) => {
//       const error = event.target?.error || new Error("Unknown error");
//       errors.push(error);
//       console.error(`Error reading file at index ${index}:`, error);
//     };
//   });
// };
export async function sendFilesToAPI(filelist: FileList): Promise<void> {
  // Create FormData object to send files
  const formData = new FormData();

  // Append each file to the FormData object
  for (let i = 0; i < filelist.length; i += 1) {
    const file = filelist[i];
    formData.append("files", file);
  }

  try {
    // Make a POST request to the API
    const response = await fetch(`${VITE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to send files to API");
    }

    console.log("Files sent successfully to the API");
  } catch (error) {
    console.error("Error sending files to API:", error);
    throw error;
  }
}
