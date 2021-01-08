import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService:TasksService) {}

    @Get()
    @UsePipes(ValidationPipe)
    getAllTasks(
        @Query() getTasksFilterDto:GetTasksFilterDto,
        @GetUser() user:User,
    ):Promise<Task[]> {
        return this.tasksService.getTasks(getTasksFilterDto,user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @GetUser() user:User,
        @Body() createTaskDto:CreateTaskDto,
        @Body('title') title:string,
        @Body('description') description:string,
    ):Promise<Task> {

        console.log(user);
        
        console.log("body > ",createTaskDto)
        console.log("title > ",title)
        console.log("description > ",description)

        return this.tasksService.createTask(createTaskDto, user)
    }


    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user:User,
    ):Promise<Task> {
        return this.tasksService.getTaskWithId(id, user)
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user:User,
    ):Promise<Task> {
        return this.tasksService.deleteTask(id, user)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', TaskStatusValidationPipe) status:TaskStatus,
        @GetUser() user:User,
    ) {
        return this.tasksService.updateTaskStatus(id, status, user)
    }
}
