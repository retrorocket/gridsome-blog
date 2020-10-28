<template>
  <Layout>
    <main class="content" id="content" role="main" itemprop="mainContentOfPage">
      <article
        id="post-95"
        class="entry page publish author-retrorocket post-95"
        itemscope="itemscope"
        itemtype="https://schema.org/CreativeWork"
      >
        <div class="entry-wrap">
          <header class="entry-header">
            <h1 class="entry-title" itemprop="headline">
              Right-Click to Calendarについて
            </h1>
          </header>
          <!-- .entry-header -->
          <div class="entry-content" itemprop="text">
            <h3>アプリケーション概要</h3>
            <p>
              選択したテキストをGoogleカレンダーに投稿できる拡張です。
              <br />ブラウザ上で日付を含むテキスト選択して右クリックすると、コンテキストメニューからGoogleカレンダーに予定を投稿することが出来ます。
              <br />日時等、正規表現で判別できる部分は自動で入力されます。判別に使用する正規表現はユーザが編集可能です（ベータ）
              <br />初回のみオプションページからOAuthによるアプリケーションの承認を行ってください。
            </p>
            <h3>アプリケーションのダウンロード</h3>
            <p>
              <a
                href="https://chrome.google.com/webstore/detail/right-click-to-calendar/femihkgadmhfmdlkjjfjcgleppfggadk?hl=ja"
                >Right-Click to Calendar - Chrome ウェブストア</a
              >
            </p>

            <h3>アプリケーションのプライバシーポリシー</h3>
            <p>
              <g-link to="/right-click-to-calendar-policy"
                >Right-Click to Calendarのプライバシーポリシー</g-link
              >
            </p>

            <h3>アプリケーションのソースコード</h3>
            <p>
              <a href="https://github.com/retrorocket/Right-Click-to-Calendar"
                >GitHub - retrorocket/Right-Click-to-Calendar</a
              >
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
      title: "Right-Click to Calendarについて",
    };
  },
};
</script>