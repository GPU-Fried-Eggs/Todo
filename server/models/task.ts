import { Length } from "class-validator";

export class Task {
    @Length(1, 225)
    description: string
}
