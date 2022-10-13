import dynamic from "next/dynamic";
const MuxPlayerPageStatic = dynamic(() => import("./MuxPlayerLazy"));
function MuxPlayerPage() {
  return <iframe
    src="./MuxPlayerLazy"
    width="816"
    height="1250"
    allow="fullscreen 'none'"
  />;
}

export default MuxPlayerPage;
