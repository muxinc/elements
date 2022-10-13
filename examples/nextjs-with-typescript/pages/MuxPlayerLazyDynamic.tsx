import type { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
const MuxPlayerPageStatic = dynamic(() => import("./MuxPlayerLazy"));

type Props = { location?: Pick<Location, 'origin' | 'pathname'> };

const getUrl = ({ req, resolvedUrl }) => {
  const { headers } = req;
  const refererUrl = headers.referer && new URL(headers.referer);
  const baseUrlHost = headers.host.toLowerCase();
  const refererHost = refererUrl?.host?.toLowerCase();

  if (refererHost === baseUrlHost && headers["sec-fetch-site"] === "same-origin") return new URL(refererUrl?.origin ?? './');
  const startsLocal = baseUrlHost.startsWith('localhost') || baseUrlHost.startsWith('127.') || baseUrlHost.startsWith('192.');
  const protocol = startsLocal ? 'http:' : 'https:';
  return new URL(`${protocol}//${baseUrlHost}${resolvedUrl}`);
};

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { origin, pathname }: Pick<Location, 'origin' | 'pathname'> = getUrl(context);
  const location = { origin, pathname };
  return ({ props: { location } })
};

function MuxPlayerPage({ location }: Props) {
  return <MuxPlayerPageStatic location={location} />;
}

export default MuxPlayerPage;
