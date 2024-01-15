"use client";

import Link from "next/link";
import Image from "next/image";
import { ConceptDataType, conceptTranslation } from "@/app/components/Maps";

type PanelProps = {
  close?: (e: any) => void;
  data: ConceptDataType;
};

export const Panel = ({ data, close }: PanelProps) => {
  return (
    <section className="bg-white rounded-xl p-8 mx-4 w-full max-w-[736px] text-left">
      <header className="flex justify-between">
        <h1 className="text-xl font-bold">
          <span className="text-base mr-4 text-gray-600">コンセプト</span>
          {conceptTranslation[data.concept]}
        </h1>
        <button type="button" onClick={close}>
          Cancel
        </button>
      </header>
      <div className="flex mt-4">
        <Image src={data.images[0]} alt="" className="w-[300px] rounded-lg" />
        <div className="pl-4">
          <div>
            <p className="text-sm font-medium mb-1">キャッチコピー</p>
            <p className="bg-gray-100 p-4 rounded-xl">{data.catchphrase}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">概要</p>
            <p className="bg-gray-100 p-4 rounded-xl">{data.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {[...Array(5)].map((_, index) => (
          <>
            {data.images[index] ? (
              <Image
                src={data.images[index]}
                className="w-[122px] rounded-lg"
                alt=""
              />
            ) : (
              <div className="w-[122px] h-[122px] rounded-lg bg-gray-100"></div>
            )}
          </>
        ))}
      </div>
      <Link
        href={data.images[0]}
        className="mt-4 inline-flex justify-center w-full rounded-full bg-blue-600 py-3 font-semibold text-white shadow-sm hover:bg-blue-500"
      >
        画像を保存する
      </Link>
    </section>
  );
};
