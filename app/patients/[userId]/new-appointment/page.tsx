import Image from "next/image";

import { AppointmentForm } from "@/components/form/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import * as Sentry from '@sentry/nextjs';

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new-appointment", patient?.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto remove-scrollbar">
        <div className="sub-container max-w-[860px] fle justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="h-10 mb-12 w-fit"
          />

          <AppointmentForm
            userId={userId}
            type="create"
            patientId={patient?.$id}
          />

          <p className="copyright py-12">© 2022. All rights reserved</p>
        </div>
      </section>

      <Image
        src={"/assets/images/appointment-img.png"}
        alt="appointment-"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
