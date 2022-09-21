import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
const MuxPlayerPageStatic = dynamic(() => import("./MuxPlayer"));

type Props = { location?: Pick<Location, 'origin' | 'pathname'> };
export const getServerSideProps: GetServerSideProps<Props> = async context => {
  console.log('context.req.headers', JSON.stringify(context.req.headers, null, 2));
  const { origin, pathname }: Pick<Location, 'origin' | 'pathname'> = new URL(context.req.headers.referer ?? 'http://fake.com');
  const location = { origin, pathname };
  return ({ props: { location } })
};


function MuxPlayerPage({ location }: Props) {
  return <MuxPlayerPageStatic location={location} />;
}

export default MuxPlayerPage;
