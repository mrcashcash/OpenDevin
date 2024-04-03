/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

function FolderIconOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M1 3.5A1.5 1.5 0 012.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0115 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0112.733 15H3.266a2.5 2.5 0 01-2.481-2.19l-.64-5.124A1.5 1.5 0 011 6.14V3.5zM2 6h12v-.5a.5.5 0 00-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 00-.5.5V6zm-.367 1a.5.5 0 00-.496.562l.64 5.124A1.5 1.5 0 003.266 14h9.468a1.5 1.5 0 001.489-1.314l.64-5.124A.5.5 0 0014.367 7H1.633z" />
    </svg>
  );
}

export default FolderIconOpen;
