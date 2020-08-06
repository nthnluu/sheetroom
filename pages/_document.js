import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx);
    //     return {...initialProps}
    // }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
                    <style id="react-mathquill-styles"/>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css"
                          integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q"
                          crossOrigin="anonymous"/>
                    <script src="https://cdn.jsdelivr.net/gh/c-w/mathquill4quill@ff1bb5a/mathquill4quill.js"></script>
                    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.js"
                            integrity="sha384-g7c+Jr9ZivxKLnZTDUhnkOnsh30B4H0rpLUpJ4jAIKs4fnJI+sEnkvrMWph2EDg4"
                            crossOrigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/gh/c-w/mathquill4quill@ff1bb5a/mathquill4quill.css"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.9.1/mathquill.min.js"
                            integrity="sha512-nrkcp3u2ytFW9WsmuD0JwlIhY6ZDCfL8+vd9cofdsl7m4XvmCR+DCvhvq0Zuhg69rGLsASKfYgcJKvyh6dyf0A=="
                            crossOrigin="anonymous"></script>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.9.1/mathquill.css"
                          integrity="sha512-Gh9jugVbw863/UnmBitmARROcOkrLhMqPqbMEqwB5nfLf6g/bDEWgvPmwTav9e/s5LOwsnRhjtPSq/3yQ0RDsg=="
                          crossOrigin="anonymous"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
