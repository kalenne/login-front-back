package com.login.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.login.model.Usuario;
import com.login.service.UsuarioService;

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
	
	
	@GetMapping("/listar")
	public ResponseEntity<List<Usuario>> listarUsuarios() {
		List<Usuario> usu = usuServ.listaUsuarios();
		return new ResponseEntity<List<Usuario>>(usu, HttpStatus.OK);
		
	}
	
	@PostMapping("/salvar")
	public ResponseEntity<Usuario> salvarUsuarios(@RequestBody Usuario usuario) throws Exception {
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		Usuario usu = usuServ.salvarUsuarios(usuario);
		return new ResponseEntity<Usuario>(usu, HttpStatus.CREATED);
	}
	
	@GetMapping("/validar")
	public ResponseEntity<Boolean> validarSenha (@RequestParam String email,
												@RequestParam String senha) {
		Optional<Usuario> opUsuario = usuServ.findEmail(email);
		if (opUsuario.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
		}
		
		Usuario usuario = opUsuario.get();
		boolean valid = encoder.matches(senha, usuario.getSenha());
		
		HttpStatus status = (valid) ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;
		return ResponseEntity.status(status).body(valid);
	}
	
	@PostMapping("/trocarsenha")
	public ResponseEntity<Optional<Usuario>> atualizarSenha (@RequestBody Usuario usuario) throws Exception{
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		Optional<Usuario> usu = usuServ.atualizarSenha(usuario);
		return new ResponseEntity<Optional<Usuario>>(usu, HttpStatus.OK);
		
	}
	
	
}
