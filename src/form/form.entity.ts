import {Entity, PrimaryGeneratedColumn, CreateDateColumn, Column} from 'typeorm';

@Entity('form')
export class FormEntity {

@PrimaryGeneratedColumn('uuid') id: string;

@CreateDateColumn() created: Date;

@Column('text') fullname: string;

@Column('text') email: string;

@Column('text') phone: string;

@Column('text') companyN: string;

@Column('text') companyA: string;

@Column('text') description: string;
}
