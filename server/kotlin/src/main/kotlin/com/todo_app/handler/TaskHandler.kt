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

  private val uri = "/api/v1/tasks"

  fun getAllTasks(): Mono<ServerResponse> {
    return ServerResponse.ok().body(taskReactiveRepository.findAll())
  }

  fun createTask(taskMono: Mono<Task>): Mono<ServerResponse> {
    var location: URI

    return taskMono.flatMap { toCreate ->
      taskReactiveRepository.save(toCreate)
        .flatMap { createdTask ->
          location = URI.create("$uri/${createdTask._id}")
          ServerResponse.created(location).body(Mono.just(createdTask))
        }
    }
  }

  fun completeTask(id: String): Mono<ServerResponse> {
    return taskReactiveRepository.findById(id)
      .flatMap { task ->
        task.completed = true
        ServerResponse.ok().body(taskReactiveRepository.save(task))
      }
      .switchIfEmpty(ServerResponse.notFound().build())
  }

  fun deleteTask(id: String): Mono<ServerResponse> {
    return taskReactiveRepository.findById(id)
      .flatMap { taskReactiveRepository.delete(it).then(ServerResponse.ok().build()) }
      .switchIfEmpty(ServerResponse.notFound().build())
  }
}
