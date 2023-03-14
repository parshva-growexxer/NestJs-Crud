import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  update(id: number, body: CreateMessageDto) {
    return this.messageRepo.update(id, body);
  }

  findAll() {
    return this.messageRepo.find();
  }

  create(body: CreateMessageDto) {
    const newUser = this.messageRepo.create(body);
    return this.messageRepo.save(newUser);
  }

  deleteOne(id: number) {
    return this.messageRepo.delete(id);
  }
}
