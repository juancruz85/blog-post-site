import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Company, Inc",
  description: "Company, Inc does business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          :root {
            --bg: #000000;
            --card: #111111;
            --muted: #bbbbbb;
            --accent:rgb(59, 79, 255);
            --glass: rgba(255, 255, 255, 0.03);
            --radius: 14px;
            --maxw: 1100px;
            color-scheme: dark;
            font-family: "Times New Roman", serif;
          }

          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            background: linear-gradient(180deg, #000 0%, #1a0000 40%);
            background-color: #1a0000;
            background-repeat: no-repeat;
            background-size: cover;
            color: #f1f1f1;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
          }
          .wrap {
            width: 100%;
            max-width: var(--maxw);
          }

          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 28px;
          }
          .logo {
            display: flex;
            gap: 12px;
            align-items: center;
          }
          .logo .mark {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: var(--accent);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #000;
          }
          nav a {
            color: var(--muted);
            text-decoration: none;
            font-weight: bold;
            margin-left: 14px;
          }
          nav a:hover {
            color: var(--accent);
          }

          /* HERO */
          .hero {
            display: grid;
            grid-template-columns: 1fr 360px;
            gap: 28px;
            align-items: center;
            margin-bottom: 28px;
          }
          .intro {
            background: var(--card);
            padding: 28px;
            border-radius: var(--radius);
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
          }
          h1 {
            margin-top: 0;
            font-size: 30px;
          }

          .btn {
            background: var(--accent);
            color: #fff;
            border: none;
            padding: 10px 14px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
          }
          .btn.secondary {
            background: transparent;
            border: 1px solid #333;
          }

          .card {
            background: var(--card);
            padding: 18px;
            border-radius: 12px;
          }
          .photo img {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
            display: block;
          }

          /* MAIN GRID */
          main {
            display: grid;
            grid-template-columns: 1fr 320px;
            gap: 24px;
          }

          section {
            background: var(--glass);
            padding: 18px;
            border-radius: 12px;
          }

          /* PROJECTS */
          .projects {
            display: grid;
            gap: 12px;
          }
          .project {
            display: flex;
            gap: 12px;
            padding: 10px;
            background: #1a0000;
            border-radius: 10px;
          }

          img {
            max-width: 100%;
            height: auto;
          }

          @media (max-width: 900px) {
            .hero {
              grid-template-columns: 1fr;
            }
            main {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 650px) {
            header {
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
            }
            nav {
              display: flex;
              flex-direction: column;
              gap: 10px;
              padding-left: 4px;
            }
            nav a {
              margin: 0;
              font-size: 18px;
            }
            h1 {
              font-size: 26px;
            }
            section {
              padding: 14px;
            }
            body {
              padding: 20px 12px;
            }
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
