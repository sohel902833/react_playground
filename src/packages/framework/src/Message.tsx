export class Message {
  id: string;

  properties: any;

  messageId: string;

  constructor(id: string) {
    this.id = id;
    this.properties = {};
    const uuidv4 = new Date().getTime().toString();
    const random = Math.floor(Math.random() * 10000); // Generate a random number

    this.messageId = uuidv4 + random;
  }

  addData(key: any, value: any) {
    this.properties[key] = value;
  }

  getData(key: any) {
    let val = this.properties[key];
    if (val) {
      return val;
    }
    console.log("properties = ", this.properties, key);
  }

  initializeFromObject = (from: any) => {
    this.properties = { ...this.properties, ...from };
  };

  copyAllPropertiesOf(from: Message) {
    Object.entries(from.properties).map(([key, value]) => {
      return this.addData(key, value);
    });
  }
}
