import Link from "next/link";
import MuxUploader, { MuxUploaderDrop } from '@mux/mux-uploader-react';
/* import { useState, ChangeEvent } from "react"; */

function MuxUploaderPage() {
  /*
  const [url, setUrl] = useState("");

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setUrl(target.value);
  }
  */

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <h1>MuxUploader with MuxUploaderDrop Demo</h1>
      {/*<h2>Enter your upload GCS url:</h2>
      <input type="text" style={{ padding: "8px 12px", marginBottom: "20px", width: "400px" }} placeholder="https://storage.googleapis.com/..." onChange={handleChange} />
      */}
      <div style={{ flexGrow: 1, flexShrink: 1, height: "400px" }}>
        <MuxUploader
          url="https://storage.googleapis.com/video-storage-us-east1-uploads/YZbTez00mBRSM9CAiayJNFynGBRddl1bLZocr8SGjsAI?Expires=1656560236&GoogleAccessId=direct-uploads-writer-prod%40mux-cloud.iam.gserviceaccount.com&Signature=ncwWvKYlXIQABWHBfNkdoulbXvzaNpHWrZePfo89Hz6Uhx1hZ4xHAPr9XfQGsZQpeAgHfIyxLDe4cVO3hbNxLIdLchQlm%2BQXTZak9q78y%2F2bXDCUO6gva8cCMOljDWfFSenXby4nQl4FKHAdmCdQI%2BZK7HG2LPKX1qumDmubTxHjMqvirXsWHexrI8S3QbR3ca7y5dpl1V9nnOcVSITFi2kon9%2BZJ3Gnvx%2BCrsha10XhPaSPZIzBumkaJg2PQF8hu1ThIft%2BzxnsFaY90VUdTcKMkb0cIFvyBvnUow%2Fg6FRODL%2F0C%2BSCeiWz32eoQjyfSvpum6IUHWSFMAyGnVXQlw%3D%3D&upload_id=ADPycdtFRqx_WgiVzoLplDexnzxiuFj1JTSgMs2lyzb4HwxFpPprCH7pY0jF_pIJlh3_o8JRTDrRiq68WEBuIF1s67KJbhnr0kvt"
          type="bar"
          status
        >
          <MuxUploaderDrop slot="dropzone" text="Upload to the interwebs" fullscreen overlay />
        </MuxUploader>
      </div>
      <h3 className="title">
        <Link href="/">
          <a>Browse Elements</a>
        </Link>
      </h3>
    </div>
  );
}

export default MuxUploaderPage;
