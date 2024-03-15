export const REGEX = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
  PHONE_NUMBER: /^\+?[0-9][0-9]{7,14}$/,
  LENGTH_IS_EIGHT: /^.{8,}$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
  IMG: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
  ZIP_CODE: /^\d{5}$/,
  AMOUNT_PATTERN: /^[0-9]*$/,
  DECIMAL_PATTERN: /^\d*(\.\d{0,2})?$/,
  FORMAT_MONEY: /(\d)(?=(\d{3})+(?!\d))/,
  URL: /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+([^\s]*)$/i,
  FORMAT_NUMBER: /[^\d.-]/g,
};
