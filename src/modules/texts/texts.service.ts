import { Injectable } from '@nestjs/common';
import { TextDto } from './dto/text.dto';
import { Text } from './entities/text.entity';

@Injectable()
export class TextsService {
  async createText(createText: TextDto): Promise<Text> {
    return await Text.create<Text>(createText);
  }

  async getTexts(): Promise<Text[]> {
    return await Text.findAll<Text>({
      where: {
        is_deleted: false,
      },
      attributes: ['id', 'text', 'updated_at'],
      raw: true,
      order: [['updated_at', 'DESC']],
    });
  }

  async getText(id: number): Promise<Text> {
    return await Text.findOne<Text>({
      where: {
        id,
        is_deleted: false,
      },
      raw: true,
    });
  }

  async updateText(id: number, updatedText: TextDto): Promise<number> {
    const [affectedCount] = await Text.update<Text>(
      { text: updatedText.text },
      { where: { id } },
    );
    return affectedCount;
  }

  async deleteText(id: number): Promise<number> {
    const [affectedCount] = await Text.update<Text>(
      { is_deleted: true },
      { where: { id } },
    );
    return affectedCount;
  }

  async getWordCount(text: string): Promise<number> {
    const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, '');
    const words = cleanedText.split(/\s+/);
    const filteredWords = words.filter((word) => word.trim() !== '');

    return filteredWords.length;
  }

  async getCharacterCount(
    text: string,
    remove_whitespace: string,
  ): Promise<number> {
    let cleanedText = text.toLowerCase().replace(/[^\w\s]/g, '');

    if (remove_whitespace && remove_whitespace == 'true') {
      cleanedText = cleanedText.replace(/\s+/g, '');
    }
    return cleanedText.length;
  }

  async getSentenceCount(text: string): Promise<number> {
    text = text.trim();
    const sentenceRegex = /[.!?]+/;
    const sentences = text
      .split(sentenceRegex)
      .filter((sentence) => sentence.trim() !== '');

    return sentences.length;
  }

  async getParagraphCount(text: string): Promise<number> {
    const paragraphs = text
      .split(/\r?\n/)
      .filter((paragraph) => paragraph.trim() !== '');
    return paragraphs.length;
  }

  async getlongestWords(text: string): Promise<object> {
    const paragraphs = text
      .split(/\r?\n/)
      .filter((paragraph) => paragraph.trim() !== '');
    const longestWords = paragraphs.map((paragraph) =>
      this.findLongestWord(paragraph),
    );
    return { longestWords };
  }

  findLongestWord(paragraph: string): string {
    const words = paragraph.split(/\s+/);
    let longestWord = '';

    words.forEach((word) => {
      word = word.replace(/[^\w]/g, '');
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    });

    return longestWord;
  }
}
