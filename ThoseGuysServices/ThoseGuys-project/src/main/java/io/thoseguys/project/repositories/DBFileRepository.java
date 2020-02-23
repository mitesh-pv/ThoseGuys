package io.thoseguys.project.repositories;


import io.thoseguys.project.domain.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String> {

      @Query(value = "select d from DBFile d where d.userid=:username")//, nativeQuery = true)
       DBFile getByUserId(@Param("username") String username);

}
