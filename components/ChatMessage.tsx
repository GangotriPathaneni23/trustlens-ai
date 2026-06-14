interface Props {
  text: string;
  isUser: boolean;
}

export default function ChatMessage({
  text,
  isUser
}: Props) {

  return (

    <div
      className={`flex mb-6 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`
        max-w-3xl
        rounded-3xl
        px-6
        py-4
        ${
          isUser
            ? "bg-orange-500 text-black"
            : "bg-zinc-900 border border-zinc-800"
        }
      `}
      >

        {text}

      </div>

    </div>
  );
}