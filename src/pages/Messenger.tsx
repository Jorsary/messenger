import Wrapper from "../components/layout/Wrapper";
import Chat from "../components/messenger/Chat";
import Chats from "../components/messenger/Chats";

const Messenger = () => {
  return (
    <Wrapper>
      <Chats />
      <Chat />
    </Wrapper>
  );
};

export default Messenger;
