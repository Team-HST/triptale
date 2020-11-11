package com.hst.triptale.system.storage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hst.triptale.system.storage.entity.StorageFile;

/**
 * @author dlgusrb0808@gmail.com
 */
@Repository
public interface StorageFileRepository extends JpaRepository<StorageFile, Long> {
}
