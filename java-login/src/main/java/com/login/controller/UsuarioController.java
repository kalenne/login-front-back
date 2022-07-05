package com.login.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.model.Usuario;
import com.login.service.UsuarioService;

//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/usuario")
@RestController
public class UsuarioController {
	@Autowired
	private UsuarioService usuServ;
	
	@GetMapping("/listar")
	public ResponseEntity<List<Usuario>> listarUsuarios() {
		List<Usuario> usu = usuServ.listaUsuarios();
		return new ResponseEntity<List<Usuario>>(usu, HttpStatus.OK);
		
	}
	@PostMapping("/salvar")
	public ResponseEntity<Usuario> salvarUsuarios(@RequestBody Usuario usuario) throws Exception{
		Usuario usu = usuServ.salvarUsuarios(usuario);
		return new ResponseEntity<Usuario>(usu, HttpStatus.CREATED);
	}
	
	@PostMapping("/trocarsenha")
	public ResponseEntity<Optional<Usuario>> trocarSenha (@RequestBody Usuario usuario){
		Optional<Usuario> usu = usuServ.atualizarSenha(usuario);
		return new ResponseEntity<Optional<Usuario>>(usu, HttpStatus.ACCEPTED);
	}
}
