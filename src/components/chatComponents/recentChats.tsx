import React, {useState} from 'react'
const chats = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/100?img=1",
    lastMessage: "Hey, are you coming to the meeting later today?",
    time: "12:45 PM",
    read: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/100?img=2",
    lastMessage: "Sure, let me check and get back to you.",
    time: "11:30 AM",
    read: true,
  },
  {
    id: 3,
    name: "Michael Lee",
    avatar: "https://i.pravatar.cc/100?img=3",
    lastMessage: "Okay bro",
    time: "Yesterday",
    read: false,
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "https://i.pravatar.cc/100?img=4",
    lastMessage: "Let's work on the document tonight.",
    time: "10/08/2025",
    read: false,
  },
];


const recentChats = () => {
     const truncateMessage = (msg: string) => {
        if (msg.length <= 20) return msg;
        return msg.substring(0, 20) + "...";
      };
      const [activeChatId, setActiveChatId] = useState<number | null>(null);
  return (
    <div className="w-full overflow-y-auto pl-[18px]">
            {chats.map((chat) => {
              const isActive = activeChatId === chat.id;
              return (
                <div
                  key={chat.id}
                  className={`
                    flex items-center transition w-[400px] h-[60px] 
                    justify-between pr-[20px] pl-[10px] cursor-pointer
                    ${
                      isActive
                        ? "bg-[#E8F1FE] border-r-[4px] border-[#1C5ADF]"
                        : "hover:bg-[#E8F1FE]"
                    }
                  `}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className="w-[235px] h-[40px] flex items-start justify-between ">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-[40px] h-[40px] rounded-[50%] object-cover"
                    />
                    <div className=" flex flex-col justify-between items-start w-[180px] h-full ">
                      <p className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#020827]">
                        {chat.name}
                      </p>
                      <p className="font-inter font-normal text-[16px] leading-none tracking-normal text-[#747788]">
                        {truncateMessage(chat.lastMessage)}
                      </p>
                    </div>
                  </div>
                  <div className="min-w-[64px] h-[40px] flex font-inter text-[16px] font-normal leading-none tracking-normal text-[#747788] items-center">
                    {chat.time}
                    {chat.read && (
                      <span className="w-[8px] h-[8px] rounded-full bg-[#1C5ADF] ml-[10px]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
  )
}

export default recentChats