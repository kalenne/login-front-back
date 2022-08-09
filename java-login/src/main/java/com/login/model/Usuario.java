package com.login.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.login.utils.UserRoles;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity(name = "usuario")
public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String senha;
	
	@Column(nullable = false)
	private UserRoles roles;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private boolean ativo;
	
	@Column(nullable = false)
	private String datanasc;
	
	@Column(length = 11, nullable = false, unique=true) private String cpf;

}
