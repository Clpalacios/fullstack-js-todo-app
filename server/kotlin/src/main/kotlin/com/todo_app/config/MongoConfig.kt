package com.todo_app.config

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
import org.springframework.data.mongodb.core.ReactiveMongoTemplate
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@Configuration
@EnableReactiveMongoRepositories
class MongoConfig : AbstractReactiveMongoConfiguration() {

  @Value("\${spring.data.mongodb.database}")
  private lateinit var dbName: String

  override fun getDatabaseName() = dbName

  @Bean
  override fun reactiveMongoClient(): MongoClient {
    return MongoClients.create()
  }

  @Bean
  override fun reactiveMongoTemplate() = ReactiveMongoTemplate(reactiveMongoClient(), databaseName)
}