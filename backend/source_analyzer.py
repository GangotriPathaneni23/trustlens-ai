from newspaper import Article
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import traceback


class SourceAnalyzer:

    def __init__(self):

        self.model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    # --------------------------------------------------
    # scrape article
    # --------------------------------------------------

    def fetch_article(self, url):

        try:

            article = Article(url)

            article.download()
            article.parse()

            return {
                "title": article.title,
                "text": article.text[:5000]
            }

        except Exception as e:

            print("SCRAPE ERROR:", e)

            return {
                "title": "",
                "text": ""
            }

    # --------------------------------------------------
    # summarize article
    # --------------------------------------------------

    def summarize_text(self, text):

        try:

            sentences = text.split(".")

            if len(sentences) <= 5:
                return text[:1000]

            return ".".join(sentences[:5])

        except Exception:

            return text[:1000]

    # --------------------------------------------------
    # semantic comparison
    # --------------------------------------------------

    def semantic_similarity(
        self,
        answer,
        source_summary
    ):

        try:

            embeddings = self.model.encode(
                [answer, source_summary]
            )

            similarity = cosine_similarity(
                [embeddings[0]],
                [embeddings[1]]
            )[0][0]

            return float(similarity)

        except Exception as e:

            print("SIMILARITY ERROR:", e)

            return 0

    # --------------------------------------------------
    # stance detection
    # --------------------------------------------------

    def detect_stance(
        self,
        answer,
        source_summary
    ):
           # -----------------------------------
           # SCRAPE FAILED / EMPTY PAGE
           # -----------------------------------

        if source_summary.strip() == "":

            return (
            "neutral",
             0
            )

        similarity = self.semantic_similarity(
            answer,
            source_summary
        )

        answer_lower = answer.lower()
        source_lower = source_summary.lower()

        answer_words = set(
            word
            for word in answer_lower.split()
            if len(word) > 3
        )

        source_words = set(
            word
            for word in source_lower.split()
            if len(word) > 3
        )

        overlap = len(
            answer_words.intersection(
                source_words
            )
        )

        support_bonus = overlap * 0.02

        adjusted_score = similarity + support_bonus

        adjusted_score = min(
            adjusted_score,
            1.0
        )

        if adjusted_score >= 0.55:

            return (
                "support",
                adjusted_score
            )

        elif adjusted_score >= 0.35:

            return (
                "neutral",
                adjusted_score
            )

        else:

            return (
                "contradict",
                adjusted_score
            )

    # --------------------------------------------------
    # analyze one source
    # --------------------------------------------------

    def analyze_source(
        self,
        answer,
        source
    ):

        try:

            article = self.fetch_article(
                source["url"]
            )

            summary = self.summarize_text(
                article["text"]
            )

            stance, similarity = self.detect_stance(
                answer,
                summary
            )

            return {

                "title": source["title"],

                "url": source["url"],

                "summary": summary,

                "stance": stance,

                "similarity": round(
                    similarity,
                    2
                ),

                "supports_answer": (
                    stance == "support"
                ),

                "contradicts_answer": (
                    stance == "contradict"
                ),

                "is_neutral": (
                    stance == "neutral"
                )
            }

        except Exception:

            traceback.print_exc()

            return {

                "title": source["title"],

                "url": source["url"],

                "summary": "",

                "stance": "unknown",

                "similarity": 0,

                "supports_answer": False,

                "contradicts_answer": False,

                "is_neutral": False
            }

    # --------------------------------------------------
    # analyze all sources
    # --------------------------------------------------

    def analyze_sources(
        self,
        answer,
        sources
    ):

        results = []

        support_count = 0
        neutral_count = 0
        contradict_count = 0

        support_links = []
        neutral_links = []
        contradict_links = []

        for source in sources:

            result = self.analyze_source(
                answer,
                source
            )

            results.append(
                result
            )

            if result["stance"] == "support":

                support_count += 1

                support_links.append({

                    "title": result["title"],

                    "url": result["url"],

                    "summary": result["summary"],

                    "similarity": result["similarity"]
                })

            elif result["stance"] == "neutral":

                neutral_count += 1

                neutral_links.append({

                    "title": result["title"],

                    "url": result["url"],

                    "summary": result["summary"],

                    "similarity": result["similarity"]
                })

            elif result["stance"] == "contradict":

                contradict_count += 1

                contradict_links.append({

                    "title": result["title"],

                    "url": result["url"],

                    "summary": result["summary"],

                    "similarity": result["similarity"]
                })

        return {

            "results": results,

            "support_count": support_count,

            "neutral_count": neutral_count,

            "contradict_count": contradict_count,

            "support_links": support_links,

            "neutral_links": neutral_links,

            "contradict_links": contradict_links
        }