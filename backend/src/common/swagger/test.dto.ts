import { ApiProperty } from '@nestjs/swagger';

export class testId {
  @ApiProperty({
    example: 15,
  })
  sub: number;
}
