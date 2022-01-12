import React, { useRef, useEffect, useState } from "react";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import styled from "styled-components";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";

import MessageList from "./MessagesList";
import SendMessage from "./SendMessage";
import gql from "graphql-tag";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";

const APIConfig = {
  aws_appsync_graphqlEndpoint:
    "https://qcsjiq3bsjgshonvdmr3ebn7rq.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-du5ewudw4ja53cdfopgzn4zmdi",
};
/*
const myAppConfig = {
  // ...
  'aws_appsync_graphqlEndpoint': 'https://xxxxxx.appsync-api.us-east-1.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-xxxxxxxxxxxxxxxxxxxxxxxxxx',
  // ...
}
*/
Amplify.configure(APIConfig);

/*
  query MyQuery {
    getMessages {
      body
      createdAt
      messageId
      username
    }
  }

  */

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

const Chat = ({ username = "tero" }) => {
  //const isMountedRef = useIsMountedRef();
  const [messages, setMessages] = useState([]);

  /*
  useEffect(async () => {
    if (isMountedRef.current) {
    const allMessages = await API.graphql({ query: queries.getMessages });
   
    }
  }, [isMountedRef]);
*/

  const subscribeMessages = async () => {
    const subscription = await API.graphql(
      graphqlOperation(subscriptions.addMessage)
    ).subscribe({
      next: ({ provider, value }) => {
        console.log(provider, value);

        const msg = value.data.addMessage;
        setMessages((prev) => [...prev, msg]);
      },
    });
    // Stop receiving data updates from the subscription
    //subscription.unsubscribe();
  };
  const sendMessage = async (msg, username) => {
    return await API.graphql({
      query: mutations.createMessage,
      variables: { body: msg, username: username },
    });
  };

  const client = new AWSAppSyncClient({
    url: APIConfig.aws_appsync_graphqlEndpoint,
    region: APIConfig.aws_appsync_region,
    auth: {
      type: AUTH_TYPE.API_KEY, // or type: awsconfig.aws_appsync_authenticationType,
      apiKey: APIConfig.aws_appsync_apiKey,
    },
    disableOffline: true,
  });

  const getMessages = () => {
    //return API.graphql({ query: queries.getMessages });
    return client
      .query({ query: gql(queries.getMessages) })
      .then(({ data: data }) => {
        return data.getMessages;
      });
  };

  useEffect(() => {
    onPageRendered();
  }, []);

  const onPageRendered = async () => {
    const allMessages = await getMessages();
    //console.log(allMessages.data, Object.keys(allMessages));
    //console.log(Object.keys(allMessages), allMessages);
    //setMessages(allMessages.data.getMessages);
    setMessages(allMessages);
    subscribeMessages();
    console.log("API ", API);
    const header = await API.graphql({ query: queries.getHeader });

    console.log(header);
    const headerInfo = header.data.getHeader;
    const intl = Intl.DateTimeFormat().resolvedOptions();
    const d = new Date();
    const localization = {
      ...headerInfo,
      ...intl,
      timeZoneOffset: d.getTimezoneOffset(),
    };
    console.log(localization);
  };
  console.log("RENDER ", messages);
  return (
    <div
      style={{
        height: "calc(100vh - 79px)",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <React.Suspense fallback={"Loading..."}>
        {messages.length > 0 && (
          <MessageList messages={messages} username={username} />
        )}
      </React.Suspense>
      <SendMessage username={username} onCreate={sendMessage} />
    </div>
  );
};

export default Chat;
