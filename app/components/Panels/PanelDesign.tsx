"use client";

import Link from "next/link";
import Image from "next/image";
import { DesignDataType, conceptTranslation } from "@/app/components/Maps";
import { useState } from "react";

type PanelDesignProps = {
  close?: (e: any) => void;
  data: DesignDataType;
};

export const PanelDesign = ({ data, close }: PanelDesignProps) => {
  const [index, setIndex] = useState<number>(0);

  const handleClick =
    (number: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIndex(number);
    };

  return (
    <section className="bg-white rounded-xl p-8 mx-4 w-full max-w-[736px] text-left">
      <header className="flex justify-between">
        <h1 className="text-xl font-bold">
          <span className="text-base mr-4 text-gray-600">コンセプト</span>
          {conceptTranslation[data.concept]}
        </h1>
        <button type="button" className="text-gray-600 text-sm" onClick={close}>
          閉じる
        </button>
      </header>
      <div className="flex mt-4">
        <div className="relative w-[300px] h-[300px] flex-shrink-0">
          <Image
            src={data.images[index]}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="pl-4">
          <div>
            <p className="text-sm font-medium mb-1">キャッチコピー</p>
            <p className="bg-gray-100 p-4 rounded-xl">
              {data.catchphrase[index]}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">概要</p>
            <p className="bg-gray-100 p-4 rounded-xl">
              {data.description[index]}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {[...Array(5)].map((_, i) => (
          <button
            type="button"
            className="relative w-[122px] h-[122px] rounded-lg bg-gray-100"
            disabled={data.images[i] ? false : true}
            key={i}
            onClick={handleClick(i)}
          >
            {data.images[i] && (
              <Image
                src={data.images[i]}
                className="rounded-lg object-cover"
                fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                alt=""
              />
            )}
          </button>
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
