package com.todo_app.router

import com.todo_app.handler.TaskHandler
import com.todo_app.model.Task
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.function.server.RouterFunction
import org.springframework.web.reactive.function.server.ServerResponse
import org.springframework.web.reactive.function.server.router

@Configuration
class TaskRoutingConfiguration() {

  // Functional routing
  @Bean
  fun routerFunction(handler: TaskHandler): RouterFunction<ServerResponse> = router {
    ("/api/v1/tasks")
      .nest {
        GET("") { handler.getAllTasks() }
        POST("") { req -> handler.createTask(req.bodyToMono(Task::class.java)) }
        DELETE("/{id}") { req -> handler.deleteTask(req.pathVariable("id")) }
        PUT("/{id}/complete") { req -> handler.completeTask(req.pathVariable("id")) }
      }
  }
}