import React from "react";
import clsx from "clsx";
import Image from "next/image";

type TStatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

const StatCard = (props: TStatCardProps) => {
  const { type, count, label, icon } = props;

  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          alt="label"
          width={32}
          height={32}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold-text-bold">{count}</h2>
        <p className="text-14-regular">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
