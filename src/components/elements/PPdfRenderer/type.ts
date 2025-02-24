export type TPPdfRendererProps = {
  pdfUrl: string;
  onLoad?: () => void;
  onError?: () => void;
  showNavigation?: boolean;
  showPageIndicator?: boolean;
};
