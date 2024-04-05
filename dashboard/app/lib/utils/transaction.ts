import dayjs from 'dayjs';

// Types
import { TTransaction } from '@/lib/interfaces';

// Utils
import { formatDecimalNumber, formatUppercaseFirstLetter } from '.';

// Constants
import { IMAGES, TIME_FORMAT } from '../constants';

/**
 * Convert data show for home page
 * @param transactions
 * @returns
 */
export const formatTransactionResponse = (transactions: TTransaction[] = []) =>
  transactions.map((transaction) => {
    const {
      _id,
      customer,
      type,
      amount,
      currency,
      createdAt,
      paymentStatus,
      transactionStatus,
    } = transaction || {};
    const {
      customerId,
      avatar,
      firstName,
      lastName,
      address,
      email,
      role,
    } = customer || {};
    const { state = '', street = '', city = '', zip = 0 } = address || {};

    return {
      id: _id,
      name: formatUppercaseFirstLetter(`${firstName} ${lastName}`),
      customer: {
        customerId,
        avatar,
        firstName,
        lastName,
        address: { state, street, city, zip },
        email,
        role,
      },
      email,
      location: `${street} ${city}`,
      date: dayjs(createdAt).format(TIME_FORMAT),
      paymentStatus: formatUppercaseFirstLetter(paymentStatus),
      transactionStatus: formatUppercaseFirstLetter(transactionStatus),
      image: avatar || IMAGES.BIG_AVATAR.url,
      amount: `${currency}${formatDecimalNumber(+amount)}`,
      type,
    };
  });
