// Libs
import { useMutation } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';

// Types
import { IUploadImageResponse } from '@/lib/interfaces';

// Constants
import {
  ERROR_MESSAGES,
  LIMIT_PRODUCT_IMAGES,
  REGEX,
  SEARCH_PARAM,
  STATUS,
} from '@/lib/constants';

// Utils
import { customToast } from '@/lib/utils';

// Services
import { uploadImageHttpService } from '@/lib/services';

export const useUploadImages = () => {
  const { mutate: uploadImages, ...rest } = useMutation({
    mutationFn: async (payloads: FormData[]) =>
      Promise.all(
        payloads.map((item) =>
          uploadImageHttpService.post<IUploadImageResponse>({
            path: '',
            data: item,
            configs: {
              params: { key: SEARCH_PARAM.UPLOAD_IMAGE },
            },
          }),
        ),
      ),
  });

  return { ...rest, uploadImages };
};

export const useUploadProductImageFiles = (imageURLs: string[] = []) => {
  const [previewURLs, setPreviewURL] = useState<string[]>(imageURLs || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isImagesDirty, setIsImagesDirty] = useState(false);

  const toast = useToast();

  const handleShowErrorMessage = useCallback(
    (message: string) => {
      toast(customToast('', message, STATUS.ERROR));
    },
    [toast],
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      const updatedImages = [...previewURLs];
      updatedImages.splice(index, 1);

      setPreviewURL(updatedImages);
      setIsImagesDirty(true);
    },
    [previewURLs],
  );

  const handleFilesChange = useCallback(
    (files: File[]) => {
      const imagesPreview: React.SetStateAction<string[]> = [];

      if (files.length > LIMIT_PRODUCT_IMAGES) {
        return handleShowErrorMessage(ERROR_MESSAGES.UPLOAD_IMAGE_ITEM);
      }

      files.map(async (file) => {
        if (!file) {
          return;
        }

        // Check type of image
        if (!REGEX.IMG.test(file.name)) {
          return handleShowErrorMessage(ERROR_MESSAGES.UPLOAD_IMAGE);
        }

        const previewImage: string = URL.createObjectURL(file);
        imagesPreview.push(previewImage);
      });

      setImageFiles(files);
      setPreviewURL(imagesPreview);
      setIsImagesDirty(true);
    },
    [handleShowErrorMessage],
  );

  const onDrop = (acceptedFiles: File[]) => handleFilesChange(acceptedFiles);

  const { getRootProps, getInputProps, isFileDialogActive } = useDropzone({
    onDrop,
  });

  return {
    getRootProps,
    getInputProps,
    handleRemoveImage,
    isFileDialogActive,
    previewURLs,
    imageFiles,
    isImagesDirty,
  };
};
