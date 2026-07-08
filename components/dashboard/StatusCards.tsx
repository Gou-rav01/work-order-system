"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { WorkOrderStatus } from "@/lib/types";

interface StatusCardsProps {
  byStatus: Record<
    WorkOrderStatus,
    {
      id: string;
      title: string;
      status: WorkOrderStatus;
    }[]
  >;
}

export default function StatusCards({ byStatus }: StatusCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
      {Object.entries(byStatus).map(([status, statusOrders], index) => (
        <motion.div
          key={status}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
            type: "spring",
          }}
          whileHover={{
            y: -8,
            scale: 1.02,
          }}
          className="
            card-premium
            p-5 sm:p-6
            relative
            overflow-hidden
            group
          "
        >

          {/* Background Glow */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-primary/10
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
            "
          />


          <div className="relative z-10">

            <div className="flex items-center justify-between mb-4">

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.2 + 0.3,
                }}
                className="font-semibold text-foreground"
              >
                {status}
              </motion.h3>


              <motion.span
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.2 + 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                className="
                  text-2xl
                  font-bold
                  text-primary
                "
              >
                {statusOrders.length}
              </motion.span>

            </div>


            <p className="text-sm text-muted-foreground mb-5">
              {statusOrders.length === 0
                ? "No orders in this status"
                : `${statusOrders.length} work order${
                    statusOrders.length !== 1 ? "s" : ""
                  } pending`}
            </p>


            <Link
              href={`/work-orders?status=${status}`}
              className="
                inline-flex
                items-center
                text-sm
                font-medium
                text-primary
                transition-all
                duration-300
                hover:translate-x-1
              "
            >
              View all →
            </Link>

          </div>

        </motion.div>
      ))}
    </div>
  );
}