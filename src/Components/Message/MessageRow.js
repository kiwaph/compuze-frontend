import { useState } from "react";
import { epochToElapsed } from "../../Helpers/Time";
import { MessageExpanded } from "./MessageExpanded";

export const MessageRow = ({id, subject, content, sender, senderId, isRead, createdAt}) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [read, setRead] = useState(isRead);
    
    const expandToggle = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <span onClick={expandToggle}>
            { read
                ? <div className='message-read-row'>{subject}<span className='sender'>{sender} | {epochToElapsed(createdAt)}</span></div>
                : <div className='message-unread-row'>{subject}<span className='sender'>{sender} | {epochToElapsed(createdAt)}</span></div>
            }

            { isExpanded
                ? <MessageExpanded id={id} sender={sender} senderId={senderId} content={content} read={read} setRead={setRead}/>
                : ''
            }
        </span>
    )
}