package com.hst.triptale.system.storage.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@Entity
@Table(name = "FILE")
public class StorageFile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FILE_NO")
	private Long no;

	@Column(name = "FILE_NM")
	private String name;

	public static StorageFile createStorageFile(String name) {
		StorageFile storageFile = new StorageFile();
		storageFile.name = name;
		return storageFile;
	}
}
