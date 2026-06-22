import type {
  SmsTemplateDefinition,
  SmsTemplateRegistry,
} from '../types/sms-template.types';

/**
 * Well-known keys for {@link smsTemplateRegistry}. Prefer these over string literals.
 */
export const SMS_TEMPLATE_KEYS = {
  CUSTOMER_OTP: 'customer_otp',
} as const;

export type SmsTemplateKey =
  (typeof SMS_TEMPLATE_KEYS)[keyof typeof SMS_TEMPLATE_KEYS];

const customerOtp: SmsTemplateDefinition = {
  dltTemplateId: '1007271150393582852',
  sourceAddress: 'JVFPLC',
  messageType: 'SERVICE_IMPLICIT',
  bodyTemplate:
    'Hi {name}, Your verification code is {otp}. This is valid for 10 minutes. Do not share this with anyone. Thanks, Team Sbzee',
  variableKeys: ['name', 'otp'],
};

/**
 * All DLT-backed SMS layouts. Add new templates here (and a key in {@link SMS_TEMPLATE_KEYS}).
 */
export const smsTemplateRegistry: SmsTemplateRegistry = {
  [SMS_TEMPLATE_KEYS.CUSTOMER_OTP]: customerOtp,
};
