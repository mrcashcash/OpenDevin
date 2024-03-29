import socket from "../socket/socket";

export function sendScanMessage(message: string): void {
  // store.dispatch(appendUserMessage(message));
  const event = { action: "scan", args: { task: message } };
  const eventString = JSON.stringify(event);
  socket.send(eventString);
}
