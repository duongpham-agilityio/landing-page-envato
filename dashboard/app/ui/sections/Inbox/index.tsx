'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Text,
  Flex,
  theme,
  useColorModeValue,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';

// Firebase
import { convertTimeMessage, db } from '@/lib/utils';
import {
  DocumentData,
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
import { getUsers, useGetUserDetails } from '@/lib/hooks';

// Store
import { authStore } from '@/lib/stores';
import { FIREBASE_CHAT, IMAGES } from '@/lib/constants';

// Interfaces
import { TMessages } from '@/lib/interfaces';
import { useRouter, useSearchParams } from 'next/navigation';

const ChatMemberList = () => {
  const colorFill = useColorModeValue(
    theme.colors.gray[800],
    theme.colors.white,
  );

  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [adminUid, setAdminUid] = useState<string>('');
  const [chats, setChats] = useState<DocumentData | undefined>({});
  const [messages, setMessages] = useState<TMessages[]>([]);
  const [roomChatId, setRoomChatId] = useState<string | null>(null);
  const [showRoom, setShowRoom] = useState<boolean>(false);
  const [nameUser, setNameUser] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');

  const currentUser = authStore((state) => state.user);
  const uidUser = searchParams?.get('id') as string;
  const { filterDataUser } = useGetUserDetails(currentUser?.id as string);
  const userChat = filterDataUser?.find((user) => user.uid === uidUser);

  const handleMemberClick = async (user: {
    uid: string;
    avatarUrl: string;
    displayName: string;
  }) => {
    const id = user?.uid;
    router.push(`/inbox?id=${id}`);
    try {
      const usersData = await getUsers();
      const combinedId = usersData?.adminId + user.uid;
      const chatDocRef = doc(db, FIREBASE_CHAT.CHATS, combinedId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (!chatDocSnap.exists()) {
        await setDoc(chatDocRef, { messages: [] });
      }

      setRoomChatId(combinedId);

      const chatSnapshot = await getDoc(chatDocRef);
      const chatData = chatSnapshot.data();
      setMessages(chatData?.messages || []);
      setAdminUid(user.uid);
      setNameUser(user.displayName);
      setAvatar(user.avatarUrl);
      setShowRoom(true);
    } catch (error) {
      console.error('Error handling member click:', error);
    }
  };

  // Effect 1: Fetch chats when currentUser.uid changes
  useEffect(() => {
    const getChats = async () => {
      try {
        const chatDocRef = doc(
          db,
          FIREBASE_CHAT.USER_CHATS,
          `${currentUser?.uid}`,
        );
        const unsub = onSnapshot(chatDocRef, (doc) => {
          setChats(doc.data());
        });

        return () => {
          unsub();
        };
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const dataChats = useMemo(
    () => chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date),
    [chats],
  );

  // Effect 2: Fetch messages when uidUser changes
  useEffect(() => {
    const getRoomChat = async () => {
      if (uidUser) {
        const roomChatId = currentUser?.uid + uidUser;

        const userInfo = chats && chats[roomChatId]?.userInfo;

        const chatDocRef = doc(db, FIREBASE_CHAT.CHATS, roomChatId);
        const chatDocSnap = await getDoc(chatDocRef);

        if (!chatDocSnap.exists()) {
          await setDoc(chatDocRef, { messages: [] });
        }

        const unSub = onSnapshot(
          doc(db, FIREBASE_CHAT.CHATS, roomChatId),
          (doc) => {
            doc.exists() && setMessages(doc.data().messages);
          },
        );
        setAdminUid(uidUser);
        setRoomChatId(roomChatId);
        setNameUser(
          userInfo
            ? userInfo.displayName
            : `${userChat?.firstName} ${userChat?.lastName}`,
        );
        setAvatar(
          userInfo ? userInfo?.avatarUrl : (userChat?.avatarURL as string),
        );
        setShowRoom(true);

        return () => {
          unSub();
        };
      }
    };

    currentUser?.uid && getRoomChat();
  }, [
    chats,
    currentUser?.uid,
    uidUser,
    userChat?.avatarURL,
    userChat?.firstName,
    userChat?.lastName,
  ]);

  useEffect(() => {
    if (!roomChatId) return;
    const unSub = onSnapshot(
      doc(db, FIREBASE_CHAT.CHATS, roomChatId),
      (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      },
    );

    return () => {
      unSub();
    };
  }, [roomChatId]);

  return (
    <Grid
      templateColumns="repeat(12, minmax(0, 1fr))"
      borderTop="1px solid"
      borderColor="border.tertiary"
    >
      {isMobile ? (
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
                  onClick={() => handleMemberClick(chat[1].userInfo)}
                />
              ))}
          </Flex>
        </GridItem>
      ) : (
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
              fontSize="3xl"
            >
              Messages
              <Text
                as="span"
                color="text.primary"
                fontWeight="semibold"
                fontSize="3xl"
              >
                ({chats ? Object.values(chats).length : 0})
              </Text>
            </Text>
            <EditIcon color={colorFill} />
          </Flex>
          <Flex direction="column" gap={6} py={3.5}>
            {dataChats &&
              dataChats.map((chat) => (
                <ChatMember
                  key={chat[0]}
                  avatar={chat[1].userInfo?.avatarUrl}
                  name={chat[1].userInfo?.displayName}
                  onClick={() => handleMemberClick(chat[1].userInfo)}
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
      )}
      {showRoom && (
        <GridItem colSpan={isMobile ? 12 : 8}>
          <Conversation
            nameUser={nameUser}
            avatarUser={avatar}
            messages={messages}
            adminUid={adminUid}
          />
        </GridItem>
      )}
    </Grid>
  );
};

export default ChatMemberList;
