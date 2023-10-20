import { Message } from "../../framework/src/Message";
import MessageEnum, { getName } from "../../framework/src/Messages/MessageEnum";

export interface CreateApiRequestBody {
  header: any;
  body: any;
  apiUrl: string;
  method: string;
}
const CreateRestApiMessage = ({
  header,
  apiUrl,
  body,
  method,
}: CreateApiRequestBody) => {
  const requestMessage = new Message(
    getName(MessageEnum.RestAPIRequestMessage)
  );
  requestMessage.addData(
    getName(MessageEnum.RestAPIResponceEndPointMessage),
    apiUrl
  );

  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestHeaderMessage),
    JSON.stringify(header)
  );
  requestMessage.addData(getName(MessageEnum.RestAPIRequestBodyMessage), body);

  requestMessage.addData(
    getName(MessageEnum.RestAPIRequestMethodMessage),
    method
  );

  return requestMessage;
};
export default CreateRestApiMessage;
