package com.hst.triptale.system.storage.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * @author dlgusrb0808@gmail.com
 */
@Getter
@RequiredArgsConstructor(staticName = "of")
public class FileBinaryData {
	private final byte[] data;
	private final String contentType;
}
