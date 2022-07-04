import { MessageList } from './MessageList'

export const InboxPage = () => {
    return (
        <>
            <h2>Inbox</h2>
            <div className='messages-section'>
                <MessageList />
            </div>
        </>
    )
}