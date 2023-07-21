// サーバー側
// これはアプリのAPIハンドラですべてのAPIルートを含んでいます。
// 大きなアプリではこのファイルを複数のファイルに分割するとよいでしょう。
// initTRPC関数は、TRPCサーバーのインスタンスを作成するために使用されます。
import { initTRPC } from "@trpc/server"
// trpcNextはNext.jsアプリケーションでTRPCサーバーを使用するためのアダプターです。
import * as trpcNext from "@trpc/server/adapters/next"
// 入力スキーマを定義するために使用されるスキーマ定義言語
import { z } from "zod"

const t = initTRPC.create()

// TRPCルーターを作成します。
// appRouterは、t.router()関数を使用して作成されます。
const appRouter = t.router({
  // greetingという名前のプロシージャが定義されます。
  greeting: t.procedure
    // これはプロシージャの入力スキーマです。
    // これを変更すると、クライアントの型エラーがすぐに表示されます。
    // inputオブジェクトを受け取り、textプロパティを持つオブジェクトを返します。
    // inputオブジェクトは、zodを使用して定義された入力スキーマに従います。
    .input(
      z
        .object({
          // nameプロパティは、文字列またはnullを持つことができます。
          // nullish()メソッドは、nullまたはundefinedを許容します。
          name: z.string().nullish(),
        })
        .nullish(),
    )
    .query(({ input }) => {
      // これをクライアントに返します
      return {
        text: `hello ${input?.name ?? "world"}`,
      }
    }),
})

// エクスポートAPIハンドラ
// API の型定義のみエクスポートします。
// 実際の実装は一切クライアントに公開されません。
export type AppRouter = typeof appRouter

// エクスポートAPIハンドラ
export default trpcNext.createNextApiHandler({
  // routerオプションには、appRouterオブジェクトが渡されます。
  router: appRouter,
  // createContextオプションは、APIリクエストごとに呼び出される関数を指定します。
  // この例では、空のオブジェクトを返します。
  createContext: () => ({}),
})
