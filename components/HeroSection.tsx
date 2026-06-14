"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Sparkles,
  Brain,
  FileCheck,
  SearchCheck
} from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-500/20 blur-[180px]" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">

        {/* Logo */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8
          }}
          className="flex justify-center mb-8"
        >

          <div
            className="
            flex
            items-center
            gap-4
            px-8
            py-4
            rounded-full
            glass
            orange-glow
          "
          >

            <Shield
              size={40}
              className="text-orange-500"
            />

            <div>

              <h1
                className="
                text-3xl
                md:text-4xl
                font-extrabold
                tracking-tight
              "
              >
                TrustLens AI
              </h1>

              <p
                className="
                text-sm
                text-orange-300
              "
              >
                Verify Before You Trust
              </p>

            </div>

          </div>

        </motion.div>

        {/* Main Hero */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          className="text-center"
        >

          <h2
            className="
            text-5xl
            md:text-7xl
            font-black
            mb-6
            leading-tight
          "
          >
            AI That
            <span className="text-orange-500">
              {" "}
              Verifies
            </span>
            <br />
            Other AI
          </h2>

          <p
            className="
            text-zinc-400
            text-lg
            md:text-xl
            max-w-3xl
            mx-auto
            mb-12
          "
          >
            Stop trusting AI blindly.
            TrustLens validates answers,
            checks evidence, analyzes sources,
            detects contradictions and provides
            transparent trust scores backed by
            real verification.
          </p>

        </motion.div>

        {/* Feature Cards */}

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.5
          }}
          className="
          grid
          md:grid-cols-4
          gap-5
          mt-10
        "
        >

          <div
            className="
            glass
            rounded-3xl
            p-6
            hover:scale-105
            transition
          "
          >

            <Brain
              className="
              text-orange-500
              mb-4
            "
              size={34}
            />

            <h3 className="font-bold text-lg mb-2">
              AI Reasoning
            </h3>

            <p className="text-zinc-400 text-sm">
              Detect whether answers come
              from reasoning or verified
              evidence.
            </p>

          </div>

          <div
            className="
            glass
            rounded-3xl
            p-6
            hover:scale-105
            transition
          "
          >

            <SearchCheck
              className="
              text-green-500
              mb-4
            "
              size={34}
            />

            <h3 className="font-bold text-lg mb-2">
              Source Verification
            </h3>

            <p className="text-zinc-400 text-sm">
              Analyze supporting,
              contradicting and neutral
              sources automatically.
            </p>

          </div>

          <div
            className="
            glass
            rounded-3xl
            p-6
            hover:scale-105
            transition
          "
          >

            <FileCheck
              className="
              text-orange-400
              mb-4
            "
              size={34}
            />

            <h3 className="font-bold text-lg mb-2">
              Document Intelligence
            </h3>

            <p className="text-zinc-400 text-sm">
              Upload PDFs, resumes,
              reports and ask questions
              directly from them.
            </p>

          </div>

          <div
            className="
            glass
            rounded-3xl
            p-6
            hover:scale-105
            transition
          "
          >

            <Sparkles
              className="
              text-yellow-400
              mb-4
            "
              size={34}
            />

            <h3 className="font-bold text-lg mb-2">
              Trust Score
            </h3>

            <p className="text-zinc-400 text-sm">
              Instantly understand how
              reliable an AI answer is
              using our trust engine.
            </p>

          </div>

        </motion.div>

      </div>

    </div>
  );
}