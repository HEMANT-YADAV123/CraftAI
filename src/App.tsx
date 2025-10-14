import { useState } from "react";
import { Navigation } from "./component/Navigation";
import { HomePage } from "./component/HomePage";
import { DemoPage } from "./component/DemoPage";
import { AboutUs } from "./component/AboutUs";
import { ContactUs } from "./component/ContactUs";

type PageType = "home" | "demo" | "about" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigateToDemo={() => setCurrentPage("demo")} />;
      case "demo":
        return <DemoPage onBack={() => setCurrentPage("home")} />;
      case "about":
        return <AboutUs onNavigate={(page: string) => setCurrentPage(page)} />;
      case "contact":
        return <ContactUs onNavigate={(page: string) => setCurrentPage(page)} />;
      default:
        return <HomePage onNavigateToDemo={() => setCurrentPage("demo")} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation
        currentPage={currentPage}
        onNavigate={(page: string) => setCurrentPage(page as PageType)}
      />

      {renderPage()}
    </div>
  );
}