# from agenthub.langchains_agent.utils.memory import LongTermMemory
from llama_index.readers.github import GithubRepositoryReader ,GithubClient
from agenthub.monologue_agent.utils.memory import LongTermMemory
from opendevin import config
import re

github_token = config.get_or_default('GITHUB_TOKEN','test_token')
class KnowledgeManager:
    def __init__(self, url):
        self.url = url
        self.knowledge = LongTermMemory(name="knowledge")
        print("KnowledgeManager-Initialized")


    async def strat_process(self, url:str):
        owner, repo = extract_username_and_repo(url)
        github_client= GithubClient(github_token)
        print("owner: %s, repo: %s" % (owner, repo))
        print("github_token: %s" % github_token)
        reader = GithubRepositoryReader(
            github_client,
            owner=owner,
            repo=repo,
            use_parser=False,
            verbose=True,)
        print("strat_process")
        branch_documents = reader.load_data(branch="main")
        for doc in branch_documents:
            print(doc.text)



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