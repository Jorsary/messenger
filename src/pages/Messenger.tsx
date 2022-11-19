import { useParams } from "react-router-dom";
import Wrapper from "../components/layout/Wrapper";
import Chat from "../components/messenger/Chat";
import Chats from "../components/messenger/Chats";

const Messenger = () => {
const {id} = useParams()
  return (
    <Wrapper>
      <Chats id={id}/>
      <Chat key={id}  id={id}/>
    </Wrapper>
  );
};

export default Messenger;
