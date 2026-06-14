"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Search,
  Database,
  ShieldCheck
} from "lucide-react";

const steps = [
  {
    icon: Brain,
    text: "Analyzing AI Response..."
  },
  {
    icon: Search,
    text: "Verifying Sources..."
  },
  {
    icon: Database,
    text: "Checking Evidence..."
  },
  {
    icon: ShieldCheck,
    text: "Calculating Trust Score..."
  }
];

export default function LoadingAnimation() {

  return (

    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      py-20
    "
    >

      {/* Main Orb */}

      <div className="relative">

        {/* Outer Ring */}

        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "linear"
          }}
          className="
          absolute
          inset-0
          w-40
          h-40
          rounded-full
          border-2
          border-orange-500/40
        "
        />

        {/* Inner Ring */}

        <motion.div
          animate={{
            rotate: -360
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear"
          }}
          className="
          absolute
          inset-4
          w-32
          h-32
          rounded-full
          border
          border-orange-400/30
        "
        />

        {/* Pulse Core */}

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            repeat: Infinity,
            duration: 2
          }}
          className="
          w-40
          h-40
          rounded-full
          bg-orange-500/20
          flex
          items-center
          justify-center
          backdrop-blur-xl
        "
        >

          <ShieldCheck
            size={52}
            className="
            text-orange-400
          "
          />

        </motion.div>

      </div>

      {/* Title */}

      <motion.h2
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          repeat: Infinity,
          duration: 2
        }}
        className="
        text-3xl
        font-black
        mt-10
        mb-3
      "
      >
        TrustLens Verification
      </motion.h2>

      <p
        className="
        text-zinc-400
        mb-10
      "
      >
        Verifying before trusting...
      </p>

      {/* Steps */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-4
        w-full
        max-w-3xl
      "
      >

        {steps.map(
          (
            step,
            index
          ) => {

            const Icon =
              step.icon;

            return (

              <motion.div
                key={index}
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay:
                    index * 0.4
                }}
                className="
                glass
                rounded-2xl
                p-5
                flex
                items-center
                gap-4
              "
              >

                <div
                  className="
                  bg-orange-500/20
                  p-3
                  rounded-xl
                "
                >

                  <Icon
                    className="
                    text-orange-400
                  "
                    size={24}
                  />

                </div>

                <span
                  className="
                  font-medium
                "
                >
                  {step.text}
                </span>

              </motion.div>

            );

          }
        )}

      </div>

      {/* Bottom Text */}

      <motion.div
        animate={{
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          repeat: Infinity,
          duration: 2
        }}
        className="
        mt-10
        text-orange-400
        font-semibold
      "
      >
        🔍 Finding Truth Through Evidence
      </motion.div>

    </div>

  );

}