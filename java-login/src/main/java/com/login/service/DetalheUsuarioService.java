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
public class DetalheUsuarioService implements UserDetailsService{
	
	private final UsuarioRepository usuRepository;
	
	public DetalheUsuarioService(UsuarioRepository usuRepository) {
		this.usuRepository = usuRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Usuario> usuario = usuRepository.findByEmail(username);
		if (usuario.isEmpty()) {
			throw new UsernameNotFoundException("Usuario [" + username + "] nao encontrado" );
		}
		
		return new DetalheUsuarioData(usuario);
	}
}
