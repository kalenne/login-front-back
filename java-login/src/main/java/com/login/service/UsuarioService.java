package com.login.service;

import java.util.List;
import java.util.Optional;

import javax.xml.crypto.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.exception.NotFoundException;
import com.login.model.Usuario;
import com.login.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuRepo;
	
	public List<Usuario> listaUsuarios () throws NotFoundException {
		try {
			return usuRepo.findAll();
		} catch (NotFoundException nfe) {
			throw new NotFoundException("Nao encontrado no sistema");
		}
	}
	
	public Usuario salvarUsuarios(Usuario usuario) throws Exception {
		try {
			return usuRepo.save(usuario);
		} catch (Exception e) {
			throw new Exception("Erro ao salvar o Usuario.");
		}
	}
	
	public Optional<Usuario> atualizarSenha(Usuario email) throws NotFoundException {
		try {		
			return usuRepo.findByEmail(email.getEmail())
					.map(dados -> {
						dados.setSenha(email.getSenha());
						return usuRepo.save(dados);
					});
		} catch (NotFoundException nfe) {
			throw new NotFoundException("Usuario nao encontrado no sistema.");
		}
	}
	
	
}
