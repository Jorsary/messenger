import { onValue, ref as realRef } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { onMessage } from "firebase/messaging";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/layout/Wrapper";
import Chat from "../components/messenger/Chat";
import Chats from "../components/messenger/Chats";
import { db, messaging, realdb } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { changeUser } from "../store/chatSlice";

const Messenger = () => {
  const { chatid } = useParams();
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<any>();
  const [userPresence, setUserPresence] = useState<any>();

  if (!chatid) {
    dispatch(changeUser({ res: "", u: null, userPresence: {} }));
  }

  useEffect(() => {
    if (uid && chatid) {
      const fetch = async () => {
        const friend = await getDoc(doc(db, "userChats", uid));
        const userInfo = friend.data();
        if (userInfo) {
          const res: any = await getDoc(userInfo[chatid].userInfo.userRef);
          setUser(res.data());
        }
      };
      fetch();
    }
  }, [chatid]);

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });

  useEffect(() => {
    if (user && chatid) {
      const unsub = onValue(
        realRef(realdb, `state/${user.uid}`),
        (snapshot) => {
          const data = snapshot.val();
          setUserPresence(data);
          dispatch(changeUser({ res: chatid, u: user, userPresence: data }));
        }
      );
      return () => {
        unsub();
      };
    }
  }, [user]);

  return (
    <Wrapper>
      <Chats id={chatid} />
      <Chat key={chatid} id={chatid} />
    </Wrapper>
  );
};

export default memo(Messenger);
