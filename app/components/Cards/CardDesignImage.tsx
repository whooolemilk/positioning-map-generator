"use client";

import { useState } from "react";
import Empty from "@/app/assets/images/empty.png";
import Image from "next/image";
import { DesignDataType } from "@/app/components/Maps";
import { ModalDesign } from "@/app/components/Modals";

type CardDesignImageProps = {
  label: string;
  data?: DesignDataType;
  positionStyle: string;
};

export const CardDesignImage = ({
  label,
  data,
  positionStyle,
}: CardDesignImageProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div
      className={`${positionStyle} text-center
      ${!data?.images[0] && "invisible"}
      `}
    >
      <button className="relative w-20 h-20 flex" onClick={toggleModal}>
        <Image
          className="rounded-lg"
          src={data?.images[0] ? data?.images[0] : Empty}
          alt={label}
          fill
        />
      </button>
      <p className="font-bold text-xs py-1 bg-gray-100 text-slate-700">
        {label}
      </p>
      {isOpenModal && data && (
        <ModalDesign close={toggleModal} data={data}></ModalDesign>
      )}
    </div>
  );
};
