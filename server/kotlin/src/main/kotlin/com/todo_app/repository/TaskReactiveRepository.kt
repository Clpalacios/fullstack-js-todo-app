package com.todo_app.repository

import com.todo_app.model.Task
import org.springframework.data.mongodb.repository.ReactiveMongoRepository
import org.springframework.stereotype.Repository

@Repository
interface TaskReactiveRepository : ReactiveMongoRepository<Task, String>