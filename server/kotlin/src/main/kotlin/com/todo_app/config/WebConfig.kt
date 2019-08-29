package com.todo_app.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.web.cors.reactive.CorsUtils
import org.springframework.web.server.WebFilter
import reactor.core.publisher.Mono

@Configuration
class WebConfig {

  private val ALLOWED_ORIGIN = "*"
  private val ALLOWED_HEADERS = listOf(
    "x-requested-with, authorization, Content-Type, Authorization, credential, X-XSRF-TOKEN"
  )
  private val ALLOWED_METHODS =
    listOf(HttpMethod.OPTIONS, HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE)
  private val MAX_AGE = 3600L

  @Bean
  fun corsFilter(): WebFilter {
    return WebFilter { ctx, chain ->
      val request = ctx.request

      if (CorsUtils.isCorsRequest(request)) {
        val response = ctx.response
        val headers = response.headers

        headers.apply {
          accessControlAllowOrigin = ALLOWED_ORIGIN
          accessControlAllowHeaders = ALLOWED_HEADERS
          accessControlAllowMethods = ALLOWED_METHODS
          accessControlMaxAge = MAX_AGE
        }

        if (request.method == HttpMethod.OPTIONS) {
          response.statusCode = HttpStatus.OK
          return@WebFilter Mono.empty<Void>()
        }
      }
      chain.filter(ctx)
    }
  }
}
