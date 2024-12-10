import { MinLength } from 'class-validator';
export class TextDto {
  @MinLength(1, { message: 'Empty String Not Allowed!' })
  readonly text: string;
}
