<template>
  <Layout>
    <main class="content" id="content" role="main" itemprop="mainContentOfPage">
      <article
        class="entry page publish author-retrorocket"
        itemscope="itemscope"
        itemtype="https://schema.org/CreativeWork"
      >
        <div class="entry-wrap">
          <header class="entry-header">
            <h1 class="entry-title" itemprop="headline">
              作成したアプリ・ツール
            </h1>
          </header>
          <!-- .entry-header -->
          <div class="entry-content" itemprop="text">
            <h4>Twitter関係でつくったものとか</h4>
            <ul>
              <li>
                <a href="https://favico.retrorocket.biz/"
                  >favico! &#8211; Twitterのアイコンをふぁぼれるサービス</a
                >
                <ul>
                  <li>
                    <a
                      href="https://chrome.google.com/webstore/detail/favico-%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E6%8B%A1%E5%BC%B5/ffapgjhohfcjnpbpgbpobanpecoopiia"
                      >Chrome ウェブストア &#8211; favico! ブラウザ拡張</a
                    >
                  </li>
                </ul>
              </li>
              <li>
                <a href="https://retrorocket.biz/fav/"
                  >あなたが一番ふぁぼってる人</a
                >
              </li>
              <li>
                <a href="https://retrorocket.biz/upico/"
                  >API経由でアイコン画像をアップロードするツール</a
                >
              </li>
              <li>
                <a href="https://retrorocket.biz/twimage/"
                  >Twitterに画像をPNGでアップロードするツール</a
                >
              </li>
            </ul>
            <h4>Chrome拡張</h4>
            <ul>
              <li>
                <a
                  href="https://chrome.google.com/webstore/detail/right-click-to-calendar/femihkgadmhfmdlkjjfjcgleppfggadk"
                  >Right-Click to Calendar</a
                >
              </li>
              <li>
                <a
                  href="https://chrome.google.com/webstore/detail/%E6%AE%B2%E6%BB%85tco/jnbhhhjkkdcghmajblmbmdlagndpifji"
                  >殲滅t.co</a
                >
              </li>
              <li>
                <a
                  href="https://chrome.google.com/webstore/detail/github%E3%81%A7%E5%90%8D%E5%89%8D%E3%81%AB%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%82%B9%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B%E3%82%84%E3%81%A4/kaeihhbcakibjinkmleoejleokchbbaj?hl=ja"
                  >GitHubで名前にエイリアスを設定するやつ</a
                >
              </li>
            </ul>
            <h4>その他</h4>
            <ul>
              <li>
                <a href="https://mio.retrorocket.biz/"
                  >mio chang Coupon Switcher</a
                >
              </li>
              <li>
                <a href="https://tag.retrorocket.biz/"
                  >はっしゅたんぐら。 &#8211; twitter # to tumblr.</a
                >
              </li>
            </ul>
            <h4>公開終了</h4>
            <ul>
              <li>
                <a
                  href="https://chrome.google.com/webstore/detail/twitter-profile-summary-c/dhcefhcjalamplnblifpmfjondfcinop"
                  >@Twitter Profile summary Canceller</a
                >
                <ul>
                  <li>
                    Twitterで他の人のプロフィールをクリックしたときに表示されるモーダルウィンドウを無効化するための拡張。Twitterの仕様変更で不要になったため公開終了。
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="https://chrome.google.com/webstore/detail/%E5%90%9B%E3%81%AE%E3%81%A4%E3%81%B6%E3%82%84%E3%81%8D%E3%81%A0%E3%81%91%E8%A6%8B%E3%81%9B%E3%81%A6/anpipdmeelnmnhglnbcobgehedbckkaj"
                  >君のつぶやきだけ見せて</a
                >
                <ul>
                  <li>
                    Twitterで他の人のプロフィールページに表示されているツイートから、メンションとRTを除外するための拡張。Twitterの仕様変更で不要になったため公開終了。
                  </li>
                </ul>
              </li>
              <li>
                <a href="https://retrorocket.biz/list/"
                  >TimeLine Copier &#8211;
                  Twitterでフォローしてる人をリストにコピーするツール</a
                >
                <ul>
                  <li>
                    Twitterでフォローしてる人やフォロワーをリストにコピーするツール。開発者のアカウント（とApp）からlists/members/create_allとlists/members/createの呼び出しがBANされてしまったので公開終了。
                  </li>
                </ul>
              </li>
            </ul>
            <h4>GitHub</h4>
            <p>
              <a href="https://github.com/retrorocket">retrorocket</a>
            </p>
          </div>
        </div>
      </article>
    </main>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "works",
      meta: [
        {
          name: "description",
          content: "自分の作成したツールについて。",
        },
      ],
    };
  },
};
</script>
