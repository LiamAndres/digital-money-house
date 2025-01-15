import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";


const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Regular (400) y Bold (700)
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={openSans.className}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
