import { Global, Module } from '@nestjs/common';

import { EMAIL_TEMPLATE_MAPPINGS } from './email.constants';
import { emailTemplateMappings } from './mappings/email-template.mappings';
import { EmailService } from './email.service';

@Global()
@Module({
  providers: [
    EmailService,
    {
      provide: EMAIL_TEMPLATE_MAPPINGS,
      useValue: emailTemplateMappings,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
