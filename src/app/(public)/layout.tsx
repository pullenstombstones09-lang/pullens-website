import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppBar } from "@/components/layout/whatsapp-bar";
import { TrackingScripts } from "@/components/seo/tracking-scripts";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema } from "@/components/seo/schemas";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TrackingScripts />
      <JsonLd data={organizationSchema()} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppBar />
    </>
  );
}
