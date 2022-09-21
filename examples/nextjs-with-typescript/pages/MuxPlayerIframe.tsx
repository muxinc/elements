import dynamic from "next/dynamic";
const MuxPlayerPageStatic = dynamic(() => import("./MuxPlayer"));
function MuxPlayerPage() {
  return <iframe
    src="./MuxPlayer"
    width="816"
    height="1250"
    allow="fullscreen 'none'"
  />;
}

export default MuxPlayerPage;
