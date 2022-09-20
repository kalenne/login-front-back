package com.login.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.model.Usuario;
import com.login.service.UsuarioService;
import com.login.utils.UserRoles;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuServ;
	
	private PasswordEncoder encoder;
	
	public UsuarioController (UsuarioService usuServ, PasswordEncoder encoder) {
		this.usuServ = usuServ;
		this.encoder = encoder;
	}
		
	@GetMapping("/admin/listar/{id}")
	public ResponseEntity<Optional<Object>> listarUsuarios(@PathVariable(value = "id") Integer id) {
		Optional<Object> usu = usuServ.listaUsuarios(id);
		return new ResponseEntity<Optional<Object>>(usu, HttpStatus.OK);
	}
	
	@GetMapping("/admin/restaurar/{id}")
	public ResponseEntity<Optional<Object>> restaurarUsuarios(@PathVariable(value = "id") Integer id) {
		Optional<Object> usu = usuServ.restaurarUsuarios(id);
		return new ResponseEntity<Optional<Object>>(usu, HttpStatus.OK);
	}
	
	@GetMapping("/roles")
	public ResponseEntity<UserRoles[]> roles (){
		UserRoles[] roles = usuServ.roles();
		return new ResponseEntity<UserRoles[]>(roles, HttpStatus.OK);
	}
	
	@GetMapping("/quantidaderoles")
	public ResponseEntity<List<Object>> quantidadeRoles (){
		List<Object> roles = usuServ.quantidadeRoles();
		return new ResponseEntity<List<Object>>(roles, HttpStatus.OK);
	}
	
	
	@PostMapping("/logado")
	public ResponseEntity<Optional<Usuario>> usuarioLogado (@RequestBody Usuario usuario){
		Optional<Usuario> usu = usuServ.logado(usuario);
		return new ResponseEntity<Optional<Usuario>>(usu, HttpStatus.OK);
	}	
	
	@PostMapping("/salvar")
	public ResponseEntity<Usuario> salvarUsuarios(@RequestBody Usuario usuario) throws Exception {
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		Usuario usu = usuServ.salvarUsuarios(usuario);
		return new ResponseEntity<Usuario>(usu, HttpStatus.CREATED);
	}
	
	@PutMapping("/editar")
	public ResponseEntity<Optional<Usuario>> atualizarSenha (@RequestBody Usuario usuario) throws Exception{
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		Optional<Usuario> usu = usuServ.editarUsuario(usuario);
		return new ResponseEntity<Optional<Usuario>>(usu, HttpStatus.OK);
	}
	
	@PutMapping("/restaurar")
	public ResponseEntity<Optional<Usuario>> restaurar (@RequestBody Integer id) throws Exception{
		Optional<Usuario> usu = usuServ.restaurar(id);
		return new ResponseEntity<Optional<Usuario>>(usu, HttpStatus.ACCEPTED);
	}
	
	@PutMapping(value="/excluir")
	public ResponseEntity<Optional<Usuario>> deleteUsuario(@RequestBody Integer id) throws Exception{
		Optional<Usuario> usu = usuServ.delete(id);
		return new ResponseEntity<Optional<Usuario>>(usu, HttpStatus.ACCEPTED);
	}
	
	@PutMapping(value="/resetsenha")
	public ResponseEntity<Optional<Usuario>> resetSenha(@RequestBody Usuario usuario) throws Exception {
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		Optional<Usuario> usu = usuServ.resetUsuario(usuario);
		return new ResponseEntity<Optional<Usuario>>(usu, HttpStatus.ACCEPTED);
	}
	
}
