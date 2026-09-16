import React from "react";
import { LiquidPreloader } from "@/components/ui/LiquidPreloader";

export default function Loading() {
  return <LiquidPreloader minDurationMs={1200} />;
}
