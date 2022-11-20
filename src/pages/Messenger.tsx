import { doc, getDoc } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../components/layout/Wrapper";
import Chat from "../components/messenger/Chat";
import Chats from "../components/messenger/Chats";
import { db } from "../firebase/firebase";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { changeUser } from "../store/chatSlice";

const Messenger = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { uid } = useAppSelector((state) => state.user);
  const [user, setUser] = useState<any>();
  
  if(!id){
    dispatch(changeUser({ res: '', u: null }));
  }

  useEffect(() => {
    if (uid && id) {
      const fetch = async () => {
        const friend = await getDoc(doc(db, "userChats", uid));
        const userInfo = friend.data();
        if (userInfo) {
          const res: any = await getDoc(userInfo[id].userInfo.userRef);
          setUser(res.data());
        }
      };
      fetch();
    }
  }, [id]);

  useEffect(() => {
    if (user && id) {
      dispatch(changeUser({ res: id, u: user }));
    }
  }, [user]);

  return (
    <Wrapper>
      <Chats id={id} />
      <Chat key={id} id={id} />
    </Wrapper>
  );
};

export default memo(Messenger);
