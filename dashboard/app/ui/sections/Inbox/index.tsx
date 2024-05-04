'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Text,
  Flex,
  Grid,
  GridItem,
  useBreakpointValue,
  useToast,
  Hide,
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import {
  ChatMember,
  Conversation,
  EditIcon,
  FallbackImage,
} from '@/ui/components';

// Constants
import { ERROR_MESSAGES, FIREBASE_CHAT, IMAGES, STATUS } from '@/lib/constants';

// Hooks
import { useGetUserDetails, useSubscribeToChat } from '@/lib/hooks';

// Store
import { authStore } from '@/lib/stores';

// Utils
import { convertTimeMessage, customToast, db } from '@/lib/utils';

// Firebase
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';

// Interfaces
import { TMessages } from '@/lib/interfaces';

// Themes
import { useColorfill } from '@/ui/themes/bases';

const ChatMemberList = () => {
  const { primary } = useColorfill();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [chats, setChats] = useState<DocumentData>();
  const [messages, setMessages] = useState<TMessages[]>([]);
  const [userInfo, setUserInfo] = useState({
    roomChatId: '',
    userName: '',
    adminUid: '',
    avatar: '',
    openRoom: false,
  });

  const { user: superAdmin } = authStore((state) => state);
  const { uid: superAdminUid = '', id: superAdminId = '' } = superAdmin || {};
  const uidUser = searchParams?.get('id') as string;

  const { filterDataUser } = useGetUserDetails(superAdminId);
  const userChat = filterDataUser?.find((user) => user.uid === uidUser);
  const toast = useToast();

  const {
    openRoom = false,
    userName = '',
    avatar = '',
    adminUid = '',
  } = userInfo || {};
  const { firstName = '', lastName = '', avatarURL = '' } = userChat || {};

  const handleGetMessage = async (
    chatDocSnap: DocumentSnapshot<DocumentData, DocumentData>,
    chatDocRef: DocumentReference<DocumentData, DocumentData>,
    chatData: DocumentData | undefined,
    combinedId: string,
    nameUser: string,
    adminUid: string,
    avatar: string,
  ) => {
    !chatDocSnap.exists()
      ? await setDoc(chatDocRef, { messages: [] })
      : setMessages(chatData?.messages);

    setUserInfo({
      roomChatId: combinedId,
      userName: nameUser,
      adminUid: adminUid,
      avatar: avatar,
      openRoom: true,
    });
  };

  const handleSelectMember = async (user: {
    uid: string;
    avatarUrl: string;
    displayName: string;
  }) => {
    const id = user?.uid;
    router.push(`/inbox?id=${id}`);

    try {
      const combinedId = superAdminUid + user.uid;
      const chatDocRef = doc(db, FIREBASE_CHAT.CHATS, combinedId);
      const chatDocSnap = await getDoc(chatDocRef);
      const chatData = chatDocSnap.data();

      await handleGetMessage(
        chatDocSnap,
        chatDocRef,
        chatData,
        combinedId,
        user.displayName,
        user.uid,
        user.avatarUrl,
      );
    } catch (error) {
      toast(
        customToast(
          ERROR_MESSAGES.SELECT_MEMBER_CHAT.title,
          ERROR_MESSAGES.SELECT_MEMBER_CHAT.description,
          STATUS.ERROR,
        ),
      );
    }
  };

  useEffect(() => {
    const getLastMessagesByUserId = async () => {
      try {
        const chatDocRef = doc(
          db,
          FIREBASE_CHAT.USER_CHATS,
          `${superAdminUid}`,
        );
        const unsub = onSnapshot(chatDocRef, (doc) => {
          setChats(doc.data());
        });

        return () => {
          unsub();
        };
      } catch (error) {
        toast(
          customToast(
            ERROR_MESSAGES.LAST_MESSAGES_FAIL.title,
            ERROR_MESSAGES.LAST_MESSAGES_FAIL.description,
            STATUS.ERROR,
          ),
        );
      }
    };

    superAdminUid && getLastMessagesByUserId();
  }, [toast, superAdminUid]);

  const dataChats = useMemo(
    () => chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date),
    [chats],
  );

  useEffect(() => {
    const getRoomChat = async () => {
      if (uidUser) {
        const roomChatId = superAdminUid + uidUser;
        const userInfo = chats && chats[roomChatId]?.userInfo;
        const chatDocRef = doc(db, FIREBASE_CHAT.CHATS, roomChatId);
        const chatDocSnap = await getDoc(chatDocRef);
        const chatData = chatDocSnap.data();

        await handleGetMessage(
          chatDocSnap,
          chatDocRef,
          chatData,
          roomChatId,
          userInfo ? userInfo.displayName : `${firstName} ${lastName}`,
          uidUser,
          userInfo ? userInfo?.avatarUrl : (avatarURL as string),
        );
      }
    };

    superAdminUid && getRoomChat();
  }, [chats, uidUser, superAdminUid, firstName, lastName, avatarURL]);

  useSubscribeToChat(userInfo.roomChatId, setMessages);

  return (
    <Grid
      templateColumns="repeat(12, minmax(0, 1fr))"
      borderTop="1px solid"
      borderColor="border.tertiary"
    >
      <Hide above="lg">
        <GridItem
          colSpan={12}
          mb={4}
          padding={2}
          bg="background.body.septenary"
        >
          <Flex justify="flex-start" overflowX="scroll">
            {dataChats &&
              dataChats.map((chat) => (
                <ChatMember
                  key={chat[0]}
                  uid={chat[1].userInfo?.uid}
                  avatar={chat[1].userInfo?.avatarUrl}
                  name={chat[1].userInfo?.displayName}
                  onClick={handleSelectMember}
                />
              ))}
          </Flex>
        </GridItem>
      </Hide>
      <Hide below="lg">
        <GridItem
          colSpan={4}
          bg="background.body.septenary"
          pt={6}
          pr={7}
          pl={12}
          pb={10}
          borderRight="1px solid"
          borderColor="border.tertiary"
          height="calc(100vh - 103px)"
          overflowY="scroll"
        >
          <Flex justify="space-between" align="center">
            <Text
              as="h3"
              color="text.primary"
              fontWeight="semibold"
              fontSize="20px"
            >
              Messages
              <Text
                as="span"
                color="text.primary"
                fontWeight="semibold"
                fontSize="20px"
              >
                ({chats ? Object.values(chats).length : 0})
              </Text>
            </Text>
            <EditIcon color={primary} />
          </Flex>
          <Flex direction="column" gap={6} py={3.5}>
            {dataChats &&
              dataChats.map((chat) => (
                <ChatMember
                  key={chat[0]}
                  uid={chat[1].userInfo?.uid}
                  avatar={chat[1].userInfo?.avatarUrl}
                  name={chat[1].userInfo?.displayName}
                  onClick={handleSelectMember}
                  icon={
                    <FallbackImage
                      boxSize={4}
                      src={IMAGES.ATTACH.url}
                      alt={IMAGES.ATTACH.alt}
                    />
                  }
                  localeTime={convertTimeMessage(chat[1].date)}
                  lastMessage={chat[1]?.lastMessage?.text}
                />
              ))}
          </Flex>
        </GridItem>
      </Hide>
      {openRoom && (
        <GridItem colSpan={isMobile ? 12 : 8}>
          <Conversation
            userName={userName}
            userAvatar={avatar}
            messages={messages}
            adminUid={adminUid}
          />
        </GridItem>
      )}
    </Grid>
  );
};

export default ChatMemberList;
