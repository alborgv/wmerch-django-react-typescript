import { ReactNode } from "react";

import Navbar from '../Navbar/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 h-screen overflow-hidden">
      <div className="flex-grow overflow-auto">
        <Navbar />
        <div className="grid grid-cols-1">
          {children}
        </div>
      </div>
    </div>
  );
}
