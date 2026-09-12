import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/useCart";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const {cartItemCount} = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-gray-950"
        >
          Nova<span className="text-gray-500">Cart</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Shop
          </Link>

          <Link
            to="/categories"
            className="text-sm font-medium text-gray-600 transition hover:text-black"
          >
            Categories
          </Link>
        </div>

        {/* Search */}
        <div className="hidden w-80 lg:block">
          <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 transition focus-within:border-gray-400 focus-within:bg-white">
            <span className="mr-3 text-gray-400">⌕</span>

            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Wishlist */}
          <button
            type="button"
            className="text-xl text-gray-600 transition hover:text-black"
            aria-label="Wishlist"
          >
            ♡
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-xl text-gray-600 transition hover:text-black"
            aria-label="Shopping cart"
          >
            🛒

            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
               {cartItemCount > 99 ? "99+" : cartItemCount}
            </span>
          </Link>

          {isAuthenticated ? (
            <>

             {/* Orders */}
    <Link
      to="/orders"
      className="hidden text-sm font-medium text-gray-600 transition hover:text-black md:block"
    >
      Orders
    </Link>
              {/* Account */}
              <Link
                to="/account"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-sm font-semibold text-gray-700 transition hover:border-black hover:bg-white"
                aria-label="Account"
              >
                A
              </Link>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="hidden text-sm font-medium text-gray-600 transition hover:text-black sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}