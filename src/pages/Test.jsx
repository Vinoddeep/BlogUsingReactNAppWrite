import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
// import '../plugin/customTablePlugin'; // Import the custom plugin file

const MyEditor = () => {
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  const handleInsertTable = () => {
    const tableContent = `
      <table style="width:100%">
        <tr>
          <td align="left">Cell 1</td>
          <td align="center">Cell 2</td>
          <td align="right">Cell 3</td>
        </tr>
        <tr>
          <td align="left">Cell 4</td>
          <td align="center">Cell 5</td>
          <td align="right">Cell 6</td>
        </tr>
      </table>
    `;
    tinymce.activeEditor.insertContent(tableContent);
  };

  return (
    <Editor
      apiKey="okrjc3pg16ij59fh259vavqyytsrjeuafnmlab5txd1bmhi4"
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'customTable' // Include the custom plugin in the list of plugins
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help | insertTableButton | customTable', // Add the customTable button to the toolbar,
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        setup: function(editor) {
          editor.ui.registry.addButton('insertTableButton', {
            text: 'Insert Table',
            onAction: handleInsertTable
          });
          

        }
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default MyEditor;
