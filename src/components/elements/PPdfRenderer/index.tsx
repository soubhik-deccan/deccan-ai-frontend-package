// PPdfRenderer.tsx
import { usePdf } from "@mikecousins/react-pdf";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import PButton from "../PButton";
import { TPPdfRendererProps } from "./type";

// PPdfRenderer.tsx

const PPdfRenderer: React.FC<TPPdfRendererProps> = ({
  pdfUrl,
  onLoad,
  onError,
  showNavigation = true,
  showPageIndicator = true,
}) => {
  const [page, setPage] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { pdfDocument } = usePdf({
    file: pdfUrl,
    page,
    canvasRef,
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showNavigation) return;

      if (e.key === "ArrowLeft") {
        handlePreviousPageClick();
      } else if (e.key === "ArrowRight") {
        handleNextPageClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [page, pdfDocument, showNavigation]);

  const handlePreviousPageClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPageClick = () => {
    if (pdfDocument && page < pdfDocument.numPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="p-pdf-renderer__wrapper">
      {!pdfDocument ? (
        <div className="pdf-renderer-loading">Loading...</div>
      ) : (
        <>
          <canvas ref={canvasRef} className="p-pdf-renderer__canvas" />
          {pdfDocument.numPages > 0 && showNavigation && (
            <div className="pdf-renderer-navigation">
              <PButton
                variant="text"
                isOnlyIcon
                className="pdf-renderer-nav-button"
                disabled={page === 1}
                onClick={handlePreviousPageClick}
                aria-label="Previous page"
              >
                <ArrowLeft2 size="24" variant="Bold" />
              </PButton>

              {showPageIndicator && (
                <span className="pdf-renderer-navigation-text">
                  Page {page} of {pdfDocument.numPages}
                </span>
              )}

              <PButton
                variant="text"
                isOnlyIcon
                className="pdf-renderer-nav-button"
                disabled={page === pdfDocument.numPages}
                onClick={handleNextPageClick}
                aria-label="Next page"
              >
                <ArrowRight2 size="24" variant="Bold" />
              </PButton>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PPdfRenderer;
