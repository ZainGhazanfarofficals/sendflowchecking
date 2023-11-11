import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const Mailbox = () => {
  const [replies, setReplies] = useState([]);
  const [selectedReply, setSelectedReply] = useState(null);

  const { data: user } = useSession();
  const mail = user?.user?.email;

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get('/api/incomingEmail', {
          params: { mail },
        });
        if (response.status === 200) {
          setReplies(response.data);
        } else {
          console.error('Error fetching email replies.');
        }
      } catch (error) {
        console.error('Error fetching email replies:', error);
      }
    };

    fetchReplies();
  }, []);

  const handleReplyClick = (reply) => {
    setSelectedReply(reply);
  };

  const handleCloseReply = () => {
    setSelectedReply(null);
  };

  const formatMessage = (content) => {
    return content
      .split('\n')
      .map((line, index) => (
        <p key={index}>
          {line.trim() && !line.startsWith('>') ? line : null}
        </p>
      ));
  };

  return (
    <div>
      {selectedReply ? (
        <div>
          <button
            onClick={handleCloseReply}
          >
            Back to Replies
          </button>
          <div>
            <strong>From: {selectedReply.senderEmail}</strong>
            <p>To: {selectedReply.recipients}</p>
            <strong>Message:</strong>
            <div>{formatMessage(selectedReply.content)}</div>
          </div>
        </div>
      ) : (
        <ul>
          {replies.map((reply, index) => (
            <li key={index}>
              <strong>From: {reply.senderEmail}</strong>
              <p>To: {reply.recipients}</p>
              <strong>Message:</strong>
              <div>{formatMessage(reply.content)}</div>
              <button
                onClick={() => handleReplyClick(reply)}
              >
                Read More
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Mailbox;
