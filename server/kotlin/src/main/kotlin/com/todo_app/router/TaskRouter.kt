package com.todo_app.router

import com.todo_app.handler.TaskHandler
import com.todo_app.model.Task
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.router

@Configuration
class TaskRouter {

  private val url = "/api/v1/tasks"

  @Bean
  fun routerFunction(handler: TaskHandler): RouterFunction<ServerResponse> = router {
    (url)
      .nest {
        GET("") { handler.getAllTasks() }
        POST("") { req ->
          val taskToCreate = req.bodyToMono(Task::class.java)
          handler.createTask(taskToCreate)
        }
        DELETE("/{id}") { req ->
          val id = req.pathVariable("id")
          handler.deleteTask(id)
        }
        PUT("/{id}") { req ->
          val id = req.pathVariable("id")
          val taskToUpdate = req.bodyToMono(Task::class.java)
          handler.updateTask(id, taskToUpdate)
        }
      }
  }
}