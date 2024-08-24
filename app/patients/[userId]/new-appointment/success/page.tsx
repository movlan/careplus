import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { getUser } from "@/lib/actions/patient.actions";
import { formatDateTime } from "@/lib/utils";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AppointmentSuccess = async (props: SearchParamProps) => {
  const {
    params: { userId },
    searchParams: { appointmentId },
  } = props;

  const user = await getUser(userId as string);

  Sentry.metrics.set("user_view_new-appointment-success", user?.name);
  // get appointment info
  const appointment = await getAppointment(appointmentId as string);
  // get doctor info
  const doctor = Doctors.find((d) => d.name === appointment.primaryPhysician);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success gif"
            height={300}
            width={300}
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted.
          </h2>
          <p>You will be notified when your appointment is confirmed.</p>
        </section>

        <section className="request-details">
          <p>Requested Appointment Details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              height={100}
              width={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>

          <div className="flex gap-2 items-center">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={42}
              height={42}
            />
            <p>{formatDateTime(appointment.schedule!).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className="shadow-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright">© 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default AppointmentSuccess;
