"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextsService = void 0;
const common_1 = require("@nestjs/common");
const text_entity_1 = require("./entities/text.entity");
let TextsService = class TextsService {
    async createText(createText) {
        return await text_entity_1.Text.create(createText);
    }
    async getTexts() {
        return await text_entity_1.Text.findAll({
            where: {
                is_deleted: false,
            },
            attributes: ['id', 'text', 'updated_at'],
            raw: true,
            order: [['updated_at', 'DESC']],
        });
    }
    async getText(id) {
        return await text_entity_1.Text.findOne({
            where: {
                id,
                is_deleted: false,
            },
            raw: true,
        });
    }
    async updateText(id, updatedText) {
        const [affectedCount] = await text_entity_1.Text.update({ text: updatedText.text }, { where: { id } });
        return affectedCount;
    }
    async deleteText(id) {
        const [affectedCount] = await text_entity_1.Text.update({ is_deleted: true }, { where: { id } });
        return affectedCount;
    }
    async getWordCount(text) {
        const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, '');
        const words = cleanedText.split(/\s+/);
        const filteredWords = words.filter((word) => word.trim() !== '');
        return filteredWords.length;
    }
    async getCharacterCount(text, remove_whitespace) {
        let cleanedText = text.toLowerCase().replace(/[^\w\s]/g, '');
        if (remove_whitespace && remove_whitespace == 'true') {
            cleanedText = cleanedText.replace(/\s+/g, '');
        }
        return cleanedText.length;
    }
    async getSentenceCount(text) {
        text = text.trim();
        const sentenceRegex = /[.!?]+/;
        const sentences = text
            .split(sentenceRegex)
            .filter((sentence) => sentence.trim() !== '');
        return sentences.length;
    }
    async getParagraphCount(text) {
        const paragraphs = text
            .split(/\r?\n/)
            .filter((paragraph) => paragraph.trim() !== '');
        return paragraphs.length;
    }
    async getlongestWords(text) {
        const paragraphs = text
            .split(/\r?\n/)
            .filter((paragraph) => paragraph.trim() !== '');
        const longestWords = paragraphs.map((paragraph) => this.findLongestWord(paragraph));
        return { longestWords };
    }
    findLongestWord(paragraph) {
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
};
exports.TextsService = TextsService;
exports.TextsService = TextsService = __decorate([
    (0, common_1.Injectable)()
], TextsService);
//# sourceMappingURL=texts.service.js.map