import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { Application } from './application.entity';

@Entity()
export class PositionQuestionAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column({
    type: 'text',
  })
  answer: string;

  @ManyToOne(
    () => Application,
    (application) => application.questions_answers,
    {
      cascade: true,
    },
  )
  application: Application;

  @ManyToOne(() => Question, {
    cascade: true,
  })
  question: Question;
}
