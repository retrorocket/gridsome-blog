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
            <h1 class="entry-title" itemprop="headline">contact</h1>
          </header>
          <!-- .entry-header -->
          <div class="entry-content" itemprop="text">
            <h4>直接メールを送信する場合</h4>
            <p>
              &#109;&#97;&#105;&#108;&#64;&#114;&#101;&#116;&#114;&#111;&#114;&#111;&#99;&#107;&#101;&#116;&#46;&#98;&#105;&#122;
            </p>
            <h4>注意事項</h4>
            <ul>
              <li>
                特定のアプリケーションについてお問い合わせをする場合、本文に該当のアプリケーション名を記載してください。
              </li>
              <li>
                Twitter系のアプリの不具合の場合、Twitterのアカウント名を連絡してください。調査に使用します。
              </li>
              <li>返信が必要な場合はメールアドレスを連絡してください。</li>
              <li>使用中のメールフォームサービス(getform.io)のスパムプロテクションが機能しないため、一時的にフォームを閉鎖しています。お手数ですが直接メールしてください。</li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  </Layout>
</template>

<script>
import Axios from "axios";

export default {
  metaInfo() {
    return {
      title: "contact",
      meta: [
        {
          name: "description",
          content:
            "ブログの筆者に連絡する方法です。メール・Twitterからどうぞ。",
        },
      ],
    };
  },
  data() {
    return {
      isSend: false,
      isError: false,
      isProcessing: false,
      name: "",
      email: "",
      text: "",
    };
  },
  methods: {
    async submit() {
      this.isProcessing = true;
      const submitParams = new FormData();
      submitParams.append("name", this.name);
      submitParams.append("email", this.email);
      submitParams.append("text", this.text);

      Axios.post(
        "https://getform.io/f/3707c1db-0940-4112-9fc3-c37d38be4fec",
        submitParams
      )
        .then((res) => {
          this.isSend = true;
          this.isError = false;
          this.isProcessing = false;
        })
        .catch((error) => {
          this.isError = true;
          this.isProcessing = false;
          console.error(error);
        });
      this.isSend = false;
      this.isError = false;
    },
  },
};
</script>

<style scoped>
form {
  max-width: 460px;
  margin: 10px;
}

.feedback-input {
  color: #333;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border: 2px solid #75b5c5;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
}

.feedback-input:focus {
  border: 2px solid #99cedb;
}

textarea {
  height: 150px;
  line-height: 150%;
  resize: vertical;
}

[type="submit"] {
  font-family: "Montserrat", Arial, Helvetica, sans-serif;
  width: 100%;
  background: #75b5c5;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 22px;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: all 0.3s;
  margin-top: -4px;
  font-weight: normal;
}
[type="submit"]:hover {
  background: #99cedb;
}
[type="submit"][disabled] {
  background: #dcdcdc;
  cursor: not-allowed;
}
</style>
