// Libs
import { useMutation } from '@tanstack/react-query';

// Types
import { IUploadImageResponse } from '@/lib/interfaces';

// Constants
import { SEARCH_PARAM } from '@/lib/constants';

// Services
import { uploadImageHttpService } from '@/lib/services';

export const useUploadImage = () => {
  const { mutate: uploadImage, ...rest } = useMutation({
    mutationFn: async (payload: FormData) =>
      await uploadImageHttpService.post<IUploadImageResponse>({
        path: '',
        data: payload,
        configs: {
          params: { key: SEARCH_PARAM.UPLOAD_IMAGE },
        },
      }),
  });

  return { ...rest, uploadImage };
};
