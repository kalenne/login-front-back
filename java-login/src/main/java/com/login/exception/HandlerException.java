package com.login.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.login.utils.FormatLocalDateTime;

@ControllerAdvice
public class HandlerException extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler(NotFoundException.class)
	public final ResponseEntity<ResponseException> handlerNotFound(NotFoundException nfe, WebRequest request){
		FormatLocalDateTime flDate = new FormatLocalDateTime(LocalDateTime.now());
		
		ResponseException respoException = new ResponseException(flDate.formatDateTime(), nfe.getMessage(), request.getDescription(false));
		return new ResponseEntity<ResponseException>(respoException, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<ResponseException> handlerDefault(Exception ex, WebRequest request){
		FormatLocalDateTime flDate = new FormatLocalDateTime(LocalDateTime.now());
		ResponseException respoException = new ResponseException(flDate.formatDateTime(), ex.getMessage(), request.getDescription(false));
		return new ResponseEntity<ResponseException>(respoException, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
