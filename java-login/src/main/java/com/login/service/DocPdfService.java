package com.login.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.login.model.DocPdf;
import com.login.repository.DocPdfRepository;

@Service
public class DocPdfService {
	
	@Autowired
	private DocPdfRepository docRepository;
	
	public DocPdf saveFile (MultipartFile file) {
		String docname = file.getOriginalFilename();
		try {
			DocPdf doc = new DocPdf(docname, file.getContentType(), file.getBytes());
			return docRepository.save(doc);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	
	public Optional<DocPdf> getFile (Integer fileId) {
		return docRepository.findById(fileId);
	}
	
	public List<DocPdf> getAllFiles(){
		return docRepository.findAll();
	}

}
