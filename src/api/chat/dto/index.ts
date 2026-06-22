import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StartConversationDto {
  @ApiProperty({ description: 'Other driver user ID' })
  @IsString()
  @IsNotEmpty()
  participantId: string;
}

export class SendMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
