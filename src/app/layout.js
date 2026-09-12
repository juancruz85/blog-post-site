import "./globals.css";
import Link from "next/link";
import NavLinks from "../components/NavLinks";
import { getCurrentUserId } from "../lib/posts";

export const metadata = {
  title: "Mars Corn Blog",
  description: "A Blog Project",
};

export default async function RootLayout({ children }) {
  const currentUserId = await getCurrentUserId();

  return (
    <html lang="en">
      <body>
        <div className="ios-app">
          <header className="ios-navbar">
            <div className="navbar-gloss"></div>

            <div className="navbar-content">
              <Link href="/" className="nav-title">
                A Blog
              </Link>

              <NavLinks isLoggedIn={Boolean(currentUserId)} />
            </div>
          </header>

          <main className="main-container">{children}</main>

          <footer className="ios-footer">
            <p>© {new Date().getFullYear()} My Blog</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
