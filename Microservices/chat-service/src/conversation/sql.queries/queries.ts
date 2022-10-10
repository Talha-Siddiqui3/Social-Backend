export const getUserConversationsQuery = "SELECT C.id as conversationID, C.name, C.image, C.last_message, C.last_message_sender_id, C.last_message_sent_date, U.id as userID, U.first_name, U.last_name, U.profile_picture, U.phone_number, U.is_active \n" +
    "FROM `Conversation` C \n" +
    "INNER JOIN UserConversation UC ON C.id=UC.conversation_id \n" +
    "INNER JOIN User U ON UC.user_id=U.id \n" +
    "WHERE C.id IN \n" +
    "(SELECT conversation_id FROM `UserConversation` WHERE user_id = ?) \n" +
    "AND UC.user_id <> ?"