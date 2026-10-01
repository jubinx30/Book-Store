import { useSnackbar } from 'notistack';
import { MdOutlinePictureAsPdf } from 'react-icons/md';
import api from '../../api';

const ReadPdfButton = ({ book }) => {
  const { enqueueSnackbar } = useSnackbar();

  const openPdf = async () => {
    const pdfWindow = window.open('about:blank', '_blank');
    if (!pdfWindow) {
      enqueueSnackbar('Allow pop-ups to open the PDF.', { variant: 'warning' });
      return;
    }
    pdfWindow.opener = null;

    try {
      const response = await api.get(`/books/${book._id}/pdf`, { responseType: 'blob' });
      pdfWindow.location.href = URL.createObjectURL(response.data);
    } catch {
      pdfWindow.close();
      enqueueSnackbar('Could not open this PDF.', { variant: 'error' });
    }
  };

  const hasPdf = Boolean(book.pdf?.filename);

  return (
    <button
      type="button"
      className="shelf-read-pdf-button"
      disabled={!hasPdf}
      aria-label={hasPdf ? `Read PDF for ${book.title}` : `No PDF attached to ${book.title}`}
      title={hasPdf ? 'Read PDF' : 'No PDF attached'}
      onClick={openPdf}
    >
      <MdOutlinePictureAsPdf aria-hidden="true" />
    </button>
  );
};

export default ReadPdfButton;