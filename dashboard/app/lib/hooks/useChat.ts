// Stores
import { authStore } from '@/lib/stores';

// Interface
import { TUserInfo, useGetUserDetails } from '.';

// Firebase
import { collection, getDocs } from 'firebase/firestore';

// Services
import { getAllUserDetailsExceptWithId } from '@/lib/services';

// Constants
import { AUTHENTICATION_ROLE, FIREBASE_CHAT } from '@/lib/constants';
import { db } from '@/lib/utils';

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
export const getCurrentUser = async (user: TUserInfo) => {
  const userList = await getAllUserDetailsExceptWithId(user?.id);

  const adminInfo = userList.find(
    (userItem) => userItem.role === AUTHENTICATION_ROLE.SUPER_ADMIN,
  );

  if (adminInfo) {
    const adminUid = adminInfo?.uid;
    const userUid = user?.uid;
    return {
      roomChatId: `${adminUid}${userUid}`,
      userId: userUid || '',
      adminId: adminUid || '',
      avatarUrl: user?.avatarURL || '',
      avatarAdminUrl: adminInfo?.avatarURL || '',
      displayName: `${user?.firstName} ${user?.lastName} `,
    };
  }
};

export const getUserList = async (user: TUserInfo) => {
  const userList = await getAllUserDetailsExceptWithId(user?.id);

  return userList;
};

// Get user from database
export const getUsers = async () => {
  const usersCollection = collection(db, FIREBASE_CHAT.USERS);
  const usersSnapshot = await getDocs(usersCollection);

  const userList = usersSnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));

  const admin = userList.find(
    (user) => user.data.displayName === AUTHENTICATION_ROLE.SUPER_ADMIN,
  );

  if (admin) {
    const isAdmin = admin.data.uid;
    const isMember = userList[8]?.id;
    return {
      roomChatId: isAdmin + isMember,
      userId: isMember,
      adminId: isAdmin,
      listUserDetail: userList,
    };
  }
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
