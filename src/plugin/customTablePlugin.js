import tinymce from 'tinymce/tinymce'; // Import TinyMCE library
import 'tinymce/plugins/table'; // Import the table plugin if necessary

// customTablePlugin.js
tinymce.PluginManager.add('customTable', function(editor) {
    function createTable(rows, cols, align) {
      const table = editor.dom.create('table');
      for (let i = 0; i < rows; i++) {
        const row = editor.dom.add(table, 'tr');
        for (let j = 0; j < cols; j++) {
          const cell = editor.dom.add(row, 'td');
          editor.dom.setStyles(cell, { textAlign: align });
          editor.dom.add(cell, 'br');
        }
      }
      return table;
    }
  
    editor.addButton('customTable', {
      text: 'Insert Table',
      onclick: function() {
        const rows = prompt('Enter number of rows:', '3');
        const cols = prompt('Enter number of columns:', '3');
        const align = prompt('Enter table alignment:', 'left');
        if (rows && cols && align) {
          const table = createTable(parseInt(rows), parseInt(cols), align);
          editor.insertContent(table.outerHTML);
        }
      }
    });
  
    return {
      getMetadata: function() {
        return {
          name: 'Custom Table Plugin',
          // url: 'https://example.com'
        };
      }
    };
  });
  