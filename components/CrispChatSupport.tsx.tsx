"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

function CrispChatSupport() {
  useEffect(() => {
    Crisp.configure("ab005aaa-75f4-43f4-92c5-81e08ea26ecc");
  }, []);
  return null;
}

export { CrispChatSupport };
