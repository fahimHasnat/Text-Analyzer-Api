"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextsController = void 0;
const common_1 = require("@nestjs/common");
const text_dto_1 = require("./dto/text.dto");
const texts_service_1 = require("./texts.service");
const dayjs = require("dayjs");
let TextsController = class TextsController {
    constructor(textsService) {
        this.textsService = textsService;
    }
    async getTexts() {
        try {
            const texts = await this.textsService.getTexts();
            return {
                status: common_1.HttpStatus.OK,
                message: 'Successful',
                data: texts.map((x) => {
                    x['updated_at'] = dayjs(x['updated_at']).format('YYYY-MM-DD HH:mm');
                    return x;
                }),
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed To Get Result!',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getText(id) {
        try {
            const text = await this.textsService.getText(id);
            if (!text) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    message: 'Not Found ',
                    error: 'Search Parameter Is Not Valid',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                status: common_1.HttpStatus.OK,
                message: 'Successful',
                data: text,
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed To Get Result!',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createText(createText) {
        try {
            const newText = await this.textsService.createText(createText);
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Text created successfully',
                data: newText,
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to create text',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateText(id, updateText) {
        try {
            const affected = await this.textsService.updateText(id, updateText);
            if (affected == 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Update Failed',
                    error: 'Update Failed',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return {
                status: common_1.HttpStatus.OK,
                message: 'Text updated successfully',
                data: {},
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to update text',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteText(id) {
        try {
            const affected = await this.textsService.deleteText(id);
            if (affected == 0) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Deletion Failed',
                    error: 'Deletion Failed',
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return {
                status: common_1.HttpStatus.OK,
                message: 'Text Deleted successfully',
                data: {},
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to Delete text',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getWordCount(id) {
        try {
            const textData = await this.getText(id);
            const count = await this.textsService.getWordCount(textData.data.text);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Successful',
                data: count,
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed To Get Result!',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCharacterCount(id, remove_whitespace) {
        try {
            const textData = await this.getText(id);
            const count = await this.textsService.getCharacterCount(textData.data.text, remove_whitespace);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Successful',
                data: count,
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed To Get Result!',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSentenceCount(id) {
        try {
            const textData = await this.getText(id);
            const count = await this.textsService.getSentenceCount(textData.data.text);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Successful',
                data: count,
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed To Get Result!',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getParagraphCount(id) {
        try {
            const textData = await this.getText(id);
            const count = await this.textsService.getParagraphCount(textData.data.text);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Successful',
                data: count,
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed To Get Result!',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getlongestWords(id) {
        try {
            const textData = await this.getText(id);
            const longestWords = await this.textsService.getlongestWords(textData.data.text);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Successful',
                data: longestWords,
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed To Get Result!',
                error: err.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TextsController = TextsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "getTexts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "getText", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "createText", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, text_dto_1.TextDto]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "updateText", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "deleteText", null);
__decorate([
    (0, common_1.Get)(':id/word-count'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "getWordCount", null);
__decorate([
    (0, common_1.Get)(':id/character-count'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('remove_whitespace')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "getCharacterCount", null);
__decorate([
    (0, common_1.Get)(':id/sentence-count'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "getSentenceCount", null);
__decorate([
    (0, common_1.Get)(':id/paragraph-count'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "getParagraphCount", null);
__decorate([
    (0, common_1.Get)(':id/longest-words'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TextsController.prototype, "getlongestWords", null);
exports.TextsController = TextsController = __decorate([
    (0, common_1.Controller)('texts'),
    __metadata("design:paramtypes", [texts_service_1.TextsService])
], TextsController);
//# sourceMappingURL=texts.controller.js.map