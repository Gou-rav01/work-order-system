"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface RecentActivityProps {
  orders: any[];
}

export default function RecentActivity({ orders }: RecentActivityProps) {
  return (
    <motion.div
      className="card-premium p-5 sm:p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >

      <motion.h2
        className="text-lg font-semibold text-foreground mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        Recent Activity
      </motion.h2>


      <div className="space-y-3">

        {orders.slice(0, 5).map((order, index) => (

          <motion.div
            key={order.id}
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
            }}
            whileHover={{
              scale: 1.01,
              x: 5,
            }}
          >

            <Link
              href={`/work-orders/${order.id}`}
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-3
                p-4
                rounded-xl
                hover:bg-muted
                transition-colors
              "
            >

              <div className="min-w-0 flex-1">

                <p className="font-medium text-foreground truncate">
                  {order.title}
                </p>

                <p className="text-xs text-muted-foreground">
                  Updated today
                </p>

              </div>


              <div className="self-start sm:self-auto sm:ml-4">

                <motion.span
                  whileHover={{
                    scale: 1.08,
                  }}
                  className={`
                    inline-block
                    px-2
                    py-1
                    rounded
                    text-xs
                    font-medium
                    ${
                      order.status === "Done"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        : order.status === "In Progress"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        : "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400"
                    }
                  `}
                >
                  {order.status}
                </motion.span>

              </div>

            </Link>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}