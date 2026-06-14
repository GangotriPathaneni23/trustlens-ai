from dataclasses import dataclass
from enum import Enum
import re
from typing import Dict


class Intent(Enum):

    FACTUAL = "factual"

    CURRENT_FACTUAL = "current_factual"

    REASONING = "reasoning"

    OPINION = "opinion"

    CREATIVE = "creative"

    CODING = "coding"

    MATHEMATICAL = "mathematical"

    TASK = "task"

    UNKNOWN = "unknown"


@dataclass
class ClassificationResult:

    intent: Intent

    confidence: float

    requires_web: bool

    requires_tools: bool

    route: str

    signals: Dict


class AdvancedQueryClassifier:

    def __init__(self):

        self.current_patterns = [

            r"\btoday\b",

            r"\blatest\b",

            r"\bcurrent\b",

            r"\bnow\b",

            r"\brecent\b",

            r"\bthis year\b",

            r"\b202[0-9]\b"
        ]

        self.factual_patterns = [

            r"\bwho is\b",

            r"\bwhat is\b",

            r"\bwhen did\b",

            r"\bwhere is\b",

            r"\bhow many\b"
        ]

        self.opinion_patterns = [

            r"\bbest\b",

            r"\bbetter\b",

            r"\bworth it\b",

            r"\brecommend\b",

            r"\bshould i\b"
        ]

        self.creative_patterns = [

            r"\bwrite a story\b",

            r"\bpoem\b",

            r"\bgenerate\b",

            r"\bcreate a character\b"
        ]

        self.code_patterns = [

            r"\bpython\b",

            r"\bjava\b",

            r"\bc\+\+\b",

            r"\bjavascript\b",

            r"\bsql\b",

            r"\bpyspark\b",

            r"\bdatabricks\b",

            r"\bcode\b",

            r"\bquery\b",

            r"\bimplement\b"
        ]

        self.math_patterns = [

            r"\bsolve\b",

            r"\bequation\b",

            r"\bprobability\b",

            r"\bderivative\b",

            r"\bintegrate\b",

            r"\d+\s*[\+\-\*\/]\s*\d+",

            r"sqrt\s*\(",

            r"\^",

            r"\bplus\b",

            r"\bminus\b",

            r"\bmultiplied by\b",

            r"\bdivide\b",

            r"\bdivided by\b",

            r"\bsquare root\b",

            r"\bcalculate\b"
        ]

    def score_patterns(
        self,
        text,
        patterns
    ):

        score = 0

        for pattern in patterns:

            if re.search(
                pattern,
                text
            ):

                score += 1

        return score

    def classify(
        self,
        query
    ):

        text = query.lower()

        # ----------------------------------
        # HARD MATH DETECTION
        # ----------------------------------

        if re.search(
            r"\d+\s*[\+\-\*\/]\s*\d+",
            text
        ):

            return ClassificationResult(

                intent=Intent.MATHEMATICAL,

                confidence=1.0,

                requires_web=False,

                requires_tools=True,

                route="MATH_AGENT",

                signals={}
            )

        math_words = [

            "plus",

            "minus",

            "multiply",

            "multiplied",

            "divide",

            "divided",

            "square root",

            "calculate"
        ]

        if any(
            word in text
            for word in math_words
        ):

            return ClassificationResult(

                intent=Intent.MATHEMATICAL,

                confidence=1.0,

                requires_web=False,

                requires_tools=True,

                route="MATH_AGENT",

                signals={}
            )

        factual_score = self.score_patterns(
            text,
            self.factual_patterns
        )

        current_score = self.score_patterns(
            text,
            self.current_patterns
        )

        opinion_score = self.score_patterns(
            text,
            self.opinion_patterns
        )

        creative_score = self.score_patterns(
            text,
            self.creative_patterns
        )

        code_score = self.score_patterns(
            text,
            self.code_patterns
        )

        math_score = self.score_patterns(
            text,
            self.math_patterns
        )

        scores = {

            Intent.FACTUAL:
                factual_score,

            Intent.CURRENT_FACTUAL:
                factual_score + current_score,

            Intent.OPINION:
                opinion_score,

            Intent.CREATIVE:
                creative_score,

            Intent.CODING:
                code_score,

            Intent.MATHEMATICAL:
                math_score
        }

        intent = max(
            scores,
            key=scores.get
        )

        confidence = scores[intent]

        if confidence == 0:

            intent = Intent.REASONING

            confidence = 0.5

        requires_web = (

            intent ==
            Intent.CURRENT_FACTUAL

            or

            current_score > 0
        )

        requires_tools = (

            intent ==
            Intent.CODING

            or

            intent ==
            Intent.MATHEMATICAL
        )

        route = "GENERAL"

        return ClassificationResult(

            intent=intent,

            confidence=min(
                confidence / 3,
                1.0
            ),

            requires_web=requires_web,

            requires_tools=requires_tools,

            route=route,

            signals=scores
        )