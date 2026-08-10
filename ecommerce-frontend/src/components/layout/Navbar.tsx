import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-8 px-6">

        {/* Logo */}
        <Link
          to="/"
          className="shrink-0 text-2xl font-black tracking-tight text-slate-950"
        >
          Nova<span className="text-indigo-600">Cart</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Shop
          </Link>

          <a
            href="#categories"
            className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
          >
            Categories
          </a>
        </nav>

        {/* Search */}
        <div className="ml-auto hidden flex-1 md:block md:max-w-md">
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">

            <span className="text-lg text-slate-400">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">

          {/* Wishlist */}
          <button
            className="rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            aria-label="Wishlist"
          >
            <span className="text-xl">♡</span>
          </button>

          {/* Cart */}
          <button
            className="relative rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            aria-label="Shopping bag"
          >
            <span className="text-xl">🛍</span>

            <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
              0
            </span>
          </button>

          {/* Account */}
          <Link
            to="/login"
            className="rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
            aria-label="Account"
          >
            <span className="text-xl">◯</span>
          </Link>

          {/* Mobile menu */}
          <button
            className="ml-1 rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 md:hidden"
            aria-label="Menu"
          >
            <span className="text-xl">☰</span>
          </button>

        </div>
      </div>
    </header>
  );
}