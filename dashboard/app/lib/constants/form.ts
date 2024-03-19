import { ERROR_MESSAGES } from './messages';
import { REGEX } from './regex';

export const AUTH_SCHEMA = {
  FIRST_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('First Name'),
  },
  LAST_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Last Name'),
  },
  STREET: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Street'),
  },
  STATE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('State'),
  },
  CITY: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('City'),
  },
  EMAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.EMAIL_INVALID,
    },
  },
  PASSWORD: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Password'),
  },
  CONFIRM_PASSWORD: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Confirm password'),
    validate: (val: string, { password }: { password: string }) => {
      if (password && val !== password) {
        return ERROR_MESSAGES.PASSWORD_NOT_MATCH;
      }
    },
  },
  REMEMBER_ME: {
    required: false,
  },
  AGREE_POLICY: {
    validate: (
      value: boolean,
      //eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
      { isAcceptPrivacyPolicy: __, ...fieldValues }: any,
    ) => Object.values(fieldValues).every((value) => value) && value,
  },

  PHONE_NUMBER: {
    pattern: {
      value: REGEX.PHONE_NUMBER,
      message: ERROR_MESSAGES.PHONE_NUMBER_INVALID,
    },
  },

  AVATAR_URL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Avatar'),
    pattern: {
      value: REGEX.IMG,
      message: ERROR_MESSAGES.UPLOAD_IMAGE,
    },
  },

  FACEBOOK: {
    pattern: {
      value: REGEX.URL,
      message: ERROR_MESSAGES.FACEBOOK_INVALID,
    },
  },

  TWITTER: {
    pattern: {
      value: REGEX.URL,
      message: ERROR_MESSAGES.TWITTER_INVALID,
    },
  },

  LINKEDIN: {
    pattern: {
      value: REGEX.URL,
      message: ERROR_MESSAGES.LINKEDIN_INVALID,
    },
  },

  YOUTUBE: {
    pattern: {
      value: REGEX.URL,
      message: ERROR_MESSAGES.YOUTUBE_INVALID,
    },
  },

  ZIP_CODE: {
    pattern: {
      value: REGEX.ZIP_CODE,
      message: ERROR_MESSAGES.ZIP_CODE_INVALID,
    },
  },

  PIN_CODE: {
    required: true,
    validate: (value: string) => value.length === 4,
  },

  TRANSFER_AMOUNT: {
    required: true,
    validate: (value: string) => !!value.length && !isNaN(+value),
  },
  OLD_PASSWORD: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Old password'),
  },
  NEW_PASSWORD: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('New password'),
    validate: (value: string) => {
      if (!REGEX.LENGTH_IS_EIGHT.test(value)) {
        return ERROR_MESSAGES.PASS_WORD_SHORT;
      }

      if (!REGEX.PASSWORD.test(value)) {
        return ERROR_MESSAGES.PASS_WORD_WEAK;
      }

      return true;
    },
  },

  NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Name'),
  },

  AMOUNT: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Amount'),
    validate: (value: string) => {
      if (Number(value) <= 0) {
        return ERROR_MESSAGES.AMOUNT_INVALID;
      }
      if (!REGEX.LIMIT_NUMBER.test(value)) {
        return ERROR_MESSAGES.LIMIT_AMOUNT;
      }

      return true;
    },
  },

  QUANTITY: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Quantity'),
    validate: (value: string) => {
      if (Number(value) < 0) {
        return ERROR_MESSAGES.QUANTITY_INVALID;
      }
      if (!REGEX.LIMIT_NUMBER.test(value)) {
        return ERROR_MESSAGES.LIMIT_QUANTITY;
      }

      return true;
    },
  },

  GALLERY_THUMBNAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Gallery Thumbnail'),
  },
};
