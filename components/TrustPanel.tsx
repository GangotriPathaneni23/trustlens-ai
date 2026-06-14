"use client";

import TrustGauge from "./TrustGauge";
import VerdictBadge from "./VerdictBadge";
import ScoreBar from "./ScoreBar";
import SourceCard from "./SourceCard";

interface Source {
  title: string;
  url: string;
  summary: string;
  similarity: number;
}

interface Props {
  result: any;
}

export default function TrustPanel({
  result
}: Props) {

  if (!result) return null;

  return (

    <div
      className="
      mt-10
      space-y-8
    "
    >

      {/* TRUST HERO */}

      <div
        className="
        glass
        orange-glow
        rounded-[32px]
        p-8
      "
      >

        <div
          className="
          grid
          lg:grid-cols-2
          gap-8
          items-center
        "
        >

          {/* LEFT */}

          <div>

            <div className="mb-5">

              <span
                className="
                text-orange-400
                font-bold
                uppercase
                tracking-widest
                text-sm
              "
              >
                Verification Result
              </span>

            </div>

            <h2
              className="
              text-4xl
              font-black
              mb-4
            "
            >
              {result.verificationType}
            </h2>

            <div className="mb-5">
              <VerdictBadge
                verdict={
                  result.verdict
                }
              />
            </div>

            <p
              className="
              text-zinc-400
              text-lg
            "
            >
              {result.sourcesChecked}
              {" "}
              sources checked •
              {" "}
              {result.supportCount}
              {" "}
              supporting •
              {" "}
              {result.contradictCount}
              {" "}
              contradicting
            </p>

          </div>

          {/* RIGHT */}

          <TrustGauge
            score={
              result.trustScore
            }
          />

        </div>

      </div>

      {/* BREAKDOWN */}

      <div
        className="
        glass
        rounded-3xl
        p-8
      "
      >

        <h2
          className="
          text-2xl
          font-bold
          mb-8
        "
        >
          📊 Trust Breakdown
        </h2>

        <ScoreBar
          label="Evidence"
          value={result.evidence}
          icon="📚"
        />

        <ScoreBar
          label="Consensus"
          value={result.consensus}
          icon="🤝"
        />

        <ScoreBar
          label="Freshness"
          value={result.freshness}
          icon="⏰"
        />

        <ScoreBar
          label="Hallucination Risk"
          value={
            result.hallucination
          }
          icon="🧠"
        />

      </div>

      {/* SUPPORTING */}

      {result.supportingLinks &&
        result.supportingLinks.length > 0 && (

        <div
          className="
          glass
          green-glow
          rounded-3xl
          p-8
        "
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-6
            text-green-400
          "
          >
            ✅ Supporting Sources
            {" "}
            (
            {result.supportCount}
            )
          </h2>

          <div
            className="
            grid
            lg:grid-cols-2
            gap-4
          "
          >

            {result.supportingLinks.map(
              (
                source: Source,
                index: number
              ) => (

                <SourceCard
                  key={index}
                  title={source.title}
                  url={source.url}
                  summary={
                    source.summary
                  }
                  similarity={
                    source.similarity
                  }
                  type="support"
                />

              )
            )}

          </div>

        </div>

      )}

      {/* NEUTRAL */}

      {result.neutralLinks &&
        result.neutralLinks.length > 0 && (

        <div
          className="
          glass
          rounded-3xl
          p-8
        "
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-6
            text-orange-400
          "
          >
            ⚠️ Neutral Sources
            {" "}
            (
            {result.neutralCount}
            )
          </h2>

          <div
            className="
            grid
            lg:grid-cols-2
            gap-4
          "
          >

            {result.neutralLinks.map(
              (
                source: Source,
                index: number
              ) => (

                <SourceCard
                  key={index}
                  title={source.title}
                  url={source.url}
                  summary={
                    source.summary
                  }
                  similarity={
                    source.similarity
                  }
                  type="neutral"
                />

              )
            )}

          </div>

        </div>

      )}

      {/* CONTRADICTIONS */}

      {result.contradictingLinks &&
        result.contradictingLinks.length > 0 && (

        <div
          className="
          glass
          red-glow
          rounded-3xl
          p-8
        "
        >

          <h2
            className="
            text-2xl
            font-bold
            mb-6
            text-red-400
          "
          >
            ❌ Contradicting Sources
            {" "}
            (
            {result.contradictCount}
            )
          </h2>

          <div
            className="
            grid
            lg:grid-cols-2
            gap-4
          "
          >

            {result.contradictingLinks.map(
              (
                source: Source,
                index: number
              ) => (

                <SourceCard
                  key={index}
                  title={source.title}
                  url={source.url}
                  summary={
                    source.summary
                  }
                  similarity={
                    source.similarity
                  }
                  type="contradict"
                />

              )
            )}

          </div>

        </div>

      )}

    </div>

  );

}