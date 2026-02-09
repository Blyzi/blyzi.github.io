import type { Metadata as NextMetadata } from "next";
import {
  Inter,
  Lato,
  Montserrat,
  Nunito,
  Open_Sans,
  Playfair_Display,
  Poppins,
  Raleway,
  Roboto,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify";
import rawMetadataConfig from "@/contents/metadata.json";
import type { FontOption, Metadata } from "@/lib/schemas";

const metadataConfig = rawMetadataConfig as Metadata;

export const metadata: NextMetadata = {
  title: metadataConfig.title,
  ...(metadataConfig.logo && {
    icons: {
      icon: metadataConfig.logo,
    },
  }),
};

const monaspaceNeon = localFont({
  src: [
    {
      path: "../../public/fonts/Monaspace-Neon/MonaspaceNeonNF-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monaspace-Neon/MonaspaceNeonNF-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monaspace-Neon/MonaspaceNeonNF-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monaspace-Neon/MonaspaceNeonNF-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Monaspace-Neon/MonaspaceNeonNF-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Monaspace-Neon/MonaspaceNeonNF-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-monaspace-neon",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});
const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const fontMap: Record<FontOption, { variable: string; className: string }> = {
  "monaspace-neon": monaspaceNeon,
  montserrat,
  roboto,
  "open-sans": openSans,
  lato,
  poppins,
  inter,
  raleway,
  nunito,
  "playfair-display": playfairDisplay,
};

const allFontVariables = Object.values(fontMap)
  .map((f) => f.variable)
  .join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const selectedFont = metadataConfig.font || "monaspace-neon";
  const activeFontFamily = `var(${fontMap[selectedFont].variable})`;

  return (
    <html lang="en" className={allFontVariables}>
      <body
        className="antialiased bg-gray-50 text-gray-900"
        style={{ fontFamily: activeFontFamily }}
        data-color-mode="light"
      >
        {children}
        <ToastContainer position="bottom-right" autoClose={5000} />
      </body>
    </html>
  );
}
