package com.todo_app.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("task")
data class Task(
  @Id
  val _id: String?,
  val description: String,
  var completed: Boolean = false
)
