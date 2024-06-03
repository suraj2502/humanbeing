import React from "react";
import Styles from "./index.module.scss";

function FileUploader({ files, setFiles, title }) {
  const onFileChange = (e) => {
    console.log("fileCHange", e.target.files);
    let obj = e.target.files;
    let res = [];
    console.log("file length", obj.length);
    for (let i = 0; i < obj.length; i++) {
      res.push(obj[i]);
      // res.push(
      //   "https://kettocdn.gumlet.io/media/campaign/892000/892772/image/65c23f207fcdc.jpg?w=1440&dpr=2.0"
      // );
    }
    // var result = Object.keys(obj).map((key) => [key, obj[key]]);
    // console.log("result files", result);
    console.log("res array files", res);
    setFiles(res);
  };

  //   console.log("filesss", files, typeof files);

  return (
    <div className={Styles.wrapper}>
      <span>{title}</span>
      <input type="file" onChange={onFileChange} multiple />
      {files && files.length > 1 && (
        <div className={Styles.wrapper__uploadedFiles}>
          <span>Uploaded Files:</span>
          {files.map((item) => {
            return <span key={item}>{item.name}</span>;
          })}
        </div>
      )}
    </div>
  );
}

export default FileUploader;
