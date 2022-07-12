package com.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.login.model.DocPdf;

@Repository
public interface DocPdfRepository extends JpaRepository<DocPdf, Integer> {
	
}
