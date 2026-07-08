'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkOrderCard } from '@/components/work-order-card';
import { EmptyState } from '@/components/empty-state';
import { CardSkeletonGrid } from '@/components/skeleton';
import { useToast } from '@/components/toast';
import { ConfirmDialog } from '@/components/dialog';
import type { WorkOrder } from '@/lib/types';
import { Search, X, Filter } from "lucide-react";

export default function WorkOrdersPage() {

  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { success, error } = useToast();

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/work-orders', {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch {
        error('Failed to load work orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // helper function for filters 
  const normalizeStatus = (status:string) => {

    const map:any = {
      "done":"completed",
      "in progress":"in-progress",
      "open":"pending"
    };

    const value = status.toLowerCase();

    return map[value] || value.replace(/\s+/g,"-");

  };

  // Search
  const handleSearch = (query: string) => {
    setSearch(query);

    const lowerQuery = query.toLowerCase();

    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.title.toLowerCase().includes(lowerQuery) ||
        order.description.toLowerCase().includes(lowerQuery);

      const matchesStatus =
        statusFilter === "all" ||
        normalizeStatus(order.status) === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredOrders(filtered);
  };

  const handleStatusFilter = (status:string)=>{

    setStatusFilter(status);

    const filtered = orders.filter((order)=>{

      const matchesSearch =
        order.title.toLowerCase().includes(search.toLowerCase()) ||
        order.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        normalizeStatus(order.status) === status;


      return matchesSearch && matchesStatus;

    });


    setFilteredOrders(filtered);
  };

  // Delete
  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `/api/work-orders/${deleteId}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) {
        throw new Error('Failed');
      }
      setOrders(
        (prev) =>
          prev.filter(
            (o) => o.id !== deleteId
          )
      );

      setFilteredOrders(
        (prev) =>
          prev.filter(
            (o) => o.id !== deleteId
          )
      );

      success(
        'Work order deleted successfully'
      );
    } catch {
      error(
        'Failed to delete work order'
      );
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };
  return (
    <div
      className="
        w-full
        space-y-6 sm:space-y-8
      "
    >
      {/* Header */}
      <motion.div
        initial={{
          opacity:0,
          y:-30
        }}
        animate={{
          opacity:1,
          y:0
        }}
        transition={{
          duration:0.6,
          ease:"easeOut"
        }}
      >
        <motion.h1
          className="
            text-4xl
            sm:text-5xl
            font-extrabold
            tracking-tight
            bg-gradient-to-r
            from-violet-600
            via-fuchsia-600
            to-orange-500
            bg-clip-text
            text-transparent
          "
          animate={{
            backgroundPosition:[
              "0% 50%",
              "100% 50%",
              "0% 50%"
            ]
          }}
          transition={{
            duration:8,
            repeat:Infinity,
            ease:"linear"
          }}
        >
          Work Orders
        </motion.h1>
        <motion.p
          initial={{
            opacity:0
          }}
          animate={{
            opacity:1
          }}
          transition={{
            delay:0.3
          }}
          className="
            mt-3
            text-muted-foreground
          "
        >
          {
            loading
            ? "Loading..."
            : `${filteredOrders.length} work order${filteredOrders.length !== 1 ? 's' : ''}`
          }
        </motion.p>
      </motion.div>

      {/* Search & Filter */}

      <motion.div
        initial={{
        opacity:0,
        y:20
        }}
        animate={{
        opacity:1,
        y:0
        }}
        transition={{
        delay:0.3
        }}
        className="
        flex
        flex-col
        lg:flex-row
        gap-4
        justify-between
        "
        >


        {/* Search */}

        <div
        className="
        relative
        w-full
        lg:max-w-md
        "
        >

        <Search
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-muted-foreground
        "
        />


        <input

        value={search}

        onChange={(e)=>{
        handleSearch(e.target.value)
        }}

        placeholder="Search work orders..."

        className="
        w-full
        rounded-xl
        border
        bg-background
        pl-11
        pr-12
        py-3
        text-sm
        outline-none
        focus:ring-2
        focus:ring-violet-500
        transition
        "

        />


        {
        search && (

        <button

        onClick={()=>handleSearch("")}

        className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        "

        >

        <X size={18}/>

        </button>

        )
        }

        </div>



        {/* Filter */}

        <div
        className="
        flex
        items-center
        gap-3
        overflow-x-auto
        pb-1
        "
        >

        <Filter
        size={18}
        />


        {
        [
        "all",
        "pending",
        "in-progress",
        "completed"
        ].map((status)=>(


        <button

        key={status}

        onClick={()=>handleStatusFilter(status)}

        className={`
        px-4
        py-2
        rounded-full
        text-sm
        font-medium
        transition
        whitespace-nowrap

        ${
        statusFilter===status
        ?
        "bg-violet-600 text-white shadow-lg"
        :
        "bg-muted hover:bg-muted/80"
        }

        `}

        >

        {
        status === "all"
        ?
        "All"
        :
        status.replace("-"," ")
        }

        </button>


        ))
        }

        </div>


        </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {
          loading ? (
            <motion.div
              key="loading"
              initial={{
                opacity:0,
                y:20
              }}
              animate={{
                opacity:1,
                y:0
              }}
              exit={{
                opacity:0
              }}
            >
              <CardSkeletonGrid />
            </motion.div>
          ) : filteredOrders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{
                opacity:0,
                scale:0.9
              }}
              animate={{
                opacity:1,
                scale:1
              }}
              transition={{
                type:"spring",
                stiffness:120
              }}
            >
              <EmptyState />
            </motion.div>
          ) : (
            <motion.div
              key="orders"
              layout
              className="
                grid
                gap-5
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3
                2xl:grid-cols-4
              "
            >
              <AnimatePresence>
                {
                  filteredOrders.map(
                    (order,index)=>(
                      <motion.div
                        key={order.id}
                        layout
                        initial={{
                          opacity:0,
                          y:50,
                          scale:0.95
                        }}
                        animate={{
                          opacity:1,
                          y:0,
                          scale:1
                        }}
                        exit={{
                          opacity:0,
                          scale:0.85,
                          y:-20
                        }}
                        transition={{
                          duration:0.45,
                          delay:index * 0.07
                        }}
                        whileHover={{
                          y:-8,
                          scale:1.02
                        }}

                        whileTap={{
                          scale:0.98
                        }}
                      >
                        <WorkOrderCard
                          order={order}
                          onDelete={setDeleteId}
                          isDeleting={
                            isDeleting &&
                            deleteId === order.id
                          }
                        />
                      </motion.div>
                    )
                  )
                }
              </AnimatePresence>
            </motion.div>
          )
        }
      </AnimatePresence>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={
          deleteId !== null
        }
        title="Delete Work Order"
        description="This action cannot be undone. Are you sure you want to delete this work order?"
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}