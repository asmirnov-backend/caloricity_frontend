import { Image } from "@nextui-org/image";

export default function Home() {
  return (
    <div className="my-5 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <Image
        alt="main image"
        className="flex items-center justify-center"
        height={600}
        src="/main.jpeg"
        width={800}
      />
    </div>
  );
}
