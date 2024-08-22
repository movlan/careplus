"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Appointment } from "@/types/appwrite.types";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import AppointmentModal from "../AppointmentModal";

const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    header: "Doctor",
    accessorKey: "doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (d) => d.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt="doctor"
            height={100}
            width={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <p className="pl-4">Actions</p>,
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            title="Schedule Appointment"
            description="Please confirm the following details to schedule"
            type="schedule"
          />
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            title="Cancel Appointment"
            description="Are you sure you want to cancel this appointment?"
            type="cancel"
          />
        </div>
      );
    },
  },
];

export default columns;
