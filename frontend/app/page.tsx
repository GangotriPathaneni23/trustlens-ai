"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import HeroSection from "../components/HeroSection";
import ChatInput from "../components/ChatInput";
import TrustPanel from "../components/TrustPanel";

export default function Home() {

  const [question, setQuestion] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [conversations, setConversations] =
    useState<any[]>([]);

  const handleSend = async () => {

    if (
      !question.trim() &&
      !selectedFile
    ) {
      return;
    }

    const userQuestion =
      question;

    const currentFile =
      selectedFile;

    setQuestion("");

    setSelectedFile(null);

    const currentIndex =
      conversations.length;

    setConversations(
      (prev) => [
        ...prev,
        {
          question:
            userQuestion,

          fileName:
            currentFile
              ? currentFile.name
              : null,

          result:
            null,

          loading:
            true
        }
      ]
    );

    setLoading(true);

    try {

      let response;

      if (currentFile) {

        const formData =
          new FormData();

        formData.append(
          "file",
          currentFile
        );

        formData.append(
          "question",
          userQuestion
        );

        response =
          await axios.post(
            "http://localhost:8000/analyze-file",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

      } else {

        response =
          await axios.post(
            "http://localhost:8000/analyze",
            {
              question:
                userQuestion
            }
          );

      }

      setConversations(
        (prev) =>
          prev.map(
            (
              item,
              index
            ) =>
              index === currentIndex
                ? {
                    ...item,
                    result:
                      response.data,
                    loading:
                      false
                  }
                : item
          )
      );

    } catch (error) {

      console.error(error);

      setConversations(
        (prev) =>
          prev.map(
            (
              item,
              index
            ) =>
              index === currentIndex
                ? {
                    ...item,
                    loading:
                      false,
                    result: {
                      answer:
                        "Something went wrong. Please try again."
                    }
                  }
                : item
          )
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main
      className="
      min-h-screen
      text-white
      "
    >

      {conversations.length === 0 ? (

        <HeroSection />

      ) : (

        <div
          className="
          border-b
          border-zinc-800
          py-5
          mb-6
          "
        >

          <div
            className="
            max-w-7xl
            mx-auto
            px-6
            flex
            items-center
            gap-3
            "
          >

            <span className="text-3xl">
              🛡️
            </span>

            <div>

              <h1
                className="
                text-xl
                font-bold
                "
              >
                TrustLens AI
              </h1>

              <p
                className="
                text-sm
                text-orange-400
                "
              >
                Verify Before You Trust
              </p>

            </div>

          </div>

        </div>

      )}

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        pb-44
        "
      >

        {conversations.map(
          (
            item,
            index
          ) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              className="
              mb-8
              glass
              rounded-[32px]
              p-8
              "
            >

              {/* USER QUESTION */}

              <div
                className="
                flex
                justify-end
                mb-8
                "
              >

                <div
                  className="
                  bg-orange-500
                  text-black
                  px-6
                  py-4
                  rounded-3xl
                  max-w-[70%]
                  font-medium
                  "
                >

                  <div>

                    <div>
                      {item.question}
                    </div>

                    {item.fileName && (

                      <div
                        className="
                        mt-3
                        bg-orange-950/40
                        border
                        border-orange-700
                        rounded-xl
                        px-3
                        py-2
                        text-sm
                        text-orange-100
                        flex
                        items-center
                        gap-2
                        w-fit
                        "
                      >

                        📄 {item.fileName}

                      </div>

                    )}

                  </div>

                </div>

              </div>

              {/* AI ANSWER */}

              <div
                className="
                bg-zinc-900
                border
                border-zinc-800
                rounded-3xl
                p-6
                mb-8
                "
              >

                <div
                  className="
                  text-orange-400
                  font-bold
                  mb-3
                  "
                >
                  🤖 AI Answer
                </div>

                {item.loading ? (

                  <div
                    className="
                    flex
                    gap-3
                    items-center
                    "
                  >

                    <div
                      className="
                      w-3
                      h-3
                      bg-orange-500
                      rounded-full
                      animate-bounce
                      "
                    />

                    <div
                      className="
                      w-3
                      h-3
                      bg-orange-500
                      rounded-full
                      animate-bounce
                      "
                      style={{
                        animationDelay:
                          "0.15s"
                      }}
                    />

                    <div
                      className="
                      w-3
                      h-3
                      bg-orange-500
                      rounded-full
                      animate-bounce
                      "
                      style={{
                        animationDelay:
                          "0.3s"
                      }}
                    />

                  </div>

                ) : (

                  <div
                    className="
                    text-zinc-200
                    leading-relaxed
                    whitespace-pre-wrap
                    "
                  >

                    {
                      item.result?.answer
                        ?.replace(
                          /【\d+:\d+†source】/g,
                          ""
                        )
                        ?.trim()
                    }

                  </div>

                )}

              </div>

              {/* TRUST PANEL */}

              {!item.loading &&
                item.result && (

                <TrustPanel
                  result={
                    item.result
                  }
                />

              )}

            </motion.div>

          )
        )}

      </div>

      <div
        className="
        fixed
        bottom-6
        left-1/2
        -translate-x-1/2
        w-[90%]
        max-w-6xl
        z-50
        "
      >

        <ChatInput
          question={question}
          setQuestion={
            setQuestion
          }
          selectedFile={
            selectedFile
          }
          setSelectedFile={
            setSelectedFile
          }
          onSend={
            handleSend
          }
          loading={
            loading
          }
        />

      </div>

    </main>

  );

}
