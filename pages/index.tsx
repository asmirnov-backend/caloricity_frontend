import Image from "next/image";

import main from "../public/main.jpeg";

export default function Home() {
  return (
    <div className="my-5 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4 items-center">
      <Image alt="main image" src={main} />
    </div>
  );
}
