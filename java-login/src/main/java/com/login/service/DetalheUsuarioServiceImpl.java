package com.login.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.login.data.DetalheUsuarioData;
import com.login.model.Usuario;
import com.login.repository.UsuarioRepository;

@Component
public class DetalheUsuarioServiceImpl implements UserDetailsService {
	
	private final UsuarioRepository repository;
	
	public DetalheUsuarioServiceImpl (UsuarioRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> usuario = repository.findByEmail(username);
		
		if(usuario.isEmpty()) {
			throw new UsernameNotFoundException("Usuário [" + username + "] não encontrado!");
		}
		
		return new DetalheUsuarioData(usuario);
		
	}
}