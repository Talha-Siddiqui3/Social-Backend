export enum ConfigKeys {
  TWILIO_PHONE_NUMBER = 'TWILIO_PHONE_NUMBER',
}

export default () => ({
  [ConfigKeys.TWILIO_PHONE_NUMBER]: process.env.TWILIO_PHONE_NUMBER,
});
