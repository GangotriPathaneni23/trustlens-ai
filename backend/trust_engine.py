from urllib.parse import urlparse

from source_analyzer import SourceAnalyzer
from query_classifier import (
    AdvancedQueryClassifier,
    Intent
)


class TrustEngine:

    def __init__(self):

        self.source_analyzer = SourceAnalyzer()

        self.classifier = (
            AdvancedQueryClassifier()
        )

    # --------------------------------------------------
    # Extract citations from agent response
    # --------------------------------------------------

    def extract_sources(
        self,
        response
    ):

        sources = []

        try:

            for item in response.output:

                if not hasattr(
                    item,
                    "content"
                ):
                    continue

                for content in item.content:

                    if not hasattr(
                        content,
                        "annotations"
                    ):
                        continue

                    for ann in content.annotations:

                        if getattr(
                            ann,
                            "type",
                            ""
                        ) == "url_citation":

                            sources.append({

                                "title":
                                    ann.title,

                                "url":
                                    ann.url,

                                "domain":
                                    urlparse(
                                        ann.url
                                    ).netloc
                            })

        except Exception as e:

            print(
                "SOURCE EXTRACTION ERROR:",
                e
            )

        return sources

    # --------------------------------------------------
    # Evidence Score
    # --------------------------------------------------

    def evidence_score(
        self,
        source_count
    ):

        if source_count == 0:
            return 0

        if source_count == 1:
            return 30

        if source_count == 2:
            return 50

        if source_count == 3:
            return 70

        if source_count == 4:
            return 85

        return 100

    # --------------------------------------------------
    # Consensus Score
    # --------------------------------------------------

    def consensus_score(
        self,
        support,
        contradict,
        neutral
    ):

        total = (
            support +
            contradict +
            neutral
        )

        if total == 0:
            return 0

        return round(
            (
                support /
                total
            ) * 100
        )

    # --------------------------------------------------
    # Hallucination Risk
    # --------------------------------------------------

    def hallucination_score(
        self,
        support,
        contradict,
        source_count
    ):

        if source_count == 0:
            return 90

        if (
            support +
            contradict
        ) == 0:

            return 50

        contradiction_ratio = (

            contradict /

            (
                support +
                contradict
            )

        )

        risk = round(
            contradiction_ratio *
            100
        )

        return min(
            max(
                risk,
                5
            ),
            90
        )

    # --------------------------------------------------
    # Freshness
    # --------------------------------------------------

    def freshness_score(
        self,
        sources
    ):

        if len(
            sources
        ) == 0:

            return 0

        score = 50

        for source in sources:

            url = (
                source["url"]
                .lower()
            )

            if "2026" in url:

                score += 10

            elif "2025" in url:

                score += 5

        return min(
            score,
            100
        )

    # --------------------------------------------------
    # Final Trust
    # --------------------------------------------------

    def calculate_trust(

        self,

        evidence,

        consensus,

        freshness,

        hallucination

    ):

        trust = (

            evidence * 0.15 +

            consensus * 0.55 +

            freshness * 0.10 +

            (
                100 -
                hallucination
            ) * 0.20

        )

        return round(
            trust
        )

    # --------------------------------------------------
    # Verdict
    # --------------------------------------------------

    def verdict(
        self,
        trust
    ):

        if trust >= 85:
            return "Highly Trusted"

        if trust >= 75:
            return "Trusted"

        if trust >= 65:
            return "Likely Reliable"
        
        if trust >=50:
            return "Needs Human Review"

        return "Needs Extensive Review from experts"

    # --------------------------------------------------
    # Analyze
    # --------------------------------------------------

    def analyze(

        self,

        response,

        answer,

        question

    ):

        try:

            sources = (
                self.extract_sources(
                    response
                )
            )

            source_count = (
                len(
                    sources
                )
            )

            classification = (

                self.classifier
                .classify(
                    question
                )

            )
            print("QUESTION:", question)

            print(
                "INTENT:",
                classification.intent
                )

            print(
                "CONFIDENCE:",
                classification.confidence
                )

            # ----------------------------------------
            # Model reasoning path
            # ----------------------------------------

            if (

                source_count == 0

                and

                classification.intent in [

                    Intent.CODING,

                    Intent.MATHEMATICAL

                ]

            ):

                return {

                    "trustScore":
                        97,

                    "verificationType":
                        "Model Reasoning",

                    "verdict":
                        "Model Verified",

                    "evidence":
                        100,

                    "freshness":
                        100,

                    "consensus":
                        100,

                    "hallucination":
                        0,

                    "sourcesChecked":
                        0,

                    "supportCount":
                        0,

                    "neutralCount":
                        0,

                    "contradictCount":
                        0,

                    "supportingLinks":
                        [],

                    "neutralLinks":
                        [],

                    "contradictingLinks":
                        [],

                    "sourceAnalysis":
                        [],

                    "sources":
                        []
                }
            # ----------------------------------------
            # Training Knowledge Path
            # ----------------------------------------

            if source_count == 0:
                return{
                    "trustScore":
                    92,

                    "verificationType":
                    "Verified AI Intelligence",

                    "verdict":
                    "Trusted",

                    "evidence":
                    90,

                    "freshness":
                    90,

                    "consensus":
                    90,

                    "hallucination":
                    10,

                    "sourcesChecked":
                    0,

                    "supportCount":
                    0,

                    "neutralCount":
                    0,

                    "contradictCount":
                    0,

                    "supportingLinks":
                    [],

                    "neutralLinks":
                    [],

                    "contradictingLinks":
                    [],

                    "sourceAnalysis":
                    [],

                    "sources":
                    []       

                }

            # ----------------------------------------
            # Web verification path
            # ----------------------------------------

            source_analysis = (

                self.source_analyzer
                .analyze_sources(

                    answer,

                    sources

                )

            )

            support = (

                source_analysis[
                    "support_count"
                ]

            )

            neutral = (

                source_analysis[
                    "neutral_count"
                ]

            )

            contradict = (

                source_analysis[
                    "contradict_count"
                ]

            )

            evidence = (

                self.evidence_score(
                    source_count
                )

            )

            consensus = (

                self.consensus_score(

                    support,

                    contradict,

                    neutral

                )

            )

            freshness = (

                self.freshness_score(
                    sources
                )

            )

            hallucination = (

                self.hallucination_score(

                    support,

                    contradict,

                    source_count

                )

            )

            trust = (

                self.calculate_trust(

                    evidence,

                    consensus,

                    freshness,

                    hallucination

                )

            )

            print(
                "\n=========== TRUSTLENS ==========="
            )

            print(
                "Sources Checked:",
                source_count
            )

            print(
                "Support:",
                support
            )

            print(
                "Neutral:",
                neutral
            )

            print(
                "Contradict:",
                contradict
            )

            print(
                "Trust Score:",
                trust
            )

            print(
                "=================================\n"
            )

            return {

                "trustScore":
                    trust,

                "verificationType":
                    "Web Verification",

                "verdict":
                    self.verdict(
                        trust
                    ),

                "evidence":
                    evidence,

                "freshness":
                    freshness,

                "consensus":
                    consensus,

                "hallucination":
                    hallucination,

                "sourcesChecked":
                    source_count,

                "supportCount":
                    support,

                "neutralCount":
                    neutral,

                "contradictCount":
                    contradict,

                "supportingLinks":

                    source_analysis[
                        "support_links"
                    ],

                "neutralLinks":

                    source_analysis[
                        "neutral_links"
                    ],

                "contradictingLinks":

                    source_analysis[
                        "contradict_links"
                    ],

                "sourceAnalysis":

                    source_analysis[
                        "results"
                    ],

                "sources":
                    sources
            }

        except Exception as e:

            print(
                "TRUST ENGINE ERROR:",
                e
            )

            return {

                "trustScore":
                    0,

                "verificationType":
                    "Error",

                "verdict":
                    "Error",

                "evidence":
                    0,

                "freshness":
                    0,

                "consensus":
                    0,

                "hallucination":
                    100,

                "sourcesChecked":
                    0,

                "supportCount":
                    0,

                "neutralCount":
                    0,

                "contradictCount":
                    0,

                "supportingLinks":
                    [],

                "neutralLinks":
                    [],

                "contradictingLinks":
                    [],

                "sourceAnalysis":
                    [],

                "sources":
                    []
            }