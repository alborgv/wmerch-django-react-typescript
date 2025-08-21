import { useState, useRef, useEffect } from "react";
import Logo from "../../assets/Logo_W_Merch_cropped_400x@2x.png";
import { Menu, X, Search, Home, ShoppingBag, Phone } from "lucide-react";
import { useMerchContext } from "context/MerchContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // menú mobile
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const { getAllMerch } = useMerchContext();
  const [dataMerch, setMerch] = useState<any[]>([]);

  useEffect(() => {
    const fetchMerch = async () => {
      const res = await getAllMerch();
      setMerch(res);
    };
    fetchMerch();
  }, [getAllMerch]);

  const toggleSearchBar = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  useEffect(() => {
    setFilteredItems(
      dataMerch.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, dataMerch]);

  return (
    <nav className="shadow-sm w-full fixed top-0 z-50 md:relative">
      <div className="bg-black px-6 md:px-24 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className={`h-8 inline ${isVisible ? "hidden" : ""}`} />
        </Link>
        <ul className="hidden md:flex flex-grow justify-center space-x-8">
          <li>
            <Link
              to="/"
              className="font-libre text-lg text-white hover:text-gray-400"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/collections"
              className="font-libre text-lg text-white hover:text-gray-400"
            >
              Catálogo
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="font-libre text-lg text-white hover:text-gray-400"
            >
              Contacto
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <div ref={searchBarRef} className="flex items-center relative">
            <div
              className={`flex items-center bg-transparent rounded-xl transition-all duration-300 ease-in-out ${
                isVisible ? "border-opacity-25 border-gray-300" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Buscar..."
                className={`px-4 py-2 bg-transparent rounded-l-xl transition-all duration-300 ease-in-out focus:outline-none 
                  text-white border-b
                  ${isVisible ? "w-64 opacity-100" : "w-0 opacity-0"}`}
                style={{
                  overflow: "hidden",
                  transition: "all 0.3s ease-in-out",
                }}
                onFocus={() => setIsVisible(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="px-2 py-2 text-white focus:outline-none"
                onClick={toggleSearchBar}
              >
                <Search size={24} />
              </button>
            </div>

            {isVisible && (
              <div
                onClick={() => window.location.reload()}
                className="absolute z-20 left-0 top-full w-full bg-white shadow-lg rounded mt-2 transition-all duration-400 ease-in-out max-h-60 overflow-y-auto cursor-pointer"
              >
                {filteredItems.slice(0, 5).map((item) => (
                  <Link
                    to={`/collections/${item.id}`}
                    key={item.id}
                    className="flex items-center p-2 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <img
                      src={item.images?.[0]?.image || ""}
                      alt={item.name}
                      className="h-12 w-12 mr-2"
                    />
                    <div>
                      <h4 className="text-black">{item.name}</h4>
                      <p className="text-gray-600">
                        {`$${Number(item.price).toLocaleString("en-US")}`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menú mobile con fondo animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: -2 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:hidden bg-black px-6 py-6 space-y-6 shadow-lg"
          >
            <Link
              to="/"
              className="flex items-center gap-2 font-libre text-lg text-white hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} /> Inicio
            </Link>
            <Link
              to="/collections"
              className="flex items-center gap-2 font-libre text-lg text-white hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag size={20} /> Catálogo
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 font-libre text-lg text-white hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              <Phone size={20} /> Contacto
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
