interface Props {
  title: string;
  url: string;
  summary: string;
  similarity: number;
  type: "support" | "neutral" | "contradict";
}

export default function SourceCard({
  title,
  url,
  summary,
  similarity,
  type
}: Props) {

  const styles = {

    support:
      "border-green-500 bg-green-500/10",

    neutral:
      "border-orange-500 bg-orange-500/10",

    contradict:
      "border-red-500 bg-red-500/10"
  };

  const emoji = {

    support: "✅",

    neutral: "⚠️",

    contradict: "❌"
  };

  return (

    <a
      href={url}
      target="_blank"
      className={`
        block
        p-4
        rounded-2xl
        border
        ${styles[type]}
        hover:scale-[1.02]
        transition
      `}
    >

      <div className="flex justify-between mb-2">

        <h3 className="font-bold">

          {emoji[type]} {title}

        </h3>

        <span>

          {Math.round(
            similarity * 100
          )}
          %

        </span>

      </div>

      <p className="text-sm text-zinc-300 line-clamp-4">

        {summary}

      </p>

    </a>
  );
}