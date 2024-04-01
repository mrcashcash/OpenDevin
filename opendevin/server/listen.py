import os
from opendevin.server.datapi.datapi import getfiles, uploadfiles
from opendevin.server.session import Session
from fastapi import FastAPI, File, HTTPException, UploadFile, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import agenthub # noqa F401 (we import this to get the agents registered)
import litellm 
from opendevin.agent import Agent
from opendevin import config
UPLOAD_DIRECTORY = config.get_or_default('UPLOAD_DIR','.\\upload')
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This endpoint receives events from the client (i.e. the browser)
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    session = Session(websocket)
    # TODO: should this use asyncio instead of await?
    await session.start_listening()

@app.get("/litellm-models")
async def get_litellm_models():
    """
    Get all models supported by LiteLLM.
    """
    return litellm.model_list
@app.get("/litellm-agents")
async def get_litellm_agents():
    """
    Get all agents supported by LiteLLM.
    """
    return Agent.listAgents()

@app.post("/upload/")
async def upload_files(files: list[UploadFile] = File(...)):
    return await uploadfiles(files)

@app.get("/upload/")
async def get_uploadfiles():
    return await getfiles()

