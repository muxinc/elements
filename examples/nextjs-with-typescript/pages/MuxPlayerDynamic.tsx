import dynamic from "next/dynamic";
const MuxPlayerPageStatic = dynamic(() => import("./MuxPlayer"));
function MuxPlayerPage() {
  return <MuxPlayerPageStatic />;
}

export default MuxPlayerPage;
