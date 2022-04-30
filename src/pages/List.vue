<template>
  <Layout>
    <main class="content" id="content" role="main" itemprop="mainContentOfPage">
      <article itemscope="itemscope" itemtype="https://schema.org/CreativeWork">
        <div class="entry-wrap">
          <header class="entry-header">
            <h1 class="entry-title" itemprop="headline">
              TimeLine Copier - TimeLine to Listについて
            </h1>
          </header>
          <!-- .entry-header -->
          <div class="entry-content" itemprop="text">
            <p>
              TimeLine Copier - TimeLine to
              Listは、開発者（@retrorocket）が発行したTwitter
              App上からのリストへのアカウント追加操作がすべてrefuseされるようになったため、2022/04/30をもって公開を終了しました。
              <br />
              本件に対して開発者から対処を行う予定はありません。
              長い間ご利用ありがとうございました。個人的にも思い入れがあるツールでした。
            </p>
          </div>
        </div>
      </article>
    </main>
    <!-- .content -->
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "...",
      meta: [
        {
          name: "description",
          content: "TimeLine Copier - TimeLine to Listはサービスを停止しました",
        },
      ],
    };
  },
};
</script>
