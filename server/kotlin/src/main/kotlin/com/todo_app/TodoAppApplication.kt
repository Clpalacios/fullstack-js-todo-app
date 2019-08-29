package com.todo_app

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@SpringBootApplication
@EnableReactiveMongoRepositories
class TodoAppApplication() {}

fun main(args: Array<String>) {
	runApplication<TodoAppApplication>(*args)
}
