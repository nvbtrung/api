'use strict';

export default class Todo {
    constructor(id, taskName, taskContent, isCompleted){
        this.id = id;
        this.taskName = taskName;
        this.taskContent = taskContent;
        this.isCompleted = isCompleted;
    }
}

