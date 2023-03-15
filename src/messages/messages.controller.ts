import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    try {
      return this.messagesService.findAll();
    } catch {
      throw new NotFoundException('Messages Not found');
    }
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    body.content = body.content.trim();
    if (!body.content && body.content === '') {
      return {
        code: '400',
        message: ['There should Content'],
      };
    }
    this.messagesService.create(body);
    return {
      message: 'Create Message successfully',
    };
  }

  @Put('/:id')
  async getMessage(@Param('id') id: number, @Body() body: CreateMessageDto) {
    if (!id) {
      throw new NotFoundException('There should be ID in params');
    }
    body.content = body.content.trim();
    if (!body.content && body.content === '') {
      return {
        code: '400',
        message: ['There should Content'],
      };
    }
    await this.messagesService.update(id, body);
    return {
      message: 'Update Message successfully',
    };
  }

  @Delete('/:id')
  async deleteMessage(@Param('id') id: number) {
    if (!id) {
      throw new NotFoundException('There should be ID in params');
    }
    await this.messagesService.deleteOne(id);
    return {
      statusCode: '200',
      message: ['Delete data successfully!!'],
    };
  }
}
