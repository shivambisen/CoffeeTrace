import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";

interface QRCodeCardProps {
  batchId: number;
  ipfsHash: string;
}

export const QRCodeCard = ({ batchId, ipfsHash }: QRCodeCardProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const url = `${window.location.origin}/batch/${batchId}`;

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      const dataUrl = await toPng(qrRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `coffee-batch-${batchId}-qr.png`;
      link.href = dataUrl;
      link.click();

      toast.success("QR code downloaded successfully!");
    } catch (error) {
      console.error("Failed to download QR code:", error);
      toast.error("Failed to download QR code");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow || !qrRef.current) return;

    const qrHtml = qrRef.current.innerHTML;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code - Batch #${batchId}</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              font-family: system-ui, -apple-system, sans-serif;
            }
            .print-container {
              text-align: center;
              padding: 2rem;
            }
            h2 { margin-bottom: 1rem; color: #2C1810; }
            .qr-wrapper { margin: 2rem 0; }
          </style>
        </head>
        <body>
          <div class="print-container">
            <h2>CoffeeTrace Batch #${batchId}</h2>
            <div class="qr-wrapper">${qrHtml}</div>
            <p>Scan to view batch details</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-cream border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Batch QR Code</CardTitle>
          <CardDescription className="text-muted-foreground">
            Scan to view complete batch traceability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div ref={qrRef} className="flex flex-col items-center gap-4 p-6 bg-background rounded-lg">
            <QRCodeSVG
              value={url}
              size={200}
              level="H"
              includeMargin
              bgColor="#FFFFFF"
              fgColor="#2C1810"
            />
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-foreground">Batch #{batchId}</p>
              <p className="text-xs text-muted-foreground font-mono break-all max-w-[200px]">
                {ipfsHash}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1 bg-primary text-primary-foreground">
              <Download className="h-4 w-4 mr-2" />
              Download QR
            </Button>
            <Button onClick={handlePrint} variant="outline" className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              Print Sticker
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
