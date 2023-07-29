"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPro: boolean;
}

function SubscriptionButton({ isPro = false }: SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleSubscriptionStatusClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong. Try agin later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button
        disabled={loading}
        variant={isPro ? "default" : "premium"}
        onClick={handleSubscriptionStatusClick}
      >
        {isPro ? "Manage Subscription" : "Upgrade"}
        {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
      </Button>
    </div>
  );
}

export default SubscriptionButton;
