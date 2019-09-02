'use strict';

import { boolean } from "@oclif/parser/lib/flags";

class Todo {
    constructor(id, taskName, taskContent, isCompleted){
        this.id = id;
        this.taskName = taskName;
        this.taskContent = taskContent;
        this.isCompleted = isCompleted;
    }
}

