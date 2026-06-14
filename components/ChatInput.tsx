"use client";

import { useRef } from "react";
import {
  Paperclip,
  SendHorizonal,
  FileText,
  X
} from "lucide-react";

interface Props {

  question: string;

  setQuestion: (
    value: string
  ) => void;

  selectedFile: File | null;

  setSelectedFile: (
    file: File | null
  ) => void;

  onSend: () => void;

  loading: boolean;
}

export default function ChatInput({

  question,

  setQuestion,

  selectedFile,

  setSelectedFile,

  onSend,

  loading

}: Props) {

  const fileRef =
    useRef<HTMLInputElement>(null);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (file) {

      setSelectedFile(
        file
      );

    }

  };

  return (

    <div className="w-full">

      {/* FILE PREVIEW */}

      {selectedFile && (

        <div
          className="
          mb-4
          flex
          items-center
          justify-between
          bg-orange-500/10
          border
          border-orange-500/30
          rounded-2xl
          p-4
          backdrop-blur-xl
        "
        >

          <div
            className="
            flex
            items-center
            gap-3
          "
          >

            <FileText
              size={24}
              className="
              text-orange-400
            "
            />

            <div>

              <p
                className="
                font-medium
                text-white
              "
              >
                {selectedFile.name}
              </p>

              <p
                className="
                text-xs
                text-zinc-400
              "
              >
                {(selectedFile.size / 1024).toFixed(1)}
                {" "}
                KB
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setSelectedFile(
                null
              )
            }
          >

            <X
              size={20}
              className="
              text-red-400
              hover:text-red-300
              transition
            "
            />

          </button>

        </div>

      )}

      {/* CHAT INPUT */}

      <div
        className="
        glass
        orange-glow
        rounded-3xl
        p-3
      "
      >

        <div
          className="
          flex
          items-center
          gap-3
        "
        >

          {/* FILE BUTTON */}

          <button
            type="button"
            onClick={() =>
              fileRef.current?.click()
            }
            className="
            p-3
            rounded-xl
            bg-orange-500/20
            hover:bg-orange-500/30
            transition
          "
          >

            <Paperclip
              size={22}
              className="
              text-orange-400
            "
            />

          </button>

          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept="
              .pdf,
              .docx,
              .txt
            "
            onChange={
              handleFileSelect
            }
          />

          {/* QUESTION INPUT */}

          <input
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !loading &&
                (
                  question.trim() ||
                  selectedFile
                )
              ) {

                onSend();

              }

            }}
            placeholder="
              Ask anything or upload a document...
            "
            className="
            flex-1
            bg-transparent
            outline-none
            text-lg
            text-white
            placeholder:text-zinc-500
          "
          />

          {/* SEND BUTTON */}

          <button
            disabled={
              loading ||
              (
                !question.trim() &&
                !selectedFile
              )
            }
            onClick={onSend}
            className="
            bg-orange-500
            hover:bg-orange-400
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
            rounded-2xl
            p-3
          "
          >

            <SendHorizonal
              size={22}
              className="
              text-black
            "
            />

          </button>

        </div>

      </div>

    </div>

  );

}