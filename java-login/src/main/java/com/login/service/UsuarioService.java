package com.login.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.exception.NotFoundException;
import com.login.model.Usuario;
import com.login.repository.UsuarioRepository;
import com.login.utils.UserRoles;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository usuRepo;
	
	private Usuario usuarioLogado;
	
	 public UsuarioService(UsuarioRepository repository) {
		 this.usuRepo = repository;
	 }
	 
	 public Optional<Usuario> logado(Usuario usuarioLogado) {
		return usuRepo.findByEmail(usuarioLogado.getEmail()).map(data -> {
			this.usuarioLogado = data;
			return this.usuarioLogado;
		});
	 }
		
	 public Optional<Object> listaUsuarios (Integer id) throws NotFoundException{
		 try {
			 return usuRepo.findById(id).map(dados -> {
				 if(dados.getRoles() == UserRoles.ADMIN && dados.isAtivo() == true) {
					 return usuRepo.findByAtivoTrue();
				 } else if (dados.isAtivo() == true) {
					 return dados;
				 } else {
					 return null;
				 }
			 });
			
		 } catch (NotFoundException nfe) {
			 throw new NotFoundException("Usuario nao encontrado.");
		 }
	 }
	 
	 public Optional<Object> restaurarUsuarios(Integer id) throws NotFoundException {
		 try {
			 return usuRepo.findById(id).map(dados -> {
				 if(dados.getRoles() == UserRoles.ADMIN) {
					 return usuRepo.findByAtivoFalse();
				 } 	else {
					 return null;
				 }
				
			 });
			
		 } catch (NotFoundException nfe) {
			 throw new NotFoundException("Usuario nao encontrado.");
		 }
			 
	 }
	
	
	public Usuario salvarUsuarios(Usuario usuario) throws Exception {
		try {			
			if(usuario.getRoles() == null) {
				usuario.setRoles(UserRoles.USER);
			}
			
			usuario.setAtivo(true);
			return usuRepo.save(usuario);
		} catch (Exception e) {
			throw new Exception("Erro ao salvar o usuario.");
		}
	}
	
	public Optional<Usuario> editarUsuario(Usuario email)  throws Exception {
		return usuRepo.findByEmail(email.getEmail())
				.map(dados -> {
					dados.setCpf(email.getCpf());
					dados.setDatanasc(email.getDatanasc());
					dados.setNome(email.getNome());
					dados.setSenha(email.getSenha());
					if(email.getRoles() == null) {
						dados.setRoles(UserRoles.USER);
					} else {
						dados.setRoles(email.getRoles());
					}
					
					return usuRepo.save(dados);
				});
	}
	
	public Optional<Usuario> resetUsuario(Usuario email)  throws Exception {
		return usuRepo.findByEmail(email.getEmail()).map(data -> {
			data.setSenha(email.getSenha());
			return usuRepo.save(data);
		});
	}
	
	public Optional<Usuario> findEmail (String email){
		return usuRepo.findByEmail(email);
	}
	
	public Optional<Usuario> delete (Integer id) throws Exception {
		
		try {
			return usuRepo.findById(id).map(dados -> {
				dados.setAtivo(false);
				return usuRepo.save(dados);
			});
			
		} catch (Exception e) {
			throw new Exception("Usuario invalido para a operacao");
		}
		
	}
	
	public Optional<Usuario> restaurar(Integer id) throws Exception {
		try {
			return usuRepo.findById(id).map(dados -> {
				dados.setAtivo(true);
				return usuRepo.save(dados);
			});
		} catch (Exception e) {
			throw new Exception("Usuario invalido para a operacao");
		}
	}
	
	public UserRoles[] roles () {
		return UserRoles.values();
	}
}
