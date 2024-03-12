import { useCallback } from 'react';

// Constants
import { ERROR_MESSAGES, LIMIT_PRODUCT_IMAGES, REGEX } from '@/lib/constants';

// Services
import { uploadImage } from '@/lib/services';

interface ImageUploaderProps {
  onChange: (imagesUpload: string[]) => void;
  onUploadError: (errorMessage: string) => void;
  setPreviewURL: React.Dispatch<React.SetStateAction<string[]>>;
}

export const useImageUploader = ({
  onChange,
  onUploadError,
  setPreviewURL,
}: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imagesPreview: React.SetStateAction<string[]> = [];
      const imagesUpload: string[] = [];

      if (acceptedFiles.length > LIMIT_PRODUCT_IMAGES) {
        return onUploadError(ERROR_MESSAGES.UPLOAD_IMAGE_ITEM);
      }

      acceptedFiles.map(async (file) => {
        if (!file) {
          return;
        }

        // Check type of image
        if (!REGEX.IMG.test(file.name)) {
          return onUploadError(ERROR_MESSAGES.UPLOAD_IMAGE);
        }

        // Uploading file
        try {
          onChange([]);
          const previewImage: string = URL.createObjectURL(file);
          const formData = new FormData();

          formData.append('image', file);
          imagesPreview.push(previewImage);

          const result = await uploadImage(formData);
          imagesUpload.push(result);
        } catch (error) {
          onUploadError(ERROR_MESSAGES.UPDATE_FAIL.title);
        }
        setPreviewURL(imagesPreview);
      });

      onChange(imagesUpload);
    },
    [onChange, onUploadError, setPreviewURL],
  );

  return { onDrop };
};

export default useImageUploader;
