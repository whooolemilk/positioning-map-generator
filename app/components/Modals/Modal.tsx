"use client";

import { useState } from "react";
import React from "react";
import { ConceptDataType } from "../Maps/Map";
import { Panel } from "../Panels";

type ModalProps = {
  close: () => void;
  data: ConceptDataType;

  // children: React.ReactNode;
};

export const Modal = ({ close, data }: ModalProps) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsMouseDown(true);
    }
  };

  const onMouseUp = () => {
    if (isMouseDown) {
      close();
    }
    setIsMouseDown(false);
  };

  return (
    <div
      className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] bg-slate-950/60 max-h-full"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <Panel data={data} close={close} />
    </div>
  );
};
