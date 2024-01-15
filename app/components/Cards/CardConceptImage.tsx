"use client";

import { useState } from "react";
import { ConceptDataType } from "@/app/components/Maps";
import { Modal } from "@/app/components/Modals";
import Empty from "@/app/assets/images/empty.png";
import Image from "next/image";

type CardConceptImageProps = {
  label: string;
  data?: ConceptDataType;
  onClick: () => void;
  positionStyle: string;
};

export const CardConceptImage = ({
  label,
  onClick,
  data,
  positionStyle,
}: CardConceptImageProps) => {
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
      <button className="w-20 h-20 flex" onClick={toggleModal}>
        <Image
          className="rounded-lg"
          src={data?.images[0] ? data?.images[0] : Empty}
          alt={label}
          width={80}
          height={80}
        />
      </button>
      <p className="font-bold text-xs py-1 bg-gray-100 text-slate-700">
        {label}
      </p>
      {isOpenModal && data && <Modal close={toggleModal} data={data}></Modal>}
    </div>
  );
};
