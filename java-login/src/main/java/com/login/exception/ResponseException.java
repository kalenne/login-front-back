package com.login.exception;

import lombok.Getter;

@Getter
public class ResponseException {
	private String horario;
	private String texto;
	private String detalhes;
	
	public ResponseException(String horario, String texto, String detalhes) {
		this.horario = horario;
		this.texto = texto;
		this.detalhes = detalhes;
	}

}
