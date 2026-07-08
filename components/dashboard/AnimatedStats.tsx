"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { TrendingUp } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  color: string;
}

export default function AnimatedStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            type: "spring",
          }}
          whileHover={{
            y: -8,
            scale: 1.03,
          }}
          className="
            card-premium 
            hover-lift 
            p-5 sm:p-6
            relative
            overflow-hidden
            group
          "
        >

          {/* Glow effect */}
          <div
            className="
            absolute inset-0 
            opacity-0 
            group-hover:opacity-100 
            transition
            bg-gradient-to-br
            from-primary/10
            to-transparent
          "
          />

          <div className="relative z-10">

            <motion.div
              whileHover={{
                rotate: 10,
                scale: 1.1,
              }}
              className={`${stat.color} rounded-xl p-3 w-fit mb-4`}
            >
              <TrendingUp className="h-5 w-5" />
            </motion.div>


            <p className="text-sm text-muted-foreground mb-1">
              {stat.label}
            </p>


            <div className="text-3xl font-bold text-foreground">
              <CountUp
                start={0}
                end={stat.value}
                duration={1.8}
                delay={0.2}
              />
            </div>

          </div>

        </motion.div>
      ))}
    </div>
  );
}