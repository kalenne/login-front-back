package com.login;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.login.model.Usuario;
import com.login.repository.UsuarioRepository;
import com.login.service.UsuarioService;
import com.login.utils.UserRoles;

public class UsuarioServiceTeste {
	
	@Mock
	private UsuarioRepository usuarioRepository;
	
	@InjectMocks
	private UsuarioService usuarioService;
	
	public Usuario retornaUsuario() {
		Usuario usuario = new Usuario();
		usuario.setId(1);
		usuario.setEmail("teste@email.com");
		usuario.setSenha("1234");
		usuario.setRoles(UserRoles.USER);
		usuario.setNome("teste");
		usuario.setAtivo(true);
		usuario.setDatanasc("01/01/2000");
		usuario.setCpf("12345678911");
		return usuario;
	}
	
	@Before
	public void setUp () {
		usuarioRepository = Mockito.mock(UsuarioRepository.class);
		usuarioService = new UsuarioService(usuarioRepository);
	}
	
	@Test
	public void testSalvarComRoleNula() throws Exception {
		Usuario usuario = retornaUsuario();
		usuario.setRoles(null);
		when(usuarioService.salvarUsuarios(usuario)).thenReturn(usuario);
		
		usuarioService.salvarUsuarios(usuario);
		
		verify(usuarioRepository, times(1)).save(usuario);
		
	}
	
	@Test(expected = Exception.class)
	public void testeSalvarSemDados() throws Exception {
		when(usuarioService.salvarUsuarios(null)).thenThrow(Exception.class);
	}
	
	@Test
	public void estaFuncionado() throws Exception {
		Boolean rosa = true;
		assertTrue(rosa);
	}

	@Test
	public void testeSalvarComDados() throws Exception {
		
		Usuario usuario = retornaUsuario();
		
		when(usuarioService.salvarUsuarios(usuario)).thenReturn(usuario);
		
		usuarioService.salvarUsuarios(usuario);
		
		verify(usuarioRepository, times(1)).save(usuario);
		
	}
	
	@Test
	public void testeEditarDados() throws Exception {
		Usuario usuario = retornaUsuario();
		
		when(usuarioService.salvarUsuarios(usuario)).thenReturn(usuario);
		usuarioService.salvarUsuarios(usuario);
		
		usuario.setCpf("12345678990");
		when(usuarioService.editarUsuario(usuario)).thenReturn(Optional.ofNullable(usuario));
		
		verify(usuarioRepository, times(1)).save(usuario);
		
	}
	
	@Test
	public void testeEsquecerSenha() throws Exception {
		Usuario usuario = retornaUsuario();
		
		when(usuarioService.resetUsuario(usuario)).thenReturn(Optional.of(usuario));
		usuarioService.resetUsuario(usuario);
		
		verify(usuarioRepository).findByEmail(usuario.getEmail());
		verify(usuarioRepository).save(usuario);
	}
	
	
	@Test(expected = Exception.class)
	public void testeErroDeletarUsuario() throws Exception {
		
		when(usuarioService.delete(null)).thenThrow(Exception.class);
	}
	
	@Test(expected = Exception.class)
	public void testeErroDeletarUsuarioNaoExistente() throws Exception {
		
		when(usuarioService.delete(2)).thenThrow(Exception.class);
		usuarioService.delete(2);
	}
	
	@Test
	public void testeDeletarUsuario() throws Exception {
		Usuario usuario = retornaUsuario();
		
		when(usuarioService.delete(usuario.getId())).thenReturn(Optional.of(usuario));
		
		usuarioService.delete(usuario.getId());
		
		verify(usuarioRepository, times(1)).findById(usuario.getId());
		verify(usuarioRepository, times(1)).save(usuario);
	}
	
	@Test
	public void testeProcurarPorEmail() throws Exception {
		Usuario usuario = retornaUsuario();
		
		when(usuarioService.findEmail(usuario.getEmail())).thenReturn(Optional.of(usuario));
		usuarioService.findEmail(usuario.getEmail());
		
		verify(usuarioRepository, times(1)).findByEmail(usuario.getEmail());	
	}
	
	@Test
	public void testeRestaurarDadosComEmail() throws Exception {
		Usuario usuario = retornaUsuario();
		when(usuarioService.resetUsuario(usuario)).thenReturn(Optional.of(usuario));
		usuarioService.resetUsuario(usuario);
		
		verify(usuarioRepository, times(1)).findByEmail(usuario.getEmail());	
		verify(usuarioRepository, times(1)).save(usuario);
	}
}
