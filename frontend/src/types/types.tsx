export interface FileData {
  fileName: string;
  size?: number;
  status: string;
}
export interface ServerResponse {
  success: boolean;
  message?: string;
  files?: FileData[];
}
