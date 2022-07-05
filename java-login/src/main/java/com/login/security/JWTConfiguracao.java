package com.login.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.login.service.DetalheUsuarioServiceImpl;

@Configuration
@EnableWebSecurity
public class JWTConfiguracao extends WebSecurityConfigurerAdapter {
	
	private final DetalheUsuarioServiceImpl usuarioService;
	
	public JWTConfiguracao(DetalheUsuarioServiceImpl usuarioService) {
		this.usuarioService = usuarioService;
	}

	@SuppressWarnings("deprecation")
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(usuarioService).passwordEncoder(NoOpPasswordEncoder.getInstance());
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {	
		http.httpBasic().disable();	
		http.csrf().disable().authorizeRequests()
				.antMatchers(HttpMethod.PUT).permitAll()
				.antMatchers(HttpMethod.POST, "/login").permitAll()
				.and()
				.addFilter(new JWTAutenticarFilter(authenticationManager()))
				.addFilter(new JWTValidarFilter(authenticationManager()))
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource () {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}
	
 
}
