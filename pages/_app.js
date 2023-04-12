import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
      <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}
//i wrap my entire app in recoil root to manage recoil state
// also to give access to the whole context(state) throughout my entire app.

