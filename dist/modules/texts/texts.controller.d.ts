import { HttpStatus } from '@nestjs/common';
import { TextDto } from './dto/text.dto';
import { TextsService } from './texts.service';
export declare class TextsController {
    private readonly textsService;
    constructor(textsService: TextsService);
    getTexts(): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./entities/text.entity").Text[];
    }>;
    getText(id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./entities/text.entity").Text;
    }>;
    createText(createText: TextDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("./entities/text.entity").Text;
    }>;
    updateText(id: number, updateText: TextDto): Promise<{
        status: HttpStatus;
        message: string;
        data: {};
    }>;
    deleteText(id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: {};
    }>;
    getWordCount(id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: number;
    }>;
    getCharacterCount(id: number, remove_whitespace?: any): Promise<{
        status: HttpStatus;
        message: string;
        data: number;
    }>;
    getSentenceCount(id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: number;
    }>;
    getParagraphCount(id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: number;
    }>;
    getlongestWords(id: number): Promise<{
        status: HttpStatus;
        message: string;
        data: object;
    }>;
}
