"use client";

import GraphLg from "@/app/public/graph-lg.png";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { CardConceptImage } from "../Cards/CardConceptImage";
import OpenAI from "openai";

export type ConceptType =
  | "romantic"
  | "pretty"
  | "clear"
  | "casual"
  | "natural"
  | "elegant"
  | "cool"
  | "dynamic"
  | "gorgeous"
  | "sic"
  | "wild"
  | "classic"
  | "dandy"
  | "modern"
  | "formal";

export const conceptTranslation = {
  romantic: "ロマンチック",
  pretty: "プリティー",
  clear: "クリア",
  casual: "カジュアル",
  natural: "ナチュラル",
  elegant: "エレガント",
  cool: "クール",
  dynamic: "ダイナミック",
  gorgeous: "ゴージャス",
  sic: "シック",
  wild: "ワイルド",
  classic: "クラシック",
  dandy: "ダンディ",
  modern: "モダン",
  formal: "フォーマル",
};

export type ConceptDataType = {
  concept: ConceptType;
  catchphrase: string;
  description: string;
  images: string[];
};

type MapProps = {
  data: ConceptDataType[];
};

export const Map = ({ data }: MapProps) => {
  const romanticData = useMemo(() => {
    console.log("data2:", data);

    return data.find((item) => item.concept === conceptTranslation["romantic"]);
  }, [data]);

  const prettyData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["pretty"]),
    [data]
  );

  const clearData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["clear"]),
    [data]
  );

  const casualData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["casual"]),
    [data]
  );

  const naturalData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["natural"]),
    [data]
  );

  const elegantData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["elegant"]),
    [data]
  );

  const coolData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["cool"]),
    [data]
  );

  const dynamicData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["dynamic"]),
    [data]
  );

  const gorgeousData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["gorgeous"]),
    [data]
  );

  const sicData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["sic"]),
    [data]
  );

  const wildData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["wild"]),
    [data]
  );

  const classicData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["classic"]),
    [data]
  );

  const dandyData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["dandy"]),
    [data]
  );

  const modernData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["modern"]),
    [data]
  );

  const formalData = useMemo(
    () => data.find((item) => item.concept === conceptTranslation["formal"]),
    [data]
  );

  useEffect(() => {
    console.log("data:", data);
    console.log("romanticData:", romanticData);
  }, [data]);

  return (
    <div className="mt-10 mb-4">
      <p className="text-md font-bold text-gray-900">ポジショニングマップ</p>
      <div className="absolute w-full">
        <div className="flex justify-center">
          <CardConceptImage
            label="ロマンチック"
            data={romanticData}
            onClick={() => {}}
            positionStyle="mt-[70px]"
          />
        </div>
        <div className="flex mt-[-90px]">
          <CardConceptImage
            label="プリティ"
            data={prettyData}
            onClick={() => {}}
            positionStyle="ml-[140px]"
          />
          <CardConceptImage
            label="クリア"
            data={clearData}
            onClick={() => {}}
            positionStyle="ml-[300px] "
          />
        </div>
        <div className="flex">
          <CardConceptImage
            label="カジュアル"
            data={casualData}
            onClick={() => {}}
            positionStyle="ml-[90px]"
          />
          <CardConceptImage
            label="ナチュラル"
            data={naturalData}
            onClick={() => {}}
            positionStyle="ml-[20px]"
          />
        </div>
        <div className="flex mt-[-30px]">
          <CardConceptImage
            label="エレガント"
            data={elegantData}
            onClick={() => {}}
            positionStyle="ml-[340px]"
          />
          <CardConceptImage
            label="クール"
            data={coolData}
            onClick={() => {}}
            positionStyle="ml-[145px]"
          />
        </div>
        <div className="flex mt-[-74px]">
          <CardConceptImage
            label="ダイナミック"
            data={dynamicData}
            onClick={() => {}}
            positionStyle="ml-[90px]"
          />
          <CardConceptImage
            label="ゴージャス"
            data={gorgeousData}
            onClick={() => {}}
            positionStyle="ml-[20px]"
          />
          <CardConceptImage
            label="シック"
            data={sicData}
            onClick={() => {}}
            positionStyle="ml-[180px]"
          />
        </div>
        <div className="flex">
          <CardConceptImage
            label="ワイルド"
            data={wildData}
            onClick={() => {}}
            positionStyle="ml-[120px]"
          />
          <CardConceptImage
            label="クラシック"
            data={classicData}
            onClick={() => {}}
            positionStyle="ml-[20px]"
          />
          <CardConceptImage
            label="ダンディ"
            data={dandyData}
            onClick={() => {}}
            positionStyle="ml-[140px]"
          />
          <CardConceptImage
            label="モダン"
            data={modernData}
            onClick={() => {}}
            positionStyle="ml-[20px]"
          />
        </div>
        <div className="flex">
          <CardConceptImage
            label="フォーマル"
            data={formalData}
            onClick={() => {}}
            positionStyle="ml-[400px]"
          />
        </div>
      </div>

      <div className="p-2 mt-1 bg-gray-100 rounded-xl">
        <Image src={GraphLg} alt={""} />
      </div>
    </div>
  );
};
