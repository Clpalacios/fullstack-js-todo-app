package com.todo_app.handler

import com.todo_app.model.Task
import com.todo_app.repository.TaskReactiveRepository
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.body
import reactor.core.publisher.Mono
import java.net.URI

@Component
class TaskHandler(private val taskReactiveRepository: TaskReactiveRepository) {

  private val url = "/api/v1/tasks"

  fun getAllTasks(): Mono<ServerResponse> {
    return ServerResponse.ok().body(taskReactiveRepository.findAll())
  }

  fun createTask(taskMono: Mono<Task>): Mono<ServerResponse> {
    var location: URI
    
    return taskMono.flatMap { toCreate ->
      taskReactiveRepository.save(toCreate)
        .flatMap { createdTask ->
          location = URI.create("$url/${createdTask._id}")
          ServerResponse.created(location).body(Mono.just(createdTask))
        }
    }
  }

  fun updateTask(id: String, taskToUpdate: Mono<Task>): Mono<ServerResponse> {
    return taskReactiveRepository.findById(id)
      .flatMap { existingTask ->
        taskToUpdate.flatMap {updatedTask ->
          existingTask.completed = updatedTask.completed
          existingTask.description = updatedTask.description
          ServerResponse.ok().body(taskReactiveRepository.save(existingTask))
        }
      }
      .switchIfEmpty(ServerResponse.notFound().build())
  }

  fun deleteTask(id: String): Mono<ServerResponse> {
    return taskReactiveRepository.findById(id)
      .flatMap { taskReactiveRepository.delete(it).then(ServerResponse.ok().build()) }
      .switchIfEmpty(ServerResponse.notFound().build())
  }
}
