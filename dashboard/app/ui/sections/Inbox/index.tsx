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

// Firebase
import { convertTimeMessage, customToast, db } from '@/lib/utils';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';

// Components
import {
  ChatMember,
  Conversation,
  EditIcon,
  FallbackImage,
} from '@/ui/components';

// Hooks
import { useGetUserDetails, useSubscribeToChat } from '@/lib/hooks';

// Store
import { authStore } from '@/lib/stores';
import { ERROR_MESSAGES, FIREBASE_CHAT, IMAGES, STATUS } from '@/lib/constants';

// Interfaces
import { TMessages } from '@/lib/interfaces';
import { useRouter, useSearchParams } from 'next/navigation';
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
    nameUser: '',
    adminUid: '',
    avatar: '',
    openRoom: false,
  });

  const { user: superAdmin } = authStore((state) => state);
  const uidUser = searchParams?.get('id') as string;
  const { filterDataUser } = useGetUserDetails(superAdmin?.id as string);
  const userChat = filterDataUser?.find((user) => user.uid === uidUser);
  const toast = useToast();

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
      nameUser: nameUser,
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
      const combinedId = superAdmin?.uid + user.uid;
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
          `${superAdmin?.uid}`,
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

    superAdmin?.uid && getLastMessagesByUserId();
  }, [toast, superAdmin?.uid]);

  const dataChats = useMemo(
    () => chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date),
    [chats],
  );

  useEffect(() => {
    const getRoomChat = async () => {
      if (uidUser) {
        const roomChatId = superAdmin?.uid + uidUser;
        const userInfo = chats && chats[roomChatId]?.userInfo;
        const chatDocRef = doc(db, FIREBASE_CHAT.CHATS, roomChatId);
        const chatDocSnap = await getDoc(chatDocRef);
        const chatData = chatDocSnap.data();

        await handleGetMessage(
          chatDocSnap,
          chatDocRef,
          chatData,
          roomChatId,
          userInfo
            ? userInfo.displayName
            : `${userChat?.firstName} ${userChat?.lastName}`,
          uidUser,
          userInfo ? userInfo?.avatarUrl : (userChat?.avatarURL as string),
        );
      }
    };

    superAdmin?.uid && getRoomChat();
  }, [
    chats,
    uidUser,
    superAdmin?.uid,
    userChat?.firstName,
    userChat?.lastName,
    userChat?.avatarURL,
  ]);

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
                  avatar={chat[1].userInfo?.avatarUrl}
                  onClick={() => handleSelectMember(chat[1].userInfo)}
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
                  avatar={chat[1].userInfo?.avatarUrl}
                  name={chat[1].userInfo?.displayName}
                  onClick={() => handleSelectMember(chat[1].userInfo)}
                  icon={
                    <FallbackImage
                      boxSize={4}
                      src={IMAGES.ATTACH.url}
                      alt={IMAGES.ATTACH.alt}
                    />
                  }
                  localeTime={convertTimeMessage(chat[1].date)}
                  lastMessages={chat[1]?.lastMessage?.text}
                />
              ))}
          </Flex>
        </GridItem>
      </Hide>
      {userInfo.openRoom && (
        <GridItem colSpan={isMobile ? 12 : 8}>
          <Conversation
            nameUser={userInfo.nameUser}
            avatarUser={userInfo.avatar}
            messages={messages}
            adminUid={userInfo.adminUid}
          />
        </GridItem>
      )}
    </Grid>
  );
};

export default ChatMemberList;
