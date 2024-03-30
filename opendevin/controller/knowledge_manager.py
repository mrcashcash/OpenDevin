from agenthub.langchains_agent.utils.memory import LongTermMemory


class KnowledgeManager:
    def __init__(self, url):
        self.url = url
        self.knowledge = LongTermMemory(name="knowledge")
        
    async def strat_process(self, url:str):
        pass
