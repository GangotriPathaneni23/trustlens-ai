interface Props {
  verdict: string;
}

export default function VerdictBadge({
  verdict
}: Props) {

  let color =
    "bg-red-500";

  let emoji =
    "🚨";

  if (
    verdict === "Trusted"
  ) {

    color =
      "bg-green-500";

    emoji =
      "🟢";
  }

  else if (
    verdict ===
    "Likely Reliable"
  ) {

    color =
      "bg-orange-500";

    emoji =
      "🟠";
  }

  return (

    <div
      className={`
      ${color}
      px-4
      py-2
      rounded-full
      font-bold
      text-black
      inline-flex
      gap-2
      `}
    >
      <span>{emoji}</span>
      <span>{verdict}</span>
    </div>
  );
}