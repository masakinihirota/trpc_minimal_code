// クライアント側
// Next.jsのAPI エンドポイントに接続を通すための設定です
import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import type { AppRouter } from "../pages/api/trpc/[trpc]"

function getBaseUrl() {
  // ブラウザか、そうでないかの判断します。
  if (typeof window !== "undefined") {
    //  ブラウザでは、相対URLを返します。
    return ""
  }
  // サーバーでレンダリングする場合は、絶対的なURLを返します。
  // 例：vercelを利用している場合
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // 上記のURLが設定されていない場合localhostを返します。
  return `http://localhost:${process.env.PORT ?? 3000}`
}

// Next.jsで使うtRPCクライアントを作ります
export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        // バッチリンクは処理をまとめてしまうことです。
        // データローダパターンの一種で、
        // 通信負荷を軽くします。
        httpBatchLink({
          // [tRPC].tsの設定場所
          url: getBaseUrl() + "/api/trpc",
        }),
      ],
    }
  },
})
