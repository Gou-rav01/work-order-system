import { getAllWorkOrders } from '@/lib/data/workOrders';
import type { WorkOrderStatus } from '@/lib/types';

import RecentActivity from "@/components/dashboard/RecentActivity";
import AnimatedStats from "@/components/dashboard/AnimatedStats";
import StatusCards from "@/components/dashboard/StatusCards";

export const revalidate = 0;


interface StatCard {
  label: string;
  value: number;
  color: string;
}


export default async function DashboardPage() {

  const orders = await getAllWorkOrders();


  // Statistics

  const total = orders.length;

  const open = orders.filter(
    (o) => o.status === 'Open'
  ).length;


  const inProgress = orders.filter(
    (o) => o.status === 'In Progress'
  ).length;


  const done = orders.filter(
    (o) => o.status === 'Done'
  ).length;


  const highPriority = orders.filter(
    (o) => o.priority === 'High'
  ).length;



  // Status Groups

  const byStatus: Record<WorkOrderStatus, typeof orders> = {

    Open: orders.filter(
      (o) => o.status === 'Open'
    ),


    'In Progress': orders.filter(
      (o) => o.status === 'In Progress'
    ),


    Done: orders.filter(
      (o) => o.status === 'Done'
    ),

  };




  const stats: StatCard[] = [

    {
      label: 'Total Orders',
      value: total,
      color:
        `
        bg-gradient-to-br 
        from-fuchsia-100 
        via-purple-100 
        to-indigo-100
        text-purple-700
        border-purple-200
        shadow-purple-100
        `,
    },


    {
      label: 'Open',
      value: open,
      color:
        `
        bg-gradient-to-br
        from-orange-100
        via-amber-100
        to-yellow-100
        text-orange-700
        border-orange-200
        shadow-orange-100
        `,
    },


    {
      label: 'In Progress',
      value: inProgress,
      color:
        `
        bg-gradient-to-br
        from-cyan-100
        via-sky-100
        to-blue-100
        text-cyan-700
        border-cyan-200
        shadow-cyan-100
        `,
    },


    {
      label: 'Completed',
      value: done,
      color:
        `
        bg-gradient-to-br
        from-emerald-100
        via-green-100
        to-lime-100
        text-emerald-700
        border-emerald-200
        shadow-emerald-100
        `,
    },


    {
      label: 'High Priority',
      value: highPriority,
      color:
        `
        bg-gradient-to-br
        from-rose-100
        via-pink-100
        to-red-100
        text-rose-700
        border-rose-200
        shadow-rose-100
        `,
    },

  ];





  return (

    <div
      className="
        w-full
        space-y-8
        rounded-3xl
      "
    >



      {/* Header */}

      <div
        className="
          flex
          flex-col
          gap-3
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >


        <div>


          <h1
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
          >
            Dashboard
          </h1>



          <p
            className="
              mt-3
              text-sm
              sm:text-base
              text-slate-500
              max-w-xl
            "
          >
            Manage your TechFlow work orders with powerful insights and real-time activity.
          </p>



        </div>


      </div>





      {/* Animated Statistics */}

      <AnimatedStats stats={stats} />





      {/* Animated Status Cards */}

      <StatusCards byStatus={byStatus} />





      {/* Animated Recent Activity */}

      {
        orders.length > 0 && (
          <RecentActivity orders={orders} />
        )
      }





    </div>

  );
}