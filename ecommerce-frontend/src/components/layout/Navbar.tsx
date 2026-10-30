import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/useCart";


export default function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const closeMenu = () => setMobileOpen(false);
  const handleLogout = () => { logout(); closeMenu(); navigate("/"); };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    if (query) navigate(`/products?search=${encodeURIComponent(query)}`);
    else navigate("/products");
    closeMenu();
  };

  return (
    <>
      <div className="nc-topline"><span>A little something good, delivered.</span><span>THOUGHTFUL FINDS. EVERYDAY JOY. <b aria-hidden="true">↗</b></span></div>
      <header className="nc-nav">
        <nav className="nc-nav__inner" aria-label="Main navigation">
          <button type="button" className="nc-nav__mobile-toggle" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(value => !value)}>{mobileOpen ? "×" : "☰"}</button>
          <Link to="/" className="nc-wordmark" onClick={closeMenu}>nova<span>cart</span><i aria-hidden="true">✳</i></Link>
          <div className="nc-nav__links">
            <Link to="/">Discover</Link><Link to="/products">Shop all</Link><Link to="/#new-arrivals">The edit</Link>
            {isAdmin && <Link to="/admin/products">Studio <span className="nc-admin-pill">ADMIN</span></Link>}
          </div>
          <form className="nc-nav__search" onSubmit={submitSearch} role="search">
            <span aria-hidden="true">⌕</span><input aria-label="Search products" value={search} onChange={event => setSearch(event.target.value)} placeholder="Find something good..." /><button aria-label="Submit search" type="submit">↗</button>
          </form>
          <div className="nc-nav__tools">
            {isAuthenticated ? <Link to="/orders" className="nc-nav__orders">Orders</Link> : <Link to="/login" className="nc-nav__login">Sign in <span aria-hidden="true">↗</span></Link>}
            <Link to="/cart" className="nc-nav__bag" aria-label={`Shopping bag, ${cartItemCount} items`}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M5.5 8.5h13l1 12h-15l1-12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg><b>{cartItemCount > 99 ? "99+" : cartItemCount}</b></Link>
            {isAuthenticated && <Link to="/account" className="nc-nav__account" aria-label="Account">A</Link>}
            {isAuthenticated && <button type="button" onClick={handleLogout} className="nc-nav__logout">Logout</button>}
          </div>
        </nav>
        {mobileOpen && <div className="nc-mobile-menu"><Link to="/" onClick={closeMenu}>Discover <span>↗</span></Link><Link to="/products" onClick={closeMenu}>Shop all <span>↗</span></Link><Link to="/#new-arrivals" onClick={closeMenu}>The edit <span>↗</span></Link>{isAuthenticated && <Link to="/orders" onClick={closeMenu}>Your orders <span>↗</span></Link>}{isAdmin && <Link to="/admin/products" onClick={closeMenu}>Admin studio <span>↗</span></Link>}{!isAuthenticated && <Link to="/login" onClick={closeMenu}>Sign in <span>↗</span></Link>}{isAuthenticated && <button type="button" onClick={handleLogout}>Log out <span>↗</span></button>}<form className="nc-mobile-search" onSubmit={submitSearch}><span aria-hidden="true">⌕</span><input aria-label="Search products" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search the collection" /></form></div>}
      </header>
    </>
  );
}
