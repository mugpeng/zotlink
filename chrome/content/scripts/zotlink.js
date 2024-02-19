Zotero.Zotlink = {
	// reference from [jlegewie/zotfile at v5.1.1](https://github.com/jlegewie/zotfile/tree/v5.1.1) 
 	// get zotfile settings
	moveSupplemantaryFile: function() {
        /* moveFile */
        // get old path
        var win = Services.wm.getMostRecentWindow("navigator:browser");
        var sel_attachments = win.ZoteroPane.getSelectedItems()
        var att = Zotero.Items.get(sel_attachments[0].id)
        old_filepath = att.getFilePath()
        old_filepath = OS.Path.normalize(old_filepath)
        // get all files in the parent item
        parent_item = Zotero.Items.get(att.parentItemID)
        attachments = parent_item.getAttachments()
        atts_all = Zotero.Items.get(attachments)
        // get linked file's dir(conducted by zotfile)
        atts_filteer = atts_all.filter(atts_all => atts_all.attachmentLinkMode === 2);
        filepath = atts_filteer[0].getFilePath()
        // target_folder = filePath.substring(0, filePath.lastIndexOf('\\'))
        target_folder = OS.Path.dirname(filepath)
        // target_folder;old_filepath
        // filename = old_filepath.split('\\').pop()
        filename = OS.Path.basename(old_filepath)
        // get target path
        foldersep = Zotero.isWin ? '\\' : '/'
        target_filepath = target_folder + foldersep + filename
        target_filepath = OS.Path.normalize(target_filepath)
        // target_filepath
        // move
        OS.File.move(old_filepath, target_filepath)
        /* Link and remove old from zotero database */
        // linkFromFile
        var options = {file: target_filepath, libraryID: parent_item.libraryID, parentItemID: parent_item.id, collections: undefined, saveOptions: {skipSelect: true}};
        Zotero.Attachments.linkFromFile(options)
        // erase old attachment
        att.eraseTx()
    },
	
	// test
	// selectedItemsTest: function () {
	// 	let selectedItems = ZoteroPane.getSelectedItems();
	// 	if (selectedItems.length > 0) {
	// 	  var msg = "";
	// 	  for (let item of selectedItems) {
	// 		msg += `${item.itemType} - ${item.getField("title")}`;
	// 		Zotero.debug(`** ${msg}`);
	// 	  }
	// 	  Zotero.debug(msg);
	// 	  alert(msg);
	// 	}
	//   }
};

