import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Loader2, AlertCircle, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

// Configure PDF.js worker
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
} catch (e) {
  console.warn('PDF.js worker initialization notice', e);
}

interface PdfCanvasViewerProps {
  pdfDataUrl: string;
  fileName?: string;
}

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({ pdfDataUrl, fileName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1.2);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  // Load PDF Document
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadPdf = async () => {
      try {
        let loadingTask: pdfjsLib.PDFDocumentLoadingTask;

        if (pdfDataUrl.startsWith('data:')) {
          // Convert data URI to Uint8Array for PDF.js stability
          const base64Part = pdfDataUrl.split(',')[1];
          const rawBinary = window.atob(base64Part);
          const rawLength = rawBinary.length;
          const array = new Uint8Array(new ArrayBuffer(rawLength));
          for (let i = 0; i < rawLength; i++) {
            array[i] = rawBinary.charCodeAt(i);
          }
          loadingTask = pdfjsLib.getDocument({ data: array });
        } else {
          loadingTask = pdfjsLib.getDocument(pdfDataUrl);
        }

        const doc = await loadingTask.promise;
        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error rendering PDF:', err);
        if (isMounted) {
          setError(err?.message || 'Failed to render PDF preview.');
          setLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isMounted = false;
    };
  }, [pdfDataUrl]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 overflow-hidden select-none">
      {/* Zoom and Navigation Sub-Toolbar */}
      <div className="px-4 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">
            {loading ? 'Loading pages...' : `${numPages} ${numPages === 1 ? 'Page' : 'Pages'}`}
          </span>
          {fileName && (
            <span className="hidden sm:inline-block text-slate-500 font-mono text-[11px] truncate max-w-xs">
              • {fileName}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setScale((prev) => Math.max(0.7, Number((prev - 0.15).toFixed(2))))}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] px-1 text-slate-300 min-w-[42px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setScale((prev) => Math.min(2.2, Number((prev + 0.15).toFixed(2))))}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setScale(1.2)}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer ml-1 border-l border-slate-800 pl-1.5"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Pages Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-8 flex flex-col items-center gap-6 bg-slate-900/90"
      >
        {loading && (
          <div className="flex flex-col items-center justify-center my-auto py-16 text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-sm font-medium">Preparing crisp PDF document preview...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center my-auto py-12 px-6 max-w-md text-center bg-slate-800/80 rounded-2xl border border-slate-700 text-slate-300 space-y-4">
            <AlertCircle className="w-10 h-10 text-amber-400" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Preview Notice</h4>
              <p className="text-xs text-slate-400">
                The document is ready for instant download using the button below.
              </p>
            </div>
            <a
              href={pdfDataUrl}
              download={fileName || 'Resume.pdf'}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF File</span>
            </a>
          </div>
        )}

        {!loading &&
          !error &&
          pdfDoc &&
          Array.from({ length: numPages }, (_, index) => (
            <PdfPageCanvas
              key={index + 1}
              pdfDoc={pdfDoc}
              pageNumber={index + 1}
              scale={scale}
            />
          ))}
      </div>
    </div>
  );
};

interface PdfPageCanvasProps {
  pdfDoc: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
  scale: number;
}

const PdfPageCanvas: React.FC<PdfPageCanvasProps> = ({ pdfDoc, pageNumber, scale }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendering, setRendering] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;
    let renderTask: any = null;

    const renderPage = async () => {
      try {
        setRendering(true);
        const page = await pdfDoc.getPage(pageNumber);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Support high-DPI displays
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          transform: transform,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;
        if (!isCancelled) {
          setRendering(false);
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error(`Error rendering page ${pageNumber}:`, err);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTask && renderTask.cancel) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, pageNumber, scale]);

  return (
    <div className="relative rounded-lg shadow-2xl overflow-hidden bg-white border border-slate-700/60 shrink-0">
      <canvas ref={canvasRef} className="block" />
      {rendering && (
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-xs flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
        </div>
      )}
    </div>
  );
};
