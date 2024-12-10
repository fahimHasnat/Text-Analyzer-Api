import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { TextDto } from './dto/text.dto';
import { TextsService } from './texts.service';
import * as dayjs from 'dayjs';

@Controller('texts')
export class TextsController {
  constructor(private readonly textsService: TextsService) {}

  @Get()
  async getTexts() {
    try {
      const texts = await this.textsService.getTexts();
      return {
        status: HttpStatus.OK,
        message: 'Successful',
        data: texts.map((x) => {
          x['updated_at'] = dayjs(x['updated_at']).format('YYYY-MM-DD HH:mm');
          return x;
        }),
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed To Get Result!',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getText(@Param('id', ParseIntPipe) id: number) {
    try {
      const text = await this.textsService.getText(id);
      if (!text) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not Found ',
            error: 'Search Parameter Is Not Valid',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        status: HttpStatus.OK,
        message: 'Successful',
        data: text,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed To Get Result!',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createText(@Body(new ValidationPipe()) createText: TextDto) {
    try {
      const newText = await this.textsService.createText(createText);
      return {
        status: HttpStatus.CREATED,
        message: 'Text created successfully',
        data: newText,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create text',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateText(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateText: TextDto,
  ) {
    try {
      const affected = await this.textsService.updateText(id, updateText);
      if (affected == 0) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Update Failed',
            error: 'Update Failed',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        status: HttpStatus.OK,
        message: 'Text updated successfully',
        data: {},
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update text',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteText(@Param('id', ParseIntPipe) id: number) {
    try {
      const affected = await this.textsService.deleteText(id);
      if (affected == 0) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Deletion Failed',
            error: 'Deletion Failed',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        status: HttpStatus.OK,
        message: 'Text Deleted successfully',
        data: {},
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to Delete text',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/word-count')
  async getWordCount(@Param('id', ParseIntPipe) id: number) {
    try {
      const textData = await this.getText(id);
      const count = await this.textsService.getWordCount(textData.data.text);
      return {
        status: HttpStatus.OK,
        message: 'Successful',
        data: count,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed To Get Result!',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/character-count')
  async getCharacterCount(
    @Param('id', ParseIntPipe) id: number,
    @Query('remove_whitespace') remove_whitespace?,
  ) {
    try {
      const textData = await this.getText(id);
      const count = await this.textsService.getCharacterCount(
        textData.data.text,
        remove_whitespace,
      );
      return {
        status: HttpStatus.OK,
        message: 'Successful',
        data: count,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed To Get Result!',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/sentence-count')
  async getSentenceCount(@Param('id', ParseIntPipe) id: number) {
    try {
      const textData = await this.getText(id);
      const count = await this.textsService.getSentenceCount(
        textData.data.text,
      );
      return {
        status: HttpStatus.OK,
        message: 'Successful',
        data: count,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed To Get Result!',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/paragraph-count')
  async getParagraphCount(@Param('id', ParseIntPipe) id: number) {
    try {
      const textData = await this.getText(id);
      const count = await this.textsService.getParagraphCount(
        textData.data.text,
      );
      return {
        status: HttpStatus.OK,
        message: 'Successful',
        data: count,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed To Get Result!',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/longest-words')
  async getlongestWords(@Param('id', ParseIntPipe) id: number) {
    try {
      const textData = await this.getText(id);
      const longestWords = await this.textsService.getlongestWords(
        textData.data.text,
      );
      return {
        status: HttpStatus.OK,
        message: 'Successful',
        data: longestWords,
      };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed To Get Result!',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
