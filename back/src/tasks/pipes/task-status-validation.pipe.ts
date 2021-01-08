import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    
    transform(value: string, metaData: ArgumentMetadata) {

        value = value.toUpperCase()
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`)
            
        }
        return value
    }


    private isStatusValid(status:any) {
        console.log(status);
        
        return this.allowedStatus.indexOf(status)!=-1
    }

}