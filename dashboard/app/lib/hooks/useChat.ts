import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

// Constants
import { AUTHENTICATION_ROLE, FIREBASE_CHAT } from '@/lib/constants';

// Stores
import { authStore } from '@/lib/stores';

// Firebase
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

// Utils
import { db } from '@/lib/utils';

// Service
import { getAdminDetailsWithId } from '../services';

// Mocks
import { MOCK_SUPER_ADMIN } from '../mocks';

// Interface
import { TUserInfo, useGetUserDetails } from '.';
import { TMessages } from '@/lib/interfaces';

// TODO: if have real id from firestore
export const useGetRoomChat = () => {
  const user = authStore((state) => state.user);
  const { filterDataUser } = useGetUserDetails(user?.id || '');

  const isAdmin = filterDataUser?.find(
    (user) => user.role === AUTHENTICATION_ROLE.SUPER_ADMIN,
  );

  const adminUserId = isAdmin?._id;
  const comBindIdChat = `${user?.id || ''}${adminUserId}`;
  return comBindIdChat;
};

// Author: Loc Vo
export const getInfoRoomChat = async (user: TUserInfo) => {
  const admin = await getAdminDetailsWithId(user?.id);
  const userUid = user?.uid;

  return {
    roomChatId: `${admin.uid}${userUid}`,
    userId: userUid || '',
    adminId: admin.uid || '',
    avatarUrl: user?.avatarURL || '',
    avatarAdminUrl: MOCK_SUPER_ADMIN?.avatarURL || '',
    displayName: `${user?.firstName} ${user?.lastName} `,
  };
};

export const getLists = async () => {
  const usersCollection = collection(db, FIREBASE_CHAT.USER_CHATS);
  const usersSnapshot = await getDocs(usersCollection);

  const chatList = usersSnapshot.docs
    .map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
    .map((item) => Object.values(item.data)[0]) as [];

  return {
    chatList,
  };
};

export const useSubscribeToChat = (
  roomId: string,
  setMessages: Dispatch<SetStateAction<TMessages[]>>,
  boxRef?: MutableRefObject<HTMLDivElement | null>,
) => {
  useEffect(() => {
    if (!roomId) return;

    const unSub = onSnapshot(
      doc(db, FIREBASE_CHAT.CHATS, roomId),
      async (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      },
    );

    if (boxRef?.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }

    return () => {
      unSub();
    };
  }, [setMessages, roomId, boxRef]);
};
