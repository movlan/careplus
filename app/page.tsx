import Image from "next/image";
import Link from "next/link";

import PatientForm from "@/components/form/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";

const Home = (props: SearchParamProps) => {
  const {
    searchParams: { admin },
  } = props;
  const isAdmin = admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification | PassKey Modal */}
      {isAdmin && <PasskeyModal />}

      <section className="container my-auto remove-scrollbar">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="h-10 mb-12 w-fit"
          />

          <PatientForm />

          <div className="flex justify-between mt-20 text-14-regular">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2022. All rights reserved
            </p>
            <Link href={"/?admin=true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src={"/assets/images/onboarding-img.png"}
        alt="patient"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
