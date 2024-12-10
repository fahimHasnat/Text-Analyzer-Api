import { TextDto } from './dto/text.dto';
import { Text } from './entities/text.entity';
export declare class TextsService {
    createText(createText: TextDto): Promise<Text>;
    getTexts(): Promise<Text[]>;
    getText(id: number): Promise<Text>;
    updateText(id: number, updatedText: TextDto): Promise<number>;
    deleteText(id: number): Promise<number>;
    getWordCount(text: string): Promise<number>;
    getCharacterCount(text: string, remove_whitespace: string): Promise<number>;
    getSentenceCount(text: string): Promise<number>;
    getParagraphCount(text: string): Promise<number>;
    getlongestWords(text: string): Promise<object>;
    findLongestWord(paragraph: string): string;
}
