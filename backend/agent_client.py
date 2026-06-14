from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient


PROJECT_ENDPOINT = "https://trustlens-ai-resource.services.ai.azure.com/api/projects/trustlens-ai"
AGENT_NAME = "trustlens-verifier"


class AgentClient:

    def __init__(self):

        credential = DefaultAzureCredential()

        self.project_client = AIProjectClient(
            endpoint=PROJECT_ENDPOINT,
            credential=credential,
            allow_preview=True
        )

        self.openai_client = self.project_client.get_openai_client(
            agent_name=AGENT_NAME
        )

    def ask(self, question):

        response = self.openai_client.responses.create(
            input=question
        )

        return response