import { useEffect } from "react";
import LayoutFooter from "../templates/LayoutFooter";
import feather from "feather-icons";
import "devicon/devicon.min.css";

export default function Footer() {
  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <footer className="w-full bg-[#ffff] text-gray-50 mt-12 border-t-2 border-[#5e6973]">
      <LayoutFooter />
      {/* Footer Bottom */}
      <div className="border-t border-[var(--Blue-Slate--)] py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[var(--Nvidia--)] text-sm">
            © 2026 Central GPU. All rights reserved.
          </p>

          <p className="text-[var(--Nvidia--)] text-sm">
            Made with by Central GPU Team
          </p>
        </div>
      </div>
    </footer>
  );
}
