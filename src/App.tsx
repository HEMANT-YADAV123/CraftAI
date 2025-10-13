import { useState } from "react";
import { Navigation } from "./component/Navigation";
import { HomePage } from "./component/HomePage";
import { DemoPage } from "./component/DemoPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "demo">("home");

  return (
    <div className="min-h-screen">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={(page: string) => setCurrentPage(page as "home" | "demo")} 
      />
      
      {currentPage === "home" ? (
        <HomePage onNavigateToDemo={() => setCurrentPage("demo")} />
      ) : (
        <DemoPage onBack={() => setCurrentPage("home")} />
      )}
    </div>
  );
}
