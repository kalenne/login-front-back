package com.login.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.login.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
	
	public Optional<Usuario> findByEmail(String email);
	
	@Query("SELECT u FROM usuario u WHERE u.ativo = true")
	public List<Usuario> findByAtivoTrue();
	
	@Query("SELECT u FROM usuario u WHERE u.ativo = false")
	public List<Usuario> findByAtivoFalse();
	
}
