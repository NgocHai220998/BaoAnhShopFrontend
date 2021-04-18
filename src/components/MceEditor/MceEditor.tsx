import React, {FunctionComponent} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {axios} from "@/utils/axiosInstance";

interface MceEditorProps {
  placeholder: string;
  getContent: (content: string) => void;
}

const MceEditor: FunctionComponent<MceEditorProps> = (props: MceEditorProps) => {
  const {placeholder, getContent} = props;

  const handleEditorChange = (e: any) => {
    getContent(e.target.getContent());
  };

  return (
    <Editor
      apiKey={"o61qt6q6lduj5elvpu1nnuhpkr4vrkxyhmaweh2hkwr3j6oy"}
      initialValue={placeholder}
      init={{
        language: "en_US",
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help | image | link',
        // images_upload_url: `${apiUpload}`,
        images_upload_handler: function (blobInfo: any, success: any, failure: any) {
          let data = new FormData();

          const reader = new FileReader;
          reader.readAsDataURL(blobInfo.blob());
          reader.onload = () => {
            axios.post(`${process.env.REACT_APP_UPLOAD_API}`, {
              base64_image: reader.result,
              fileName: (new Date()).getTime() + "_" + blobInfo.filename(),
              typeUpload: "ad_sell_lease",
            }).then(function (res: any) {
                success(res.location);
              })
              .catch(function (err) {
                failure('HTTP Error: ' + err.message);
              });
          };
        }
      }}
      onChange={handleEditorChange}
    />
  );
};

export default MceEditor;
