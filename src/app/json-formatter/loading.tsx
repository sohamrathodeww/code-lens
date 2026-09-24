import React from "react";
import { LiquidPreloader } from "@/components/ui/LiquidPreloader";

export default function JsonViewerLoading() {
  return <LiquidPreloader minDurationMs={1000} />;
}
