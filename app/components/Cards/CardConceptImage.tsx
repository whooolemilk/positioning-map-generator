"use client";

import { useState } from "react";
import { ConceptDataType } from "../Maps/Map";
import { Modal } from "../Modals";
import { Panel } from "../Panels";

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

  // const newData: ConceptDataType = {
  //   concept: "romantic",
  //   catchphrase:
  //     "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。",
  //   description:
  //     "テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。",
  //   images: [
  //     "https://i.pinimg.com/564x/38/1a/b9/381ab970f3fd781e6cf8f86e16cbbc0e.jpg",
  //     "https://i.pinimg.com/564x/38/1a/b9/381ab970f3fd781e6cf8f86e16cbbc0e.jpg",
  //     // "https://i.pinimg.com/564x/38/1a/b9/381ab970f3fd781e6cf8f86e16cbbc0e.jpg",
  //     // "https://i.pinimg.com/564x/38/1a/b9/381ab970f3fd781e6cf8f86e16cbbc0e.jpg",
  //     // "https://i.pinimg.com/564x/38/1a/b9/381ab970f3fd781e6cf8f86e16cbbc0e.jpg",
  //   ],
  // };

  return (
    <div
      className={`${positionStyle} text-center
      ${!data?.images[0] && "invisible"}
      `}
    >
      <button className="w-20 h-20 flex" onClick={toggleModal}>
        <img
          className="rounded-lg"
          src={data?.images[0] ? data?.images[0] : undefined}
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
