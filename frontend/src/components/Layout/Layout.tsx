import { ReactNode } from "react";

import Navbar from '../Navbar/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 h-screen overflow-hidden bg-black">
      <div className="flex-grow overflow-auto">
        <Navbar />
        <div className="grid grid-cols-1 mt-16 md:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
