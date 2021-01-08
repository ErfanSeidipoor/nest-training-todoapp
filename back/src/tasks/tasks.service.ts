import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository) private taskRepository:TaskRepository
    ){}

    async getTaskWithId(id: number, user:User):Promise<Task> {
        const found = await this.taskRepository.findOne({where:{id,userId:user.id}})

        if(!found) {
            throw new NotFoundException(`Task With ID > (${id}) not Found`)
        }

        return found
    }

    async createTask(createTaskDto: CreateTaskDto, user:User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async getTasks(
        getTasksFilterDto: GetTasksFilterDto,
        user:User,
    ):Promise<Task[]>  {
        return await this.taskRepository.getTasks(getTasksFilterDto, user)
    }


    async deleteTask(id:number, user:User):Promise<Task> {

        const found =  await this.getTaskWithId(id, user)

        await this.taskRepository.delete(found)

        return found
    }

    async updateTaskStatus(id:number, status: TaskStatus, user:User):Promise<Task> {

        const found =  await this.getTaskWithId(id, user)
        
        found.status = status

        await found.save()

        return found
    }

    // getTaskWithFilter(getTasksFilterDto: GetTasksFilterDto):Task[] {
    //     const { search , status} = getTasksFilterDto
    //     let tasks = this.getAllTask()

    //     if(status) {
    //         tasks = tasks.filter(task=>task.status===status)
    //     }
    //     if(search) {
    //         tasks = tasks.filter(task=>task.title.indexOf(search)!=-1 || task.description.indexOf(search)!=-1 )
    //     }
    //     return tasks
    // }
}
