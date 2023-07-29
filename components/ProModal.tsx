"use client";

import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/useProModal";
import { Badge } from "@/components/ui/badge";

import { tools } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

function ProModal() {
  const modal = useProModal();
  const [isLoading, setIsLoading] = useState(false);

  const onUpgrade = async () => {
    console.log("UPGRADE BUTTON CLICKED");
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");
      console.log(response, "STRIPE CLIENT RESPONSE");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong. Try agin later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-start gap-y-4 pb-2"></DialogTitle>
          <div className="flex items-center justify-center gap-x-2 font-bold py-1">
            Upgrade to Genius
            <Badge
              variant="premium"
              className="uppercase text-sm py-1 text-center"
            >
              pro
            </Badge>
          </div>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-black/5 flex items-center justify-between shadow-md"
              >
                <div className="flex items-center gap-x-4  ">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check color="green" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onUpgrade}
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProModal;
