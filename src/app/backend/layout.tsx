import Layoutbackend from "@/components/backend/layout/layoutbackend";
import HandleMiddleware from "@/middleware/handlemiddleware";
import React from "react";
type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  await HandleMiddleware(["admin", "operator"]);
  return (
    <div className="min-h-screen bg-gray-300">
      <Layoutbackend>{children}</Layoutbackend>
    </div>
  );
}
