import { renderHook } from '@testing-library/react';
import useImageUploader from '../useImageUploader';

const mockUploadImage = jest.fn();

jest.mock('@/lib/services', () => ({
  uploadImage: jest.fn(),
}));

describe('useImageUploader', () => {
  const mockOnChange = jest.fn();
  const mockOnUploadError = jest.fn();
  const mockSetPreviewURL = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setUpHook = () => {
    const { result } = renderHook(() =>
      useImageUploader({
        onChange: mockOnChange,
        onUploadError: mockOnUploadError,
        setPreviewURL: mockSetPreviewURL,
      }),
    );
    return result;
  };

  it('should upload images and call onChange and setPreviewURL', async () => {
    const result = setUpHook();
    const files = [new File(['fake image'], 'image.png', { type: 'image/png' })];

    await act(async () => {
      result.current.onDrop(files);
    });

    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(mockSetPreviewURL).toHaveBeenCalledWith([]);
  });

  it('should handle file type validation error', async () => {
    const result = setUpHook();
    const files = [new File(['dashboard-page'], 'image.jpg', { type: 'text/plain' })];

    await act(async () => {
      result.current.onDrop(files);
    });

    expect(mockOnUploadError).toHaveBeenCalledWith('Update failed');
  });

  it('should upload image successfully', async () => {
    const result = setUpHook();
    const file = new File(['dashboard-page'], 'image.png', { type: 'image/png' });

    await act(async () => {
      result.current.onDrop([file]);
    });

    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(mockSetPreviewURL).toHaveBeenCalledWith([]);

    mockUploadImage.mockResolvedValueOnce('https://example.com/image.png');

    expect(mockOnChange).toHaveBeenCalledWith([]);
  });
});
