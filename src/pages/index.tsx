// クライアント側：サイトのトップページ
import { trpc } from "../utils/trpc"

export default function Home() {
  // CTRL+Click で `greeting` をクリックすると関数の定義へ飛びます。
  const result = trpc.greeting.useQuery({ name: "VNS.BLUE" })

  // データが取得できない場合は Loadingが表示されます。
  if (!result.data) return <h1>Loading...</h1>

  return (
    <div>
      {/* 型が定義されており、オートコンプリートも可能です。
      下記のdataにマウスカーソルを乗せるとresultの型が見えます。
      下記のtextをマウスでCTRL+Clickすると、定義されている場所へ飛びます
      下記のtextをマウス右クリックしてメニューのシンボルの名前変更(F2キー)で、
      クラアントとサーバーの両方の名前を同時に変更します。
      (要:VScode) */}
      <h1>{result.data.text}</h1>
    </div>
  )
}
