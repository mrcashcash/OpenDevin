export interface FileData {
  fileName: string;
  size?: number;
  status?: boolean;
}
export interface ServerResponse {
  success: boolean;
  message?: string;
  files?: FileData[];
}
