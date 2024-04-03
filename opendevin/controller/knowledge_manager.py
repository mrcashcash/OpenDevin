# from agenthub.langchains_agent.utils.memory import LongTermMemory
import os
from llama_index.core import SimpleDirectoryReader
from llama_index.readers.github import GithubRepositoryReader ,GithubClient
from langchain_community.document_loaders.python import PythonLoader
from langchain_community.document_loaders.directory import TextLoader
from langchain_community.document_loaders.directory import DirectoryLoader
from agenthub.monologue_agent.utils.memory import LongTermMemory
from opendevin import config
import re

github_token = config.get_or_default('GITHUB_TOKEN','test_token')
class KnowledgeManager:
    def __init__(self, url):
        self.url = url
        self.knowledge = LongTermMemory(name="knowledge")
        print("KnowledgeManager-Initialized")


    async def strat_process(self, url:str, type:str):
        print("KnowledgeManager-Initialized-strat_process")
        print(url, type)
        if type == 'file':
            self.processFile(url)
        else:
            docs = await self.processLink(url)
            print("KnowledgeManager-Initialized-Docs",docs)

    def processFile(self, filepath:str):
        print("KnowledgeManager-Initialized-processFile")
        directory = os.path.dirname(filepath)
        _, file_extension = os.path.splitext(filepath)
        print("Processing file", _ + "ext: " + file_extension)
        print("Dir name: " + directory)
        # if file_extension == ".py":
        # loader = DirectoryLoader(directory, glob="**/*.*", show_progress=True,loader_cls=TextLoader)
        # docs = loader.load()
        documents = SimpleDirectoryReader(directory).load_data()
        print("documents", documents)


    async def processLink(self, url:str):
        
        owner, repo = extract_username_and_repo(url)
        github_client= GithubClient(github_token,verbose=True)
        print("owner: %s, repo: %s" % (owner, repo))
        print("github_token: %s" % github_token)
        reader = GithubRepositoryReader(
            github_client,
            owner=owner,
            repo=repo,
            use_parser=True,
            verbose=True,)
        print("strat_process")
        branch_documents = reader.load_data(branch="main")
        return branch_documents
    



def extract_username_and_repo(url):
    # Define a regex pattern to match the GitHub URL format
    pattern = r'https://github.com/([^/]+)/([^/]+)'
    
    # Use re.match to find the pattern in the URL
    match = re.match(pattern, url)
    
    if match:
        # Extract the username and repository name from the matched groups
        owner = match.group(1)
        repo = match.group(2)
        return owner, repo
    else:
        return None, None