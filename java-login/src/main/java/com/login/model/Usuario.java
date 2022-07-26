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
	
	@Column(unique = true)
	private String email;
	
	private String senha;
	
	private UserRoles roles;
	
	private String nome;
	
	private String datanasc;
	
	@Column(length = 11) private String cpf;
}
