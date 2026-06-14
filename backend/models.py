from pydantic import BaseModel
from typing import List


class QuestionRequest(BaseModel):
    question: str


class SourceLink(BaseModel):
    title: str
    url: str
    summary: str
    similarity: float


class TrustAnalysis(BaseModel):

    question: str
    answer: str

    trustScore: int
    verdict: str

    verificationType: str

    evidence: int
    freshness: int
    consensus: int
    hallucination: int

    sourcesChecked: int

    supportCount: int
    neutralCount: int
    contradictCount: int

    supportingLinks: List[SourceLink]
    neutralLinks: List[SourceLink]
    contradictingLinks: List[SourceLink]

class FileQuestionRequest(
    BaseModel
):

    question: str