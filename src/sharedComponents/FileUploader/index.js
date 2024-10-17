import React from "react";
import Styles from "./index.module.scss";
import { uploadFiles } from "@/services/campaign";

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
    uploadFiles(title)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setFiles(json.file_data);
        }
      });
    //     curl 'https://altruvo.org/api/image/upload' \
    // -H 'Accept: */*' \
    // -H 'Accept-Language: en-GB,en;q=0.9' \
    // -H 'Authorization: Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3Mjc2MjI0ODksImlhdCI6IjIwMjQtMDktMjhUMTU6MDg6MDkuMTAzNjMzNDc2WiIsInVzZXJDb2RlIjoiMTUwMDAwMDAwMDEyIn0.cLl-OFR72Zp2Y9qtbyUkw4DwvpCJuTh6KsuyMHsEBDk' \
    // -H 'Cache-Control: no-cache' \
    // -H 'Connection: keep-alive' \
    // -H 'Content-type: multipart/form-data' \
    // -H 'Origin: http://localhost:3000' \
    // -H 'Pragma: no-cache' \
    // -H 'Referer: http://localhost:3000/' \
    // -H 'Sec-Fetch-Dest: empty' \
    // -H 'Sec-Fetch-Mode: cors' \
    // -H 'Sec-Fetch-Site: cross-site' \
    // -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' \
    // -H 'sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' \
    // -H 'sec-ch-ua-mobile: ?0' \
    // -H 'sec-ch-ua-platform: "macOS"' \
    // --data-raw $'------WebKitFormBoundaryaT5yZg8Ng7FYBmqh\r\nContent-Disposition: form-data; name="images"\r\n\r\n[object File]\r\n------WebKitFormBoundaryaT5yZg8Ng7FYBmqh--\r\n'
    //     curl --location 'https://altruvo.org/api/image/upload' \
    // --header 'Authorization: Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MTQ5MzEyNjYsImlhdCI6IjIwMjQtMDUtMDRUMjM6MTc6NDYuNDM0NDE0KzA1OjMwIiwidXNlckNvZGUiOiIxNTAwMDAwMDAwMDYifQ.QgHJeOJtz_uNyYbE5OPcrepRP2y5xjJp4WZU1MKbNfw' \
    // --header 'Content-Type: multipart/form-data' \
    // --form 'images=@"/Users/surajshukla/Downloads/ZMart_image.png"' \
    // --form 'isImageUpload="1"' \
    // --form 'isDocumentUpload="0"'
  };

  //   console.log("filesss", files, typeof files);

  return (
    <div className={Styles.wrapper}>
      <span>{title}</span>
      <input id={title} type="file" onChange={onFileChange} multiple />
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
// curl 'https://altruvo.org/api/image/upload' \
//   -H 'Accept: */*' \
//   -H 'Accept-Language: en-GB,en;q=0.9' \
//   -H 'Authorization: Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3Mjc2MjI0ODksImlhdCI6IjIwMjQtMDktMjhUMTU6MDg6MDkuMTAzNjMzNDc2WiIsInVzZXJDb2RlIjoiMTUwMDAwMDAwMDEyIn0.cLl-OFR72Zp2Y9qtbyUkw4DwvpCJuTh6KsuyMHsEBDk' \
//   -H 'Cache-Control: no-cache' \
//   -H 'Connection: keep-alive' \
//   -H 'Content-type: multipart/form-data' \
//   -H 'Origin: http://localhost:3000' \
//   -H 'Pragma: no-cache' \
//   -H 'Referer: http://localhost:3000/' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Site: cross-site' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' \
//   -H 'sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   --data-raw $'------WebKitFormBoundarySlQwJYMRJDK69fTX\r\nContent-Disposition: form-data; name="images"; filename="noti.png"\r\nContent-Type: image/png\r\n\r\n\r\n------WebKitFormBoundarySlQwJYMRJDK69fTX--\r\n'

//   curl 'https://imagecompressor.com/upload/1mjo13a6iob1l6n1' \
//   -H 'accept: */*' \
//   -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
//   -H 'cache-control: no-cache' \
//   -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundaryvQpr4cMk4TrQSQBs' \
//   -H 'cookie: mojolicious=eyJjb3VudGVyIjoxLCJleHBpcmF0aW9uIjozMTUzNjAwMCwiZXhwaXJlcyI6MTc1OTA4MjY0Nn0---9910aa964176c8b764c6154608fe762ce7c6b3b8; _pk_ref.16.f70d=%5B%22%22%2C%22%22%2C1727546649%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_id.16.f70d=84faaa56266a4a07.1727546649.; _pk_ses.16.f70d=1' \
//   -H 'origin: https://imagecompressor.com' \
//   -H 'pragma: no-cache' \
//   -H 'priority: u=1, i' \
//   -H 'referer: https://imagecompressor.com/' \
//   -H 'sec-ch-ua: "Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'sec-fetch-dest: empty' \
//   -H 'sec-fetch-mode: cors' \
//   -H 'sec-fetch-site: same-origin' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' \
//   --data-raw $'------WebKitFormBoundaryvQpr4cMk4TrQSQBs\r\nContent-Disposition: form-data; name="file"; filename="noti.png"\r\nContent-Type: image/png\r\n\r\n\r\n------WebKitFormBoundaryvQpr4cMk4TrQSQBs\r\nContent-Disposition: form-data; name="id"\r\n\r\nfile_1i248uft0ofdm1jrpsvb1mirk8\r\n------WebKitFormBoundaryvQpr4cMk4TrQSQBs\r\nContent-Disposition: form-data; name="name"\r\n\r\nnoti.png\r\n------WebKitFormBoundaryvQpr4cMk4TrQSQBs\r\nContent-Disposition: form-data; name="rnd"\r\n\r\n0.48606895991717214\r\n------WebKitFormBoundaryvQpr4cMk4TrQSQBs--\r\n'

//   --data-raw $'------WebKitFormBoundarySlQwJYMRJDK69fTX\r\nContent-Disposition: form-data; name="images"; filename="noti.png"\r\nContent-Type: image/png\r\n\r\n\r\n------WebKitFormBoundarySlQwJYMRJDK69fTX--\r\n'
