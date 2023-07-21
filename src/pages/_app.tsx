import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { trpc } from "../utils/trpc"

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// AppをtRPCでラップしています。
export default trpc.withTRPC(App)
