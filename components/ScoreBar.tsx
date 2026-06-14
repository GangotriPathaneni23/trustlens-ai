interface Props {
  label: string;
  value: number;
  icon: string;
}

export default function ScoreBar({
  label,
  value,
  icon
}: Props) {

  let color =
    "bg-red-500";

  if (value >= 80) {
    color = "bg-green-500";
  }

  else if (value >= 50) {
    color = "bg-orange-500";
  }

  return (

    <div className="mb-5">

      <div className="flex justify-between mb-2">

        <span className="font-medium">
          {icon} {label}
        </span>

        <span>
          {value}%
        </span>

      </div>

      <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{
            width: `${value}%`
          }}
        />

      </div>

    </div>
  );
}