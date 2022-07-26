package com.login.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.login.service.DetalheUsuarioService;

@EnableWebSecurity
public class JWTConfiguracao extends WebSecurityConfigurerAdapter {
	
	private final DetalheUsuarioService usuarioService;
	private final PasswordEncoder passwordEncoder;
	
	public JWTConfiguracao(DetalheUsuarioService usuarioService, PasswordEncoder passwordEncoder) {
		this.usuarioService = usuarioService;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(usuarioService).passwordEncoder(passwordEncoder);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().authorizeHttpRequests()
			.antMatchers(HttpMethod.POST, "/login", "/api/usuario/salvar", "/api/usuario/logado").permitAll()
			.antMatchers(HttpMethod.GET, "/api/usuario/roles").permitAll()
			.antMatchers(HttpMethod.PUT, "/api/usuario/editar").permitAll()
			.anyRequest().authenticated()
			.and()
			.addFilter(new JWTAutenticarFilter(authenticationManager()))
			.addFilter(new JWTValidarFilter(authenticationManager()))
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
       
        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.setAllowedMethods(Arrays.asList("*"));
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
	
}
