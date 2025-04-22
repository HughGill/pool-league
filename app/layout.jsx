import "@/assets/styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "North Inishowen Pool League",
  description: "North Inishowen Pool League",
  keywords:
    "pool-league, north-inishowen, near-you, north, inishowen, pool, league",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Navbar />
          <main>
            <div className="container">{children}</div>
          </main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
