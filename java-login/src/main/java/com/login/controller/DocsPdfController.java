package com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.login.model.DocPdf;
import com.login.service.DocPdfService;

@RestController
public class DocsPdfController {
	
	@Autowired
	private DocPdfService dpdfService;
	
	@PostMapping("/uploadfiles")
	public String uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		for (MultipartFile file: files) {
			dpdfService.saveFile(file);
		}
		
		return "redirect:/";
	}
	
	@GetMapping("/downloadFile/{fileid}")
	public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Integer fileid){
		DocPdf doc = dpdfService.getFile(fileid).get();
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(doc.getDocType()))
						.header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename=\"" + doc.getDocNome() + "\"")
						.body(new ByteArrayResource(doc.getData()));
		
	}
}
