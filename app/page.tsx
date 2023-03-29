import Image from "next/image";
import Link from "next/link";
import { faker } from "@faker-js/faker";

import Picture from "@/components/picture";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-6xl text-slate-800 font-bold font-serif my-20 text-center">
          Home
        </h1>
      <article className="grid grid-cols-8 gap-4 grid-flow-dense text-base text-slate-600">
        <div className="col-span-5">
          <p>{faker.lorem.paragraphs(6)}</p>
        </div>
        <div className="col-span-3">
          <Picture
            src="https://cdn.aidhan.photo/cdn-cgi/imagedelivery/Dxsm1yoM7Ap4me0rmkAg9w/c0d908d4-6c57-4978-9bea-38814dede700"
            alt="Doggo"
          />
        </div>
      </article>
    </div>
  );
}
