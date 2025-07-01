
import ListingDetailView from '@/components/listings/listing-detail-view';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow pt-24 md:pt-32">
        <ListingDetailView zpid={params.id} />
      </main>
      <Footer />
    </div>
  );
}
