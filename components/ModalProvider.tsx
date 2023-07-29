"use client";

import { useState, useEffect } from "react";

import ProModal from "@/components/ProModal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ProModal />
    </>
  );
}

export default ModalProvider;
