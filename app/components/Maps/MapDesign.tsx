"use client";

import Image from "next/image";
import { useMemo } from "react";
import GraphLg from "@/app/assets/images/graph-lg.png";
import { CardDesignImage } from "@/app/components/Cards";
import { generatedConceptType } from "@/app/api/concept/route";

// export type DesignDataType = generatedConceptType & {
//   images: string[];
// };

export type DesignDataType = Pick<generatedConceptType, "concept"> & {
  catchphrase: string[];
  description: string[];
  visual: string[];
  images: string[];
};

type MapDesignProps = {
  data: DesignDataType[];
};

export const MapDesign = ({ data }: MapDesignProps) => {
  const romanticData = useMemo(() => {
    return data.find((item) => item.concept === "romantic");
  }, [data]);

  const prettyData = useMemo(
    () => data.find((item) => item.concept === "pretty"),
    [data]
  );

  const clearData = useMemo(
    () => data.find((item) => item.concept === "clear"),
    [data]
  );

  const casualData = useMemo(
    () => data.find((item) => item.concept === "casual"),
    [data]
  );

  const naturalData = useMemo(
    () => data.find((item) => item.concept === "natural"),
    [data]
  );

  const elegantData = useMemo(
    () => data.find((item) => item.concept === "elegant"),
    [data]
  );

  const coolData = useMemo(
    () => data.find((item) => item.concept === "cool"),
    [data]
  );

  const dynamicData = useMemo(
    () => data.find((item) => item.concept === "dynamic"),
    [data]
  );

  const gorgeousData = useMemo(
    () => data.find((item) => item.concept === "gorgeous"),
    [data]
  );

  const sicData = useMemo(
    () => data.find((item) => item.concept === "sic"),
    [data]
  );

  const wildData = useMemo(
    () => data.find((item) => item.concept === "wild"),
    [data]
  );

  const classicData = useMemo(
    () => data.find((item) => item.concept === "classic"),
    [data]
  );

  const dandyData = useMemo(
    () => data.find((item) => item.concept === "dandy"),
    [data]
  );

  const modernData = useMemo(
    () => data.find((item) => item.concept === "modern"),
    [data]
  );

  const formalData = useMemo(
    () => data.find((item) => item.concept === "formal"),
    [data]
  );

  return (
    <div className="mt-10 mb-4">
      <p className="text-md font-bold text-gray-900">ポジショニングマップ</p>
      <div className="absolute w-full">
        <div className="flex justify-center">
          <CardDesignImage
            label="ロマンチック"
            data={romanticData}
            positionStyle="mt-[70px]"
          />
        </div>
        <div className="flex mt-[-90px]">
          <CardDesignImage
            label="プリティ"
            data={prettyData}
            positionStyle="ml-[140px]"
          />
          <CardDesignImage
            label="クリア"
            data={clearData}
            positionStyle="ml-[300px] "
          />
        </div>
        <div className="flex">
          <CardDesignImage
            label="カジュアル"
            data={casualData}
            positionStyle="ml-[90px]"
          />
          <CardDesignImage
            label="ナチュラル"
            data={naturalData}
            positionStyle="ml-[20px]"
          />
        </div>
        <div className="flex mt-[-30px]">
          <CardDesignImage
            label="エレガント"
            data={elegantData}
            positionStyle="ml-[340px]"
          />
          <CardDesignImage
            label="クール"
            data={coolData}
            positionStyle="ml-[145px]"
          />
        </div>
        <div className="flex mt-[-74px]">
          <CardDesignImage
            label="ダイナミック"
            data={dynamicData}
            positionStyle="ml-[90px]"
          />
          <CardDesignImage
            label="ゴージャス"
            data={gorgeousData}
            positionStyle="ml-[20px]"
          />
          <CardDesignImage
            label="シック"
            data={sicData}
            positionStyle="ml-[180px]"
          />
        </div>
        <div className="flex">
          <CardDesignImage
            label="ワイルド"
            data={wildData}
            positionStyle="ml-[120px]"
          />
          <CardDesignImage
            label="クラシック"
            data={classicData}
            positionStyle="ml-[20px]"
          />
          <CardDesignImage
            label="ダンディ"
            data={dandyData}
            positionStyle="ml-[140px]"
          />
          <CardDesignImage
            label="モダン"
            data={modernData}
            positionStyle="ml-[20px]"
          />
        </div>
        <div className="flex">
          <CardDesignImage
            label="フォーマル"
            data={formalData}
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
