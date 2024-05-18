import { ApolloLink, Operation, NextLink, Observable, RequestHandler } from '@apollo/client';

const isMockEnabled = true;

interface MockData {
  [key: string]: any;
}

const mockedResponseData: MockData = {
  GetUserChats: {
    data: {

    },
  }
};

const requesthandler: RequestHandler = (operation: Operation, forward: NextLink) => {
  if (isMockEnabled) {
    const { operationName } = operation;
    const mockedResponse = operationName ? mockedResponseData[operationName] : null;
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockedResponse);
        observer.complete();
      }, 1000);
    });
  } else {
    return forward(operation);
  }
};

const mockLink = new ApolloLink(requesthandler);

export default mockLink;
