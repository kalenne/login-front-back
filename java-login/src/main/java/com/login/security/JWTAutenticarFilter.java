package com.login.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.login.data.DetalheUsuarioData;
import com.login.model.Usuario;
import com.login.utils.Constantes;

public class JWTAutenticarFilter extends UsernamePasswordAuthenticationFilter {
	
	
	private final AuthenticationManager authenticationManager;

	public JWTAutenticarFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		try {
			Usuario usuario = new ObjectMapper().readValue(request.getInputStream(), Usuario.class);
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					usuario.getEmail(),
					usuario.getSenha(),
					new ArrayList<>()
					));
		} catch (IOException e) {
			throw new RuntimeException("Falha ao autenticar Usuario");
		}			
	}
	
	@Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
		
		DetalheUsuarioData usuarioData = (DetalheUsuarioData) authResult.getPrincipal();
		
		String token = JWT.create().withSubject(usuarioData.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + Constantes.TOKEN_EXPIRACAO))
				.sign(Algorithm.HMAC512(Constantes.TOKEN_SENHA));
		
		response.addHeader("Access-Control-Allow-Origin", "**");
		response.getWriter().write(token);
		response.getWriter().flush();
	}
}
