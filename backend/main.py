from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form
)
import re
import os

from models import (
    QuestionRequest,
    TrustAnalysis
)

from agent_client import AgentClient

from trust_engine import TrustEngine

from file_processor import FileProcessor
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="TrustLens AI",
    version="1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

agent = AgentClient()

engine = TrustEngine()

processor = FileProcessor()


@app.get("/")
def root():

    return {
        "message": "TrustLens Running"
    }


# --------------------------------------------------
# NORMAL QUESTION ANALYSIS
# --------------------------------------------------

@app.post(
    "/analyze",
    response_model=TrustAnalysis
)
def analyze_question(
    request: QuestionRequest
):

    response = agent.ask(
        request.question
    )

    answer = ""

    for item in response.output:

        if hasattr(
            item,
            "content"
        ):

            for content in item.content:

                if hasattr(
                    content,
                    "text"
                ):

                    answer = content.text

    scores = engine.analyze(

        response,

        str(answer),

        request.question

    )

    return TrustAnalysis(

        question=
            request.question,

        answer=
            str(answer),

        trustScore=
            scores["trustScore"],

        verdict=
            scores["verdict"],

        verificationType=
            scores["verificationType"],

        evidence=
            scores["evidence"],

        freshness=
            scores["freshness"],

        consensus=
            scores["consensus"],

        hallucination=
            scores["hallucination"],

        sourcesChecked=
            scores["sourcesChecked"],

        supportCount=
            scores["supportCount"],

        neutralCount=
            scores["neutralCount"],

        contradictCount=
            scores["contradictCount"],

        supportingLinks=
            scores["supportingLinks"],

        neutralLinks=
            scores["neutralLinks"],

        contradictingLinks=
            scores["contradictingLinks"]
    )


# --------------------------------------------------
# FILE ANALYSIS
# --------------------------------------------------

@app.post("/analyze-file")
async def analyze_file(

    file: UploadFile = File(...),

    question: str = Form(...)

):

    try:

        os.makedirs(
            "uploads",
            exist_ok=True
        )

        filepath = os.path.join(
            "uploads",
            file.filename
        )

        with open(
            filepath,
            "wb"
        ) as buffer:

            buffer.write(
                await file.read()
            )

        document_text = (
            processor.extract_text(
                filepath
            )
        )

        if not document_text:

            return {
                "error":
                "Could not extract text from file."
            }

        prompt = f"""

You are analyzing a user uploaded document.

User Question:

{question}

Document Content:

{document_text[:50000]}

Instructions:

1. Answer the user's question.
2. Explain what you understood from the document.
3. Mention important findings.
4. Mention possible concerns.
5. Provide a concise summary.
"""

        response = agent.ask(
            prompt
        )

        answer = ""

        for item in response.output:

            if hasattr(
                item,
                "content"
            ):

                for content in item.content:

                    if hasattr(
                        content,
                        "text"
                    ):

                        answer = content.text

        scores = engine.analyze(

            response,

            str(answer),

            question

        )

        return {

            "question":
                question,

            "fileName":
                file.filename,

            "answer":
                answer,

            "trustScore":
                scores["trustScore"],

            "verdict":
                scores["verdict"],

            "verificationType":
                scores["verificationType"],

            "evidence":
                scores["evidence"],

            "freshness":
                scores["freshness"],

            "consensus":
                scores["consensus"],

            "hallucination":
                scores["hallucination"],

            "sourcesChecked":
                scores["sourcesChecked"],

            "supportCount":
                scores["supportCount"],

            "neutralCount":
                scores["neutralCount"],

            "contradictCount":
                scores["contradictCount"],

            "supportingLinks":
                scores["supportingLinks"],

            "neutralLinks":
                scores["neutralLinks"],

            "contradictingLinks":
                scores["contradictingLinks"]
        }

    except Exception as e:

        return {
            "error": str(e)
        }
