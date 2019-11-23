import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { PostsEntity } from '../posts/posts.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @Column({ type: 'text', unique: true }) username: string;

    @Column('text') password: string;

    @Column('text') fullname: string;

    @Column('text') dateofbirth: string;

    @Column('text') stack: string;

    @Column('text') company: string;

    @Column('text') country: string;

    @Column('text') city: string;

    @ManyToMany(type => PostsEntity, {cascade: true})
    @JoinTable()
    bookmark: PostsEntity[];

    @OneToMany(type => PostsEntity, posts => posts.author)
    posts: PostsEntity[];

    @BeforeInsert()
    async Hashpassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async ComparePassword(attempt: string) {
        return await bcrypt.compare(this.password, attempt);
    }

    private get token() {
        const { id, username } = this;
        return jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '20d' });
    }

    public responseObject(showToken: boolean = true) {
        const { id, username, token, created } = this;
        const toResponseObject: any = { id, username, created };
        if (showToken) {
            toResponseObject.token = token;
        }
        if (this.bookmark) {
            toResponseObject.bookmark = this.bookmark;
        }
        return toResponseObject;
    }
}
