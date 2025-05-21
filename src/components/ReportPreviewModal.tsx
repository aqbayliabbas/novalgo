import React from 'react';
import { PDFStylePreview } from './ReportPreviewPDF';

interface ReportPreviewModalProps {
  open: boolean;
  onClose: () => void;
  projectInfo: any;
  evaluation: any;
  scoreResult: any;
  previewId?: string;
}

const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({ open, onClose, projectInfo, evaluation, scoreResult, previewId }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-0 relative max-h-[85vh] overflow-y-auto"
        id={previewId || undefined}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Fermer l'aperçu"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <PDFStylePreview projectInfo={projectInfo} evaluation={evaluation} scoreResult={scoreResult} />
      </div>
    </div>
  );
};

export default ReportPreviewModal;
