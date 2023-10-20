enum MessageEnum {
  RestAPIResponceMessage,
  RestAPIResponceDataMessage,
  RestAPIRequestMessage,
  RestAPIResponceSuccessMessage,
  RestAPIResponceErrorMessage,
  NavigationPropsMessage,
}

export const getName = (myEnum: MessageEnum) => {
  return MessageEnum[myEnum];
};

const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
const isNavigationMessage = (value: string) => value.indexOf("navigateTo");
export const enumToArray = (myEnum: any) => {
  return Object.keys(myEnum)
    .filter(StringIsNumber)
    .map((key) => myEnum[key]);
};

export const enumToNavigationArray = (myEnum: any) => {
  return enumToArray(myEnum).filter(isNavigationMessage);
};

export default MessageEnum;
