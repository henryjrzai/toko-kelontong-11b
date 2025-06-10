import Header from "@/app/ui/components/Header";
import Footer from "@/app/ui/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
            {children}
        </main>
      <Footer />
    </div>
  );
}
