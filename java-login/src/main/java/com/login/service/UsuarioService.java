package com.login.service;

import java.util.List;
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
	
	public UsuarioService(UsuarioRepository usuRepo) {
		this.usuRepo = usuRepo;
	}
	
	private Usuario usuarioLogado;
	 
	 public Optional<Usuario> logado(Usuario usuarioLogado) {
		return usuRepo.findByEmail(usuarioLogado.getEmail()).map(data -> {
			this.usuarioLogado = data;
			return data;
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
					 throw new NotFoundException("Usuario nao encontrado.");
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
	
	
	public Usuario salvarUsuarios(Usuario usuario) throws Exception  {
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
	
	public Optional<Usuario> editarUsuario(Usuario usuario)  throws Exception {
		return usuRepo.findByEmail(usuario.getEmail())
				.map(dados -> {
					dados.setCpf(usuario.getCpf());
					dados.setDatanasc(usuario.getDatanasc());
					dados.setNome(usuario.getNome());
					dados.setSenha(usuario.getSenha());
					if(usuario.getRoles() == null) {
						dados.setRoles(UserRoles.USER);
					} else {
						dados.setRoles(usuario.getRoles());
					}
					
					return usuRepo.save(dados);
				});
	}
	
	public Optional<Usuario> resetUsuario(Usuario usuario)  throws Exception {
		return usuRepo.findByEmail(usuario.getEmail()).map(data -> {
			data.setSenha(usuario.getSenha());
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
	
	public List<Object> quantidadeRoles() {
		return usuRepo.quantidadeRoles();
	}
}
