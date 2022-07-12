package com.login.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity(name = "docs")
@Table(name = "docs")
public class DocPdf {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String DocNome;
	
	private String DocType;
	
	@Lob
	private byte[] data;

	public DocPdf(String docNome, String DocType, byte[] data) {
		this.DocNome = docNome;
		this.DocType = DocType;
		this.data = data;
	}
	
	

}
