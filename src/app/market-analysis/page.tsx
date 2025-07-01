import MarketAnalysisView from '@/components/market-analysis/market-analysis-view';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function MarketAnalysisPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow pt-20">
        <MarketAnalysisView />
      </main>
      <Footer />
    </div>
  );
}
