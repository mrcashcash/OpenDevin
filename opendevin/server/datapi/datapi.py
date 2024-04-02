import json
import os
from typing import List

from fastapi import File, HTTPException, Response, UploadFile 
from opendevin import config
from opendevin.server.datapi.utils import count_file_tokens

UPLOAD_DIRECTORY = config.get_or_default('UPLOAD_DIR','.\\upload')


async def uploadfiles(files: List[UploadFile]):
    uploaded_files = []
    for file in files:
        try:
            contents = await file.read()
            file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
            os.makedirs(os.path.dirname(file_path), exist_ok=True) 
            print(f"File saved: {file_path}, size: {len(contents)} bytes")

            with open(file_path, "wb") as f:
                f.write(contents)

            uploaded_files.append(file.filename)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to save file: {file.filename}. Error: {str(e)}"
            )

    if uploaded_files:
        response_data = {"success": True, "files": uploaded_files}
        return Response(content=json.dumps(response_data), status_code=200)
    else:
        return Response(content='{"success": false, "message": "No files were uploaded."}', status_code=200)


async def getfiles(directory=UPLOAD_DIRECTORY):
    res = []
    for root, dirs, files in os.walk(directory):
        for filename in files:
            filedata = {}
            file_path = os.path.join(root, filename)
            filedata['fileName'] = file_path
            filedata['size'] =  count_file_tokens(file_path)           #    os.path.getsize(file_path)
            filedata['status'] = "unprocessed"
            res.append(filedata)
    return res