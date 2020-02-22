package io.thoseguys.project.web;

import io.thoseguys.project.domain.DBFile;
import io.thoseguys.project.payload.UploadFileResponse;
import io.thoseguys.project.services.DBFileStorageService;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.*;
import java.nio.file.Files;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private DBFileStorageService dbFileStorageService;

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        DBFile dbFile = dbFileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(dbFile.getId())
                .toUriString();

        return new UploadFileResponse(dbFile.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        // Load file from database
        DBFile dbFile = dbFileStorageService.getFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
                .body(new ByteArrayResource(dbFile.getData()));
    }

    /*@GetMapping("/getData/{fileId}")
    public String getData(@PathVariable String fileId){

        DBFile dbFile = dbFileStorageService.getFile(fileId);
        byte[] bytes = dbFile.getData();

        // ----------
        try {

            // Initialize a pointer
            // in file using OutputStream
            File file = new File("");

            OutputStream os = new FileOutputStream(file);

            // Starts writing the bytes in it
            os.write(bytes);
            System.out.println("Successfully"
                    + " byte inserted");

            // Close the file
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        }


        // ----------

        String s="";
        ITesseract image =  new Tesseract();

        try {
             s = image.doOCR(new File("D:\\3.png"));
            System.out.println("Data from Image "+ s);
        }catch (TesseractException e){
                System.out.println("Exception "+ e.getMessage());
        }

        String[] t = s.split(" ");

        String result = "";
        for(int i=0; i<t.length; ++i){
            if(t[i].contains("Total")){
                result = t[i+1];
            }
        }
        return result;
    }*/

    @GetMapping("/getData/{fileId}")
    public String  getData(@PathVariable String fileId) throws IOException {
        DBFile dbFile = dbFileStorageService.getFile(fileId);
        byte[] bytes = dbFile.getData();

        File dest = new File("D:\\files\\image.png");

        try(FileOutputStream fos = new FileOutputStream(dest)){
            fos.write(bytes);
            fos.close();
        }catch(Exception exp){
            System.out.println("error writing file");
        }

        String s = "";
        ITesseract image = new Tesseract();

        try {
            s = image.doOCR(new File("D:\\files\\image.png"));
            System.out.println("Data from Image "+ s);
        }catch (TesseractException e){
            System.out.println("Exception "+ e.getMessage());
        }

        String[] t = s.split(" ");

        String result = "";
        for(int i=0; i<t.length; ++i){
            if(t[i].contains("Total")){
                result = t[i+1];
            }
        }
        return result;
    }


}

